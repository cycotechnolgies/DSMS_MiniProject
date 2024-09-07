function openModal() {
  const modal = document.getElementById("uptModal");
  modal.classList.remove("hidden");
  modal.classList.remove("opacity-0");
  modal.classList.add("opacity-100");
  
}

function closeModal() {
  const modal = document.getElementById("uptModal");
  modal.classList.add("hidden");
  modal.classList.remove("opacity-100");
  modal.classList.add("opacity-0");
}

function successDialog() {
  const successDialog = document.getElementById("successDialog");
  successDialog.classList.remove("hidden");
  successDialog.classList.remove("opacity-0");
  successDialog.classList.add("opacity-100");
  console.log("works until here...(3)!");
}
