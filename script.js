document.addEventListener("DOMContentLoaded", () => {
  /* =======================
     PRELOADER
     ======================= */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("fade-out");
    }, 1000);
  });

  /* =======================
     CURSOR TRAIL
     ======================= */
  const cursorDot = document.getElementById("cursor-dot");
  const cursorOutline = document.getElementById("cursor-outline");

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline with slight lag
    cursorOutline.animate({
      left: `${posX}px`,
      top: `${posY}px`
    }, { duration: 500, fill: "forwards" });

    // Hover effect
    if (e.target.closest("a, button, .glass")) {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorOutline.style.borderColor = "var(--secondary-color)";
    } else {
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.style.borderColor = "var(--primary-color)";
    }
  });

  /* =======================
     PARTICLES BACKGROUND
     ======================= */
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let particlesArray = [];

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      else if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      else if (this.y < 0) this.y = canvas.height;
    }
    draw() {
      ctx.fillStyle = "rgba(56, 189, 248, 0.3)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < 60; i++) {
      particlesArray.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  /* =======================
     3D TILT EFFECT
     ======================= */
  const cards = document.querySelectorAll(".project-card");
  cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      if (window.innerWidth <= 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  });

  /* =======================
     NAVBAR UTILS
     ======================= */
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section");

  window.onscroll = () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
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

    // Reveal animations
    revealOnScroll();
  };

  /* =======================
     SCROLL REVEAL ANIMATION
     ======================= */
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealElements.forEach(el => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 100;

      if (revealTop < windowHeight - revealPoint) {
        el.classList.add("active");
        
        const children = el.querySelectorAll(".reveal-item");
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add("active");
          }, index * 100);
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

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("active");
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  /* =======================
     RIPPLE EFFECT
     ======================= */
  const btns = document.querySelectorAll(".btn");
  btns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* =======================
     TYPING ANIMATION
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

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  if (typingEl) type();
});
