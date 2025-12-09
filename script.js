// script.js - accessible slider, form handling (POST /api/subscribe), reduced-motion handling, footer year
(function () {
  // Utility
  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  // Year in footer
  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Respect prefers-reduced-motion: pause/hide autoplay video
  const video = qs(".hero-video");
  try {
    const prefersReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (video && prefersReduce) {
      video.pause();
      // the CSS also hides the video for reduced-motion users
    }
  } catch (e) {
    // ignore
  }

  // Accessible slider implementation
  const slider = qs("#slider");
  const prevBtn = qs("#prevBtn");
  const nextBtn = qs("#nextBtn");

  function scrollByCard(direction = 1) {
    if (!slider) return;
    const card = slider.querySelector(".card");
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    // include gap likely handled by CSS; use card width as base
    const cardWidth = cardRect.width + 16; // 16px as an approximate gap fallback
    slider.scrollBy({ left: cardWidth * direction, behavior: "smooth" });
  }

  if (prevBtn) prevBtn.addEventListener("click", () => scrollByCard(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => scrollByCard(1));

  // Keyboard support for slider (when focused)
  if (slider) {
    slider.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          scrollByCard(-1);
          break;
        case "ArrowRight":
          e.preventDefault();
          scrollByCard(1);
          break;
        case "Home":
          e.preventDefault();
          slider.scrollTo({ left: 0, behavior: "smooth" });
          break;
        case "End":
          e.preventDefault();
          slider.scrollTo({ left: slider.scrollWidth, behavior: "smooth" });
          break;
      }
    });

    // Make sure cards are reachable by keyboard (they have tabindex="0" in markup)
    qsa(".card", slider).forEach((card) => {
      card.addEventListener("focus", () => {
        card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      });
    });
  }

  // Newsletter form handling (client-side) - POSTS to /api/subscribe
  const newsletter = qs("#newsletter");
  const emailInput = qs("#email");
  const statusEl = qs("#newsletter-status");

  function showStatus(message, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.style.color = isError ? "crimson" : "green";
    if (!isError) setTimeout(() => { statusEl.textContent = ""; }, 6000);
  }

  if (newsletter && emailInput) {
    newsletter.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const val = emailInput.value.trim();
      const simpleEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!simpleEmail.test(val)) {
        showStatus("Please enter a valid email address.", true);
        emailInput.focus();
        return;
      }

      // POST to the serverless endpoint that accepts { email } JSON
      try {
        showStatus("Subscribing…");

        const resp = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: val })
        });

        const data = await resp.json();

        if (!resp.ok) {
          // data.message expected from server
          throw new Error(data?.message || "Subscription failed");
        }

        newsletter.reset();
        showStatus(data?.message || "Thanks — you're on the list!");
      } catch (err) {
        console.error(err);
        showStatus(err.message || "Subscription failed. Please try again later.", true);
      }
    });
  }

  // Make enter/space activate arrow buttons for assistive key users
  [prevBtn, nextBtn].forEach((btn) => {
    if (!btn) return;
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
})();
