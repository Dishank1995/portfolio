document.addEventListener("DOMContentLoaded", () => {
  /* =======================
     PRELOADER
     ======================= */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        preloader.style.transition = "opacity 0.8s ease, visibility 0.8s";
      }
    }, 800);
  });

  /* =======================
     CUSTOM GLOW CURSOR
     ======================= */
  const cursorDot = document.getElementById("cursor-dot");
  if (cursorDot && window.innerWidth > 768) {
    window.addEventListener("mousemove", (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      if (e.target.closest("a, button, .glass, .skill-card, .project-card, .cert-card")) {
        cursorDot.style.width = "38px";
        cursorDot.style.height = "38px";
        cursorDot.style.opacity = "0.35";
        cursorDot.style.borderColor = "var(--primary-color)";
      } else {
        cursorDot.style.width = "14px";
        cursorDot.style.height = "14px";
        cursorDot.style.opacity = "0.6";
      }
    });
  }

  /* =======================
     BACKGROUND BLOBS PARALLAX
     ======================= */
  const blobs = document.querySelectorAll(".blob");
  if (blobs.length > 0) {
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 50;
      const y = (e.clientY / window.innerHeight - 0.5) * 50;

      blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.3;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });
  }

  /* =======================
     NAVBAR & SCROLL ACTIVE LINKS
     ======================= */
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");
  const heroContent = document.querySelector(".hero-content");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    
    // Hero Parallax
    if (heroContent && scrolled < 800) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = 1 - (scrolled / 650);
    }

    // Active Navigation Highlighting
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (scrolled >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (current && link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    revealOnScroll();
  });

  /* =======================
     SCROLL REVEAL ANIMATIONS
     ======================= */
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealElements.forEach((el) => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 80;

      if (revealTop < windowHeight - revealPoint) {
        el.classList.add("active");
        
        const children = el.querySelectorAll(".reveal-item");
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add("active");
          }, index * 120);
        });
      }
    });
  }

  revealOnScroll();

  /* =======================
     MOBILE MENU TOGGLE
     ======================= */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinksContainer = document.querySelector(".nav-links");

  if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active");
      menuToggle.innerHTML = navLinksContainer.classList.contains("active") 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("active");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  /* =======================
     TYPING ANIMATION (ROLES FROM RESUME)
     ======================= */
  const typingEl = document.querySelector(".typing");
  const roles = [
    "Full Stack Developer",
    "AI & ML Specialist",
    "Java & Python Developer",
    "Cloud & DevOps Enthusiast"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    if (!typingEl) return;
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      typingEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 800;
    }

    setTimeout(type, typeSpeed);
  }

  if (typingEl) type();
});
