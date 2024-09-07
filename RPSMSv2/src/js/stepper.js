const steps = document.querySelectorAll(".stepnum");
const progressBar = document.querySelector(".pbar");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prv");
const submitBtn = document.getElementById("submit");

let currentStep = 0;

function updateProgressBar() {
  const percent = (currentStep / (steps.length - 1)) * 100;
  progressBar.style.width = percent + "%";
}

function updateSteps() {
  steps.forEach((step, index) => {
    if (index === currentStep) {
      step.classList.add("active");
      step.classList.remove("bg-white", "text-gray-400");
      step.classList.add("bg-blue-600", "text-white");
    } else if (index < currentStep) {
      step.classList.add("active");
      step.classList.remove("bg-blue-600", "text-white");
      step.classList.add("bg-blue-600", "text-white");
    } else {
      step.classList.remove("active");
      step.classList.remove("bg-blue-600", "text-white");
      step.classList.add("bg-white", "text-gray-400");
    }
  });
}

function updateFSteps() {
  const formSteps = document.querySelectorAll(".step");
  formSteps.forEach((step, index) => {
    if (index === currentStep) {
      step.classList.remove("hidden");
    } else {
      step.classList.add("hidden");
    }
  });
}

function isStepValid(step) {
  const inputs = step.querySelectorAll(
    "input[required], select[required], textarea[required], email[required], radio[required], file[required]",
  );
  let isValid = true;
  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
    }
  });
  return isValid;
}

function showSubmitButton() {
  nextBtn.classList.add("hidden");
  prevBtn.classList.remove("hidden");
  submitBtn.classList.remove("hidden");
}

updateProgressBar();
updateSteps();
updateFSteps();

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    const currentFormStep = document.querySelector(`#step${currentStep + 1}`);
    if (isStepValid(currentFormStep)) {
      currentStep++;
      updateProgressBar();
      updateSteps();
      updateFSteps();
      prevBtn.disabled = false;
      if (currentStep === 2) {
        showSubmitButton();
      }
    } else {
      openModal();
    }
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateProgressBar();
    updateSteps();
    updateFSteps();
    nextBtn.disabled = false;
    if (currentStep === 0) {
      prevBtn.disabled = true;
    }
    nextBtn.classList.remove("hidden");
    submitBtn.classList.add("hidden");
  }
});

submitBtn.addEventListener("click", () => {
  // Handle form submission logic here
  if (currentStep === 3) {
    submitBtn.classList.add("hidden");
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
    console.log("works until here...!");
    successDialog(document.getElementById("successDialog"));
    console.log("works until here...(2)!");
  }
});
