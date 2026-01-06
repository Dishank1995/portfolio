document.addEventListener("DOMContentLoaded", function () {

  /* =======================
     HAMBURGER MENU
     ======================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked (mobile UX)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  /* =======================
     SCROLL REVEAL (DESKTOP)
     ======================= */
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(section => {
      if (section.getBoundingClientRect().top < window.innerHeight - 100) {
        section.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load

  /* =======================
     TYPING ANIMATION
     ======================= */
  const typingEl = document.querySelector(".typing");
  const text = [
    "Aspiring Software Developer",
    "Web & Cloud Enthusiast",
    "Open to Internship Opportunities"
  ];

  let index = 0;
  let charIndex = 0;

  function type() {
    if (!typingEl) return;

    if (charIndex < text[index].length) {
      typingEl.textContent += text[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (!typingEl) return;

    if (charIndex > 0) {
      typingEl.textContent = text[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);
    } else {
      index = (index + 1) % text.length;
      setTimeout(type, 500);
    }
  }

  type(); // start typing animation
});
