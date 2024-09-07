function buyNow() {
  var name = document.getElementById("name");
  var price = document.getElementById("price");

  var form = new FormData();
  form.append("name", name.innerHTML);
  form.append("price", price.innerHTML);

  console.log(name.innerHTML, price.innerHTML);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "process.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      var data = JSON.parse(xhr.responseText);

      // Payment completed. It can be a successful failure.
      payhere.onCompleted = function onCompleted(orderId) {
        console.log("Payment completed. OrderID:" + orderId);
      };

      // Payment window closed
      payhere.onDismissed = function onDismissed() {
        // Note: Prompt user to pay again or show an error page
        console.log("Payment dismissed");
      };

      // Error occurred
      payhere.onError = function onError(error) {
        // Note: show an error page
        console.log("Error:" + error);
      };

      // Put the payment variables here
      var payment = {
        sandbox: true,
        merchant_id: data.merchant_id, // Replace your Merchant ID
        return_url: undefined,
        cancel_url: undefined, // Important
        notify_url: "http://sample.com/notify",
        order_id: data.order_id,
        items: data.name,
        amount: data.price,
        currency: data.currency,
        hash: data.hash, // *Replace with generated hash retrieved from backend
        first_name: "Saman",
        last_name: "Perera",
        email: "samanp@gmail.com",
        phone: "0771234567",
        address: "No.1, Galle Road",
        city: "Colombo",
        country: "Sri Lanka",
      };

      // Show the payhere.js popup, when "PayHere Pay" is clicked
      payhere.startPayment(payment);
    }
  };
  xhr.send(form);
}
