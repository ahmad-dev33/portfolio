/* Static portfolio behaviour – vanilla JavaScript only.
   No React, no frameworks, no build step. */
(function () {
  "use strict";

  /* Optional: set this to your Django API root (with trailing slash), e.g.
     "https://your-backend.onrender.com/api/". Leave empty to use the mail fallback. */
  var API_URL = "";

  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    /* ---------- Preloader ---------- */
    var preloader = document.getElementById("preloader");
    if (preloader) {
      var hide = function () { preloader.classList.add("done"); };
      if (document.readyState === "complete") {
        window.setTimeout(hide, 350);
      } else {
        window.addEventListener("load", function () { window.setTimeout(hide, 350); });
        window.setTimeout(hide, 1600); // safety net
      }
    }

    /* ---------- Footer year ---------- */
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    /* ---------- Navigation ---------- */
    var nav = document.getElementById("siteNav");
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("primary-nav");

    function onScroll() {
      if (nav) nav.classList.toggle("sticky", window.scrollY >= 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var open = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      links.addEventListener("click", function (e) {
        if (e.target.closest("a")) {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && links.classList.contains("open")) {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
          toggle.focus();
        }
      });
      document.addEventListener("click", function (e) {
        if (links.classList.contains("open") && !nav.contains(e.target)) {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
      });
    }

    /* ---------- Typewriter ---------- */
    var typeTarget = document.getElementById("typewriter");
    if (typeTarget) {
      var phrases = [
        "Software Developer",
        "Freelancer",
        "MERN Stack Developer",
        "Open Source Contributor"
      ];
      var phrase = 0;
      var char = 0;
      var deleting = false;
      function tick() {
        var current = phrases[phrase];
        char += deleting ? -1 : 1;
        typeTarget.textContent = current.slice(0, char);
        var delay = deleting ? 50 : 110;
        if (!deleting && char === current.length) {
          deleting = true;
          delay = 1600;
        } else if (deleting && char === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          delay = 400;
        }
        window.setTimeout(tick, delay);
      }
      window.setTimeout(tick, 500);
    }

    /* ---------- Lightweight particle background ---------- */
    var canvas = document.getElementById("particles");
    if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var ctx = canvas.getContext("2d");
      var dots = [];
      var width = 0;
      var height = 0;
      var raf = null;

      function resize() {
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var count = Math.min(70, Math.max(25, Math.round((width * height) / 22000)));
        dots = [];
        for (var i = 0; i < count; i++) {
          dots.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            r: Math.random() * 1.6 + 0.6
          });
        }
      }

      function draw() {
        ctx.clearRect(0, 0, width, height);
        for (var i = 0; i < dots.length; i++) {
          var d = dots[i];
          d.x += d.vx;
          d.y += d.vy;
          if (d.x < 0 || d.x > width) d.vx *= -1;
          if (d.y < 0 || d.y > height) d.vy *= -1;
          ctx.beginPath();
          ctx.fillStyle = "rgba(199, 112, 240, 0.55)";
          ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
          ctx.fill();
          for (var j = i + 1; j < dots.length; j++) {
            var e = dots[j];
            var dx = d.x - e.x;
            var dy = d.y - e.y;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              ctx.beginPath();
              ctx.strokeStyle = "rgba(199, 112, 240, " + (0.14 * (1 - dist / 120)).toFixed(3) + ")";
              ctx.lineWidth = 1;
              ctx.moveTo(d.x, d.y);
              ctx.lineTo(e.x, e.y);
              ctx.stroke();
            }
          }
        }
        raf = window.requestAnimationFrame(draw);
      }

      resize();
      window.addEventListener("resize", resize);
      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          if (raf) window.cancelAnimationFrame(raf);
        } else {
          draw();
        }
      });
      if (!document.hidden) draw();
    }

    /* ---------- Contact form ---------- */
    var form = document.getElementById("contactForm");
    if (form) {
      var messageBox = document.getElementById("formMessage");
      var submitButton = document.getElementById("submitButton");

      function showMessage(text, ok) {
        if (!messageBox) return;
        messageBox.textContent = text;
        messageBox.className = "form-message show " + (ok ? "success" : "error");
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        var name = form.elements.name.value.trim();
        var email = form.elements.email.value.trim();
        var body = form.elements.message.value.trim();

        if (API_URL) {
          submitButton.disabled = true;
          submitButton.textContent = "Sending...";
          fetch(API_URL.replace(/\/+$/, "") + "/contact/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, email: email, message: body })
          })
            .then(function (res) {
              if (!res.ok) throw new Error("Request failed");
              form.reset();
              showMessage("Thanks! Your message was sent successfully.", true);
            })
            .catch(function () {
              showMessage("Could not send the message. Please email me directly.", false);
            })
            .finally(function () {
              submitButton.disabled = false;
              submitButton.textContent = "Send Message";
            });
        } else {
          var subject = encodeURIComponent("Portfolio contact from " + name);
          var mailBody = encodeURIComponent(body + "\n\nFrom: " + name + "\nEmail: " + email);
          window.location.href = "mailto:ahmad.dana963@gmail.com?subject=" + subject + "&body=" + mailBody;
          showMessage("Your email app is opening with the message ready to send.", true);
        }
      });
    }
  });
})();
