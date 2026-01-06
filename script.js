// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(section => {
    if (section.getBoundingClientRect().top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });
});

// Typing animation
const text = [
  "Aspiring Software Developer",
  "Web & Cloud Enthusiast",
  "Open to Internship Opportunities"
];
let index = 0, charIndex = 0;
const typingEl = document.querySelector(".typing");

function type() {
  if (charIndex < text[index].length) {
    typingEl.textContent += text[index][charIndex++];
    setTimeout(type, 100);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  if (charIndex > 0) {
    typingEl.textContent = text[index].substring(0, --charIndex);
    setTimeout(erase, 50);
  } else {
    index = (index + 1) % text.length;
    setTimeout(type, 500);
  }
}

type();
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
}
