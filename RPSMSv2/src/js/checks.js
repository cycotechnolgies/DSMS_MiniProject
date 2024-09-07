// Function to handle select change event
function handleSelectChange() {
  var selectElement = document.getElementById("course");
  var checkboxesSection = document.getElementById("checkboxes");
  var LightSel = document.getElementById("Lcheckboxes");
  var HeavySel = document.getElementById("Hcheckboxes");
  var CustomSel = document.getElementById("Ccheckboxes");

  // Check if the selected option is "light vehicle"
  if (selectElement.value === "light vehicle") {
    checkboxesSection.classList.add("hidden");
    LightSel.classList.remove("hidden");
    HeavySel.classList.add("hidden");
    CustomSel.classList.add("hidden");
  }
  // Check if the selected option is "heavy vehicle"
  else if (selectElement.value === "heavy vehicle") {
    checkboxesSection.classList.add("hidden");
    HeavySel.classList.remove("hidden");
    LightSel.classList.add("hidden");
    CustomSel.classList.add("hidden");
  }
  // Check if the selected option is "custom"
  else if (selectElement.value === "custom") {
    checkboxesSection.classList.remove("hidden");
    CustomSel.classList.remove("hidden");
    LightSel.classList.add("hidden");
    HeavySel.classList.add("hidden");
  }
  // Hide checkboxes section if none of the above options are selected
  else {
    checkboxesSection.classList.add("hidden");
    LightSel.classList.add("hidden");
    HeavySel.classList.add("hidden");
    CustomSel.classList.add("hidden");
  }
}

// Add event listener to select element
document.getElementById("course").addEventListener("change", handleSelectChange);
