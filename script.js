// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector(link.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Back-to-top button functionality
  const backToTopButton = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Lightbox effect for image gallery
  const galleryImages = document.querySelectorAll(".gallery img");
  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      const lightbox = document.createElement("div");
      lightbox.id = "lightbox";
      document.body.appendChild(lightbox);

      const img = document.createElement("img");
      img.src = image.src;
      lightbox.appendChild(img);

      lightbox.addEventListener("click", () => {
        lightbox.remove();
      });
    });
  });

  // Form submission alert
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Thank you for your message!");
    contactForm.reset();
  });
});
