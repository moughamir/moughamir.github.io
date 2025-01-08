// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effect to navigation links
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("mouseover", () => {
      link.style.color = "#00c2cb";
    });
    link.addEventListener("mouseout", () => {
      link.style.color = "";
    });
  });

  // Add form submission alert
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you for your message!");
    contactForm.reset();
  });
});
