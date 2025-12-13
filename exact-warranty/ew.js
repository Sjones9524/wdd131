// Wait for the page to fully load before running the script
document.addEventListener("DOMContentLoaded", () => {
  
  // ---- Custom Select ----
  // Get references to the custom select elements
  const customSelect = document.querySelector(".custom-select");
  const selected = customSelect?.querySelector(".selected");
  const optionsContainer = customSelect?.querySelector(".options");
  const hiddenInput = document.getElementById("selected-value");

  // Only run if all elements exist
  if (customSelect && selected && optionsContainer && hiddenInput) {
    
    // Function to show or hide the options
    const toggleOptions = () => {
      optionsContainer.style.display = optionsContainer.style.display === "block" ? "none" : "block";
    };

    // Click on the selected element opens/closes options
    selected.addEventListener("click", toggleOptions);

    // Allow keyboard (Enter or Space) to open/close options
    customSelect.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleOptions();
      }
    });

    // When an option is clicked, set it as selected
    optionsContainer.querySelectorAll("li").forEach(option => {
      option.addEventListener("click", () => {
        selected.innerHTML = option.innerHTML; // show chosen option
        hiddenInput.value = option.dataset.value; // store value in hidden input
        optionsContainer.style.display = "none"; // hide options
      });
    });

    // Click outside the select closes the options
    document.addEventListener("click", e => {
      if (!customSelect.contains(e.target)) optionsContainer.style.display = "none";
    });
  }

  // ---- Continue Button Navigation ----
  const continueBtn = document.getElementById("continueBtn");
  if (continueBtn && hiddenInput) {
    continueBtn.addEventListener("click", () => {
      // Map selected brand to corresponding page
      const pageMap = {
        'Ford': 'ford.html',
        'GM': 'gm.html',
        'Other Manufacturer': 'other.html'
      };
      const selectedBrand = hiddenInput.value;
      if (selectedBrand && pageMap[selectedBrand]) {
        window.location.href = pageMap[selectedBrand]; // navigate to page
      }
    });
  }

  // ---- Dealer Form ----
  const form = document.getElementById("dealerForm");
  const message = document.getElementById("formMessage");

  // Multipliers for calculations
  const dmsOptions = { autosoft: 1.0, dealertrack: 1.0, other: 1.5 };
  const brandOptions = { ford: 1, gm: 1, other: 1.5 };

  // Function to show messages (success or error)
  const showMessage = (text, type) => {
    if (message) {
      message.textContent = text;
      message.style.color = type === "error" ? "red" : "green";
    }
  };

  // ---- Calculation Function ----
  function calculateAmount(dms, brand, claimsPerWeek) {
    const base = 200;

    // Determine multiplier based on claims per week
    let claimsMultiplier = 1;
    if (claimsPerWeek >= 21 && claimsPerWeek <= 50) claimsMultiplier = 1.5;
    else if (claimsPerWeek >= 51 && claimsPerWeek <= 75) claimsMultiplier = 1.75;
    else if (claimsPerWeek >= 76 && claimsPerWeek <= 100) claimsMultiplier = 2.0;
    else if (claimsPerWeek >= 101) claimsMultiplier = 2.75;

    const dmsMultiplier = dmsOptions[dms] || 1;
    const brandMultiplier = brandOptions[brand] || 1;

    const total = base * claimsMultiplier * dmsMultiplier * brandMultiplier;
    return total.toFixed(2); // round to 2 decimals
  }

  // Handle form submission
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault(); // prevent default form submission

      // Convert form data to an object
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const dms = data.dms?.trim().toLowerCase();
      const brand = data.brand?.trim().toLowerCase();
      const claimsPerWeek = Number(data.claimsPerWeek);

      // ---- Validation ----
      if (!/^\+?\d{7,15}$/.test(data.contactNumber)) 
        return showMessage("Please enter a valid contact number.", "error");
      if (claimsPerWeek < 0) 
        return showMessage("Claims per week must be 0 or more.", "error");
      if (!dmsOptions[dms]) 
        return showMessage("Unknown Dealer Management System selected.", "error");
      if (!brandOptions[brand]) 
        return showMessage("Unknown Brand selected.", "error");

      // ---- Calculate total amount ----
      const totalAmount = calculateAmount(dms, brand, claimsPerWeek);

      // Save result to localStorage for success page
      localStorage.setItem("calculatedResult", totalAmount);

      // Show success message
      showMessage("Form submitted successfully! Redirecting...", "success");

      // Redirect to success page after 1 second
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
      const displayResult = (Number(result) * 4).toFixed(2); // multiply as needed
      calculationElement.textContent = displayResult;
      localStorage.removeItem("calculatedResult"); // clear after display
    }
  }
});