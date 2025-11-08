import { participantTemplate, successTemplate, totalFees } from "templates";

let participantCount = 1;

const addButton = document.querySelector("#addParticipant");
addButton.addEventListener("click", () => {
  participantCount++;
  addButton.insertAdjacentHTML("beforebegin", participantTemplate(participantCount));
});

const form = document.querySelector("form");
const summary = document.querySelector("#summary");
summary.style.display = "none";

form.addEventListener("submit", function submitForm(event) {
  event.preventDefault();

  const adultName = document.querySelector("#adult_name").value;
  const participantSections = document.querySelectorAll("fieldset.participants section[class^='participant']");
  const participantCount = participantSections.length;
  const total = totalFees();
  form.style.display = "none";

  summary.innerHTML = successTemplate({
    adultName: adultName,
    participantCount: participantCount,
    totalFees: total.toFixed(2)
  });
  summary.style.display = "block";
});