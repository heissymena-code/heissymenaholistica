document.documentElement.classList.add("js");

const menuButton = document.querySelector(".mobile-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    document.body.classList.toggle("menu-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "×" : "☰";
  });
}

const cookieBanner = document.querySelector(".cookie");
const cookiePreferenceKey = "heissy-cookie-preference";
const cookiePreferenceDuration = 180 * 24 * 60 * 60 * 1000;

if (cookieBanner) {
  let hasValidPreference = false;

  try {
    const savedPreference = JSON.parse(
      localStorage.getItem(cookiePreferenceKey),
    );

    hasValidPreference =
      typeof savedPreference?.choice === "string" &&
      savedPreference.expiresAt > Date.now();

    if (!hasValidPreference) {
      localStorage.removeItem(cookiePreferenceKey);
    }
  } catch {
    hasValidPreference = false;
  }

  if (hasValidPreference) {
    cookieBanner.remove();
  } else {
    cookieBanner.querySelectorAll("[data-cookie]").forEach((button) => {
      button.addEventListener("click", () => {
        try {
          localStorage.setItem(
            cookiePreferenceKey,
            JSON.stringify({
              choice: button.dataset.cookie,
              expiresAt: Date.now() + cookiePreferenceDuration,
            }),
          );
        } catch {
          // El aviso puede cerrarse aunque el navegador bloquee el almacenamiento.
        }

        cookieBanner.remove();
      });
    });
  }
}

document.querySelectorAll(".js-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const status = form.querySelector(".form-status");
    status?.classList.add("show");
    form.reset();
    status?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px",
  },
);

document.querySelectorAll(".reveal").forEach((element) => {
  revealObserver.observe(element);
});
