const navToggle = document.querySelector("#navToggle");
const siteNav = document.querySelector("#siteNav");
const progress = document.querySelector("#progress");
const particleBg = document.querySelector(".particle-bg");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main .section[id]");
const copyEmail = document.querySelector("#copyEmail");
const toast = document.querySelector("#toast");
const revealTargets = document.querySelectorAll(
  ".section-heading, .about-card, .skill-card, .project-card, .certificate-card, .service-card, .contact-panel, .pill-grid span"
);

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
};

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (!event.target.matches("a")) return;
  siteNav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
});

window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percentage}%`;
  particleBg.style.setProperty("--particle-shift", `${Math.min(window.scrollY * 0.04, 68)}px`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-38% 0px -52% 0px" });

sections.forEach((section) => observer.observe(section));

revealTargets.forEach((target, index) => {
  target.classList.add("reveal");

  if (target.matches(".about-card, .project-card, .certificate-card")) {
    target.classList.add(index % 2 === 0 ? "reveal-left" : "reveal-right");
  }

  if (target.matches(".service-card, .pill-grid span")) {
    target.classList.add("reveal-scale", `delay-${(index % 4) + 1}`);
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.16, rootMargin: "0px 0px -80px 0px" });

revealTargets.forEach((target) => revealObserver.observe(target));

copyEmail.addEventListener("click", async () => {
  const email = copyEmail.dataset.email;

  try {
    await navigator.clipboard.writeText(email);
    showToast("Gmail copied: alagaeron@gmail.com");
  } catch {
    showToast("Copy failed. Gmail: alagaeron@gmail.com");
  }
});
