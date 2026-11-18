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

const languageToggle = document.getElementById("languageToggle");
const languageMenu = document.getElementById("languageMenu");
const languageLabel = document.getElementById("languageLabel");
const languageFlag = document.getElementById("languageFlag");
const languageNames = { km: "ខ្មែរ", en: "English", ar: "العربية" };
const languageFlags = {
  km: "assets/flag-kh.svg",
  en: "assets/flag-gb.svg",
  ar: "assets/flag-sa.svg"
};

const setDocumentLanguage = language => {
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  languageLabel.textContent = languageNames[language];
  languageFlag.src = languageFlags[language];
  languageToggle.setAttribute("aria-label", `ភាសាបច្ចុប្បន្ន៖ ${languageNames[language]}`);
};

languageToggle.addEventListener("click", () => {
  const isOpen = languageMenu.classList.toggle("open");
  languageToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("click", event => {
  if (!event.target.closest(".language-picker")) {
    languageMenu.classList.remove("open");
    languageToggle.setAttribute("aria-expanded", "false");
  }
});

window.googleTranslateReady = () => {
  if (window.google && window.google.translate) {
    new google.translate.TranslateElement({
      pageLanguage: "km",
      includedLanguages: "km,en,ar",
      autoDisplay: false
    }, "googleTranslateWidget");
  }

  const waitForTranslateSelect = () => {
    const translateSelect = document.querySelector("#googleTranslateWidget select");
    if (!translateSelect) {
      window.setTimeout(waitForTranslateSelect, 100);
      return;
    }

    languageMenu.querySelectorAll("[data-language]").forEach(option => {
      option.addEventListener("click", () => {
        const language = option.dataset.language;
        translateSelect.value = language;
        translateSelect.dispatchEvent(new Event("change"));
        setDocumentLanguage(language);
        try {
          localStorage.setItem("tcac-language", language);
        } catch (_) {}
        languageMenu.classList.remove("open");
        languageToggle.setAttribute("aria-expanded", "false");
      });
    });

    const savedLanguage = (() => {
      try {
        return localStorage.getItem("tcac-language");
      } catch (_) {
        return null;
      }
    })();

    if (savedLanguage && languageNames[savedLanguage]) {
      translateSelect.value = savedLanguage;
      translateSelect.dispatchEvent(new Event("change"));
      setDocumentLanguage(savedLanguage);
    }
  };

  waitForTranslateSelect();
};

if (!window.google || !window.google.translate) {
  const translateScript = document.createElement("script");
  translateScript.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateReady";
  document.body.appendChild(translateScript);
}

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

