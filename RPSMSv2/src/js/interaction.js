function goBack() {
  window.history.back();
}
window.onload = function () {
  disableAllFields();
};

function disableAllFields() {
  const formBtns = document.getElementById("formBtn");
  var inputFields = document.querySelectorAll("input");
  inputFields.forEach(function (field) {
    field.disabled = true;
  });

  formBtns.classList.add("hidden");
}

function enableFields() {
  const formBtns = document.getElementById("formBtn");
  var inputFields = document.querySelectorAll("input");
  inputFields.forEach(function (field) {
    field.disabled = false;
  });

  formBtns.classList.remove("hidden");
}
