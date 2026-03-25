document.addEventListener("DOMContentLoaded", () => {
  /* =======================
     PRELOADER (APPLE STYLE)
     ======================= */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      preloader.style.transition = "opacity 1s ease, visibility 1s";
    }, 1200);
  });

  /* =======================
     LIGHT GLOWING CURSOR
     ======================= */
  const cursorDot = document.getElementById("cursor-dot");
  if (window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      if (e.target.closest("a, button, .glass")) {
        cursorDot.style.width = "40px";
        cursorDot.style.height = "40px";
        cursorDot.style.opacity = "0.3";
      } else {
        cursorDot.style.width = "15px";
        cursorDot.style.height = "15px";
        cursorDot.style.opacity = "0.6";
      }
    });
  }

  /* =======================
     BACKBROUND BLOBS PARALLAX
     ======================= */
  const blobs = document.querySelectorAll(".blob");
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 60;
    const y = (e.clientY / window.innerHeight - 0.5) * 60;

    blobs.forEach((blob, index) => {
      const speed = (index + 1) * 0.4;
      blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  /* =======================
     NAVBAR & PARALLAX
     ======================= */
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");
  const heroContent = document.querySelector(".hero-content");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    
    // Hero Parallax
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
      heroContent.style.opacity = 1 - (scrolled / 700);
    }

    // Active Link Highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });

    revealOnScroll();
  });

  /* =======================
     SCROLL REVEAL (STAGGER)
     ======================= */
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealElements.forEach(el => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 80;

      if (revealTop < windowHeight - revealPoint) {
        el.classList.add("active");
        
        const children = el.querySelectorAll(".reveal-item");
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add("active");
          }, index * 200); // 200ms Stagger
        });
      }
    });
  }

  revealOnScroll();

  /* =======================
     MOBILE MENU
     ======================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinksContainer = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
    menuToggle.innerHTML = navLinksContainer.classList.contains("active") 
      ? '<i class="fas fa-times"></i>' 
      : '<i class="fas fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  /* =======================
     TYPING ANIMATION (SLOW & SMOOTH)
     ======================= */
  const typingEl = document.querySelector(".typing");
  const roles = ["Full Stack Developer", "AI/ML Enthusiast", "Cloud Learner"];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 80 : 150; // Slower typing

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 3000; // Longer pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 1000; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  if (typingEl) type();
});
