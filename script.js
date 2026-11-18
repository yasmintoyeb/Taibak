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

const heroTitle = document.querySelector(".hero h1");

if (heroTitle && typeof Intl.Segmenter === "function" && !reduceMotion.matches) {
  const segmenter = new Intl.Segmenter("km", { granularity: "grapheme" });
  const walker = document.createTreeWalker(heroTitle, NodeFilter.SHOW_TEXT);
  const textNodes = [];

  while (walker.nextNode()) textNodes.push(walker.currentNode);

  let letterIndex = 0;
  textNodes.forEach(textNode => {
    const fragment = document.createDocumentFragment();

    for (const { segment } of segmenter.segment(textNode.nodeValue)) {
      if (segment.trim() === "") {
        fragment.append(document.createTextNode(segment));
        continue;
      }

      const letter = document.createElement("span");
      letter.className = "hero-title-letter";
      letter.style.setProperty("--letter-delay", `${letterIndex * 55}ms`);
      letter.textContent = segment;
      fragment.append(letter);
      letterIndex += 1;
    }

    textNode.parentNode.replaceChild(fragment, textNode);
  });

  const stepDuration = 55;
  const animationDuration = 360;
  const pauseDuration = 900;
  const cycleDuration = (letterIndex - 1) * stepDuration + animationDuration + pauseDuration;

  const animateTitle = () => {
    heroTitle.classList.remove("is-letter-animating");
    window.requestAnimationFrame(() => heroTitle.classList.add("is-letter-animating"));
    window.setTimeout(animateTitle, cycleDuration);
  };

  if (letterIndex > 0) animateTitle();
}
