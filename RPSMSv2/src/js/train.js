document.getElementById("cards").addEventListener("click", function () {
  Swal.fire({
    title: "Insert Data",
    html: `
            <select id="ticketType" class="swal2-select">
                <option value="full">Full</option>
                <option value="half">Half</option>
                <option value="one_day">One Day</option>
            </select>
            <input type="date" id="expireDate" class="swal2-input" placeholder="Expiry Date">
            <input type="number" id="expireHours" class="swal2-input" placeholder="Expiry Hours" min="0" max="24">
        `,
    showCancelButton: true,
    confirmButtonText: "Submit",
    preConfirm: () => {
      const ticketType = Swal.getPopup().querySelector("#ticketType").value;
      const expireDate = Swal.getPopup().querySelector("#expireDate").value;
      const expireHours = Swal.getPopup().querySelector("#expireHours").value;
      if (!ticketType || !expireDate || !expireHours) {
        Swal.showValidationMessage(`Please fill all fields`);
      }
      return {
        ticketType: ticketType,
        expireDate: expireDate,
        expireHours: expireHours,
      };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: "insert.php",
        type: "POST",
        data: {
          ticket_type: result.value.ticketType,
          expire_date: result.value.expireDate,
          expire_hours: result.value.expireHours,
        },
        success: function (response) {
          Swal.fire("Success!", response, "success");
        },
        error: function (xhr, status, error) {
          Swal.fire("Error!", "Something went wrong!", "error");
        },
      });
    }
  });
});
