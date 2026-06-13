// ===== Dark mode detect (gi?ng script trong index.html g?c) =====
(function () {
  try {
    let theme = localStorage.getItem("theme");
    if (theme === "system" || !theme) {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      theme = prefersDark ? "dark" : "light";
    }
    document.documentElement.classList.add(theme);
  } catch (e) {}
})();

// ===== Smooth scroll cho nav (thay hàm scrollTo trong React) =====
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // G?n s? ki?n cho m?i nút có data-scroll-to
  document.querySelectorAll("[data-scroll-to]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      scrollToId(btn.getAttribute("data-scroll-to"));
    });
  });

  // ===== IntersectionObserver thay cho whileInView c?a framer-motion =====
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade-up, .fade-left").forEach(function (el) {
    observer.observe(el);
  });

  // ===== Form liên h?: submit qua fetch, hi?n th? alert gi?ng b?n React =====
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);

      fetch(contactForm.action, {
        method: "POST",
        body: formData,
      })
        .then(function () {
          alert("?????????????");
          contactForm.reset();
        })
        .catch(function () {
          alert("???????????????????????????");
        });
    });
  }

  // ===== Kh?i t?o b?n d? Leaflet (thay react-leaflet) =====
  const mapEl = document.getElementById("company-map");
  if (mapEl && window.L) {
    const lat = parseFloat(mapEl.dataset.lat);
    const lng = parseFloat(mapEl.dataset.lng);
    const zoom = parseInt(mapEl.dataset.zoom, 10);

    const map = L.map("company-map", { scrollWheelZoom: false }).setView([lat, lng], zoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        '<div style="font-family:\'Noto Sans JP\',sans-serif;font-size:12px;line-height:1.8;">' +
          "<strong>KOHANA????????</strong><br />" +
          "?274-0067 ??????<br />???1??40?6?<br />" +
          "TEL: 047-466-8658" +
          "</div>"
      );
  }
});
