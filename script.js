// script.js - accessible slider, form handling, reduced-motion handling, footer year,
// and robust image fallback in case external images fail to load.
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
      // CSS also hides the video for reduced-motion users
    }
  } catch (e) {
    // ignore
  }

  // Image fallback: global handler that replaces failed images with a neutral SVG placeholder.
  // This prevents broken image icons and keeps the layout consistent.
  (function setupImageFallbacks() {
    const placeholderSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'><rect width='100%25' height='100%25' fill='%23f3f4f6'/><text x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial,Helvetica,sans-serif' font-size='24'>Image%20unavailable</text></svg>";

    qsa("img").forEach((img) => {
      // If the image already failed to load (naturalWidth === 0) replace now:
      if (!img.complete || img.naturalWidth === 0) {
        // don't override images that are intentionally blank (rare)
        // set placeholder (this triggers only if the image failed)
        // We check img.src to avoid infinite loop: if it's already the placeholder, skip.
        if (img.src !== placeholderSvg) {
          img.dataset.origSrc = img.src || "";
        }
      }

      // Attach an error listener to swap in the placeholder if loading fails
      img.addEventListener("error", function onError() {
        if (img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = "1";
        img.classList.add("img-fallback");
        img.src = placeholderSvg;
      }, { once: true });
    });
  })();

  // Accessible slider implementation
  const slider = qs("#slider");
  const prevBtn = qs("#prevBtn");
  const nextBtn = qs("#nextBtn");

  function scrollByCard(direction = 1) {
    if (!slider) return;
    const card = slider.querySelector(".card");
    if (!card) return;
    const cardRect = card.getBoundingClientRect();
    // include approximate gap as fallback
    const cardWidth = cardRect.width + 16;
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

  // Make enter/space activate arrow buttons for accessibility
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
