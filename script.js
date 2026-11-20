const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const logoCard = document.querySelector(".logo-card");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (logoCard && !reduceMotion.matches) {
  let startTime;

  const animateBorder = timestamp => {
    if (startTime === undefined) startTime = timestamp;
    const angle = ((timestamp - startTime) * 0.08) % 360;
    logoCard.style.setProperty("--border-angle", `${angle}deg`);
    window.requestAnimationFrame(animateBorder);
  };

  window.requestAnimationFrame(animateBorder);
}

