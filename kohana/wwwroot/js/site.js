// ===== Dark mode detect (giống script trong index.html gốc) =====
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
  // Gắn sự kiện cho mọi nút có data-scroll-to
  document.querySelectorAll("[data-scroll-to]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      scrollToId(btn.getAttribute("data-scroll-to"));
    });
  });

  // ===== IntersectionObserver thay cho whileInView của framer-motion =====
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

  // ===== Form liên hệ: submit qua fetch, hiển thị alert giống bản React =====
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
          alert("メッセージを送信しました。");
          contactForm.reset();
        })
        .catch(function () {
          alert("送信中にエラーが発生しました。もう一度お試しください。");
        });
    });
  }

  // ===== Khởi tạo bản đồ Leaflet (thay react-leaflet) =====
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
          "<strong>KOHANA国際貿易株式会社</strong><br />" +
          "〒274-0067 千葉県船橋市<br />大穴南1丁目40番6号<br />" +
          "TEL: 047-466-8658" +
          "</div>"
      );
  }
});
