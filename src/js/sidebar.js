// Get the current URL
var url = window.location.pathname;

// Get all <a> elements inside the sidebar
var links = document.querySelectorAll(".menu a");

// Loop through each <a> element
links.forEach(function (link) {
  // If the href attribute matches the current URL
  if (link.getAttribute("href") === url) {
    // Add the 'active' classes
    link.classList.add("text-white", "bg-blue-600", "rounded-md");
  }
});
