document.addEventListener("DOMContentLoaded", () => {
  // ---- Custom Select ----
  const customSelect = document.querySelector(".custom-select");
  const selected = customSelect?.querySelector(".selected");
  const optionsContainer = customSelect?.querySelector(".options");
  const hiddenInput = document.getElementById("selected-value");

  if (customSelect && selected && optionsContainer && hiddenInput) {
    const toggleOptions = () => {
      optionsContainer.style.display = optionsContainer.style.display === "block" ? "none" : "block";
    };

    selected.addEventListener("click", toggleOptions);
    customSelect.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleOptions();
      }
    });

    optionsContainer.querySelectorAll("li").forEach(option => {
      option.addEventListener("click", () => {
        selected.innerHTML = option.innerHTML;
        hiddenInput.value = option.dataset.value;
        optionsContainer.style.display = "none";
      });
    });

    document.addEventListener("click", e => {
      if (!customSelect.contains(e.target)) optionsContainer.style.display = "none";
    });
  }

  // ---- Continue Button Navigation ----
  const continueBtn = document.getElementById("continueBtn");
  if (continueBtn && hiddenInput) {
    continueBtn.addEventListener("click", () => {
      const pageMap = {
        'Ford': 'ford.html',
        'GM': 'gm.html',
        'Other Manufacturer': 'other.html'
      };
      const selectedBrand = hiddenInput.value;
      if (selectedBrand && pageMap[selectedBrand]) {
        window.location.href = pageMap[selectedBrand];
      }
    });
  }

  // ---- Dealer Form ----
  const form = document.getElementById("dealerForm");
  const message = document.getElementById("formMessage");

  const dmsOptions = { autosoft: 1.0, dealertrack: 1.0, other: 1.5 };
  const brandOptions = { ford: 1, gm: 1, other: 1.5 };

  const showMessage = (text, type) => {
    if (message) {
      message.textContent = text;
      message.style.color = type === "error" ? "red" : "green";
    }
  };

  // ---- Calculation Function ----
  function calculateAmount(dms, brand, claimsPerWeek) {
    const base = 200;

    // Claims per week multiplier
    let claimsMultiplier = 1;
    if (claimsPerWeek >= 1 && claimsPerWeek <= 20) {
      claimsMultiplier = 1.0;
    } else if (claimsPerWeek >= 21 && claimsPerWeek <= 50) {
      claimsMultiplier = 1.5;
    } else if (claimsPerWeek >= 51) {
      claimsMultiplier = 1.75;
    }

    const dmsMultiplier = dmsOptions[dms] || 1;
    const brandMultiplier = brandOptions[brand] || 1;

    const total = base * claimsMultiplier * dmsMultiplier * brandMultiplier;
    return total.toFixed(2);
  }

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const dms = data.dms?.trim().toLowerCase();
      const brand = data.brand?.trim().toLowerCase();
      const claimsPerWeek = Number(data.claimsPerWeek);

      // Validation
      if (!/^\+?\d{7,15}$/.test(data.contactNumber)) return showMessage("Please enter a valid contact number.", "error");
      if (claimsPerWeek < 0) return showMessage("Claims per week must be 0 or more.", "error");
      if (!dmsOptions[dms]) return showMessage("Unknown Dealer Management System selected.", "error");
      if (!brandOptions[brand]) return showMessage("Unknown Brand selected.", "error");

      // Calculate total amount
      const totalAmount = calculateAmount(dms, brand, claimsPerWeek);

      // Store for success page
      localStorage.setItem("calculatedResult", totalAmount);

      showMessage(`Form submitted successfully! Redirecting...`, "success");

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "success.html";
      }, 1000);
    });
  }

  // ---- Success Page Handling ----
  const calculationElement = document.getElementById("calculation");
  if (calculationElement) {
    let result = localStorage.getItem("calculatedResult");
    if (result !== null) {
      const displayResult = (Number(result) * 4).toFixed(2);
      calculationElement.textContent = displayResult;
      localStorage.removeItem("calculatedResult"); // optional: clear after display
    }
  }
});