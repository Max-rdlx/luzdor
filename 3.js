// ========== NAVBAR SCROLL EFFECT ==========

let lastScroll = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // Cambiar estilo del navbar al hacer scroll
  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Ocultar y mostrar navbar según dirección del scroll
  if (currentScroll > lastScroll && currentScroll > 150) {
    navbar.style.transform = "translateY(-100%)";  // ocultar
  } else {
    navbar.style.transform = "translateY(0)";  // mostrar
  }

  lastScroll = currentScroll;
});


// ========== SCROLL SUAVE MEJORADO ==========
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});


// ========== ANIMACIÓN DE APARICIÓN SUAVE (fade-in) ==========
const elements = document.querySelectorAll(".card, .nosotros, .hero-content");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.2
});

elements.forEach(el => observer.observe(el));


// ========== EFECTO HOVER EN LINKS DEL NAV ==========
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("mouseenter", () => {
    link.style.letterSpacing = "2px";
    link.style.transition = "0.3s";
  });

  link.addEventListener("mouseleave", () => {
    link.style.letterSpacing = "1px";
  });
});