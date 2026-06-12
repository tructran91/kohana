document.addEventListener("DOMContentLoaded", function () {
    var header = document.querySelector(".site-header");
    var navLinks = document.querySelectorAll(".nav-link");
    var sections = [];

    navLinks.forEach(function (link) {
        var id = link.getAttribute("data-target");
        var section = document.getElementById(id);
        if (section) sections.push({ id: id, el: section, link: link });
    });

    // Smooth scroll khi click menu
    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            var targetId = link.getAttribute("data-target");
            var target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                var headerHeight = header ? header.offsetHeight : 0;
                var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: top, behavior: "smooth" });

                // set active ngay khi click
                navLinks.forEach(function (l) { l.classList.remove("active"); });
                link.classList.add("active");
            }
        });
    });

    // Sticky header shadow + active menu theo scroll
    function onScroll() {
        if (window.scrollY > 10) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        var headerHeight = header ? header.offsetHeight : 0;
        var current = sections[0];

        sections.forEach(function (s) {
            var rect = s.el.getBoundingClientRect();
            if (rect.top - headerHeight <= 80) {
                current = s;
            }
        });

        navLinks.forEach(function (l) { l.classList.remove("active"); });
        if (current) current.link.classList.add("active");
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
});
