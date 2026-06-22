/* =================================================================
   FINARA — script interaktif
   1. Navbar berubah saat di-scroll
   2. Menu hamburger (mobile)
   3. Tab timeline (Basic / Growth / Intensive)
   4. Counter angka statistik animasi
   5. Scroll reveal (elemen muncul saat masuk layar)
   6. Tahun otomatis di footer
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- 1. Navbar saat scroll ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 2. Menu hamburger (mobile) ---------- */
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  const toggleMenu = (open) => {
    navLinks.classList.toggle("is-open", open);
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open);
  };

  burger.addEventListener("click", () => {
    toggleMenu(!navLinks.classList.contains("is-open"));
  });
  // Tutup menu setelah klik link
  navLinks.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => toggleMenu(false))
  );

  /* ---------- 3. Tab timeline ---------- */
  const tabs = document.querySelectorAll(".tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      document.querySelectorAll(".tab-panel").forEach((panel) =>
        panel.classList.toggle("is-active", panel.id === "tab-" + target)
      );
    });
  });

  /* ---------- 4. Counter angka statistik ---------- */
  const counters = document.querySelectorAll(".stat__num");

  const animateCount = (el) => {
    const target = +el.dataset.count;
    const duration = 1400; // ms
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // easing easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => countObserver.observe(c));

  /* ---------- 5. Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- 6. Tahun otomatis di footer ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});