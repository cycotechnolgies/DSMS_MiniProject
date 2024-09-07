document.getElementById('uptBtn').addEventListener('click', function() {
  const medId = this.getAttribute('data-medid'); // Get the medId from the button's data attribute

  Swal.fire({
    title: 'Update Form',
    html: `<input id="textInput" style="width: 50%;" type="text" placeholder="Reference No." required class="swal2-input">
           <input id="dateInput" style="width: 50%;" required  type="date" class="swal2-input">
           <input id="timeInput" style="width: 50%;" required type="time" class="swal2-input">`,
    showCancelButton: true,
    confirmButtonText: 'Update',
    cancelButtonText: 'Cancel',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const textInput = Swal.getPopup().querySelector('#textInput').value;
      const dateInput = Swal.getPopup().querySelector('#dateInput').value;
      const timeInput = Swal.getPopup().querySelector('#timeInput').value;
      // Perform your AJAX request to submit data to PHP script
      return fetch('mediUpdate.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textInput, dateInput, timeInput, medId }), // Include medId in the request data
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .catch(error => {
        Swal.showValidationMessage(
          `Request failed: ${error}`
        );
      });
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
  .then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Updated!',
        'Your data has been updated.',
        'success'
      ).then(() => {
          // Refresh the page after the popup is closed
          location.reload();
        });
    }
  });
});
