/* ==========================================================================
   shadow council — runtime
   No dependencies. Everything degrades if this file never loads.
   ========================================================================== */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var prefersReduced = function () { return reduceMotion.matches; };

  var THEME_KEY = "sc-theme";
  var MATRIX_KEY = "sc-matrix";
  var GLYPHS = "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎ0123456789ABCDEF<>/\\[]{}#$%&*+=-_|";

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }
  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }

  /* -- theme toggle ------------------------------------------------------ */

  function currentTheme() { return document.documentElement.dataset.theme || "dark"; }

  function applyTheme(next) {
    document.documentElement.dataset.theme = next;
    store(THEME_KEY, next);
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", next === "light" ? "#ece2cb" : "#04070a");
    if (window.__scMatrix && window.__scMatrix.repaint) window.__scMatrix.repaint(next);
  }

  function initTheme() {
    $$("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTheme(currentTheme() === "light" ? "dark" : "light");
        say("phosphor -> " + currentTheme());
      });
    });
  }

  /* -- status line ------------------------------------------------------- */

  var statusEl = $("[data-statusline]");
  var statusTimer = null;
  function say(msg) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { statusEl.textContent = "idle"; }, 2600);
  }

  /* -- matrix rain ------------------------------------------------------- */

  function initMatrix() {
    var canvas = document.getElementById("matrix");
    if (!canvas) return null;

    var ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return null;

    var glyphs = GLYPHS, fontSize = 15, columns = 0, drops = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var enabled = read(MATRIX_KEY) !== "off";
    var running = false, rafId = null, lastFrame = 0;

    function palette(theme) {
      return theme === "light"
        ? { fill: "#3b2a0c", head: "#a75a08" }
        : { fill: "#00ff9c", head: "#b7f2cd" };
    }
    var colors = palette(currentTheme());

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      fontSize = Math.max(13, Math.min(17, Math.round(window.innerWidth / 90)));
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = fontSize + "px " + getComputedStyle(document.body).fontFamily;
      columns = Math.ceil(window.innerWidth / fontSize);
      drops = [];
      for (var i = 0; i < columns; i++) drops.push(Math.random() * -60);
      clear();
    }

    function clear() {
      ctx.fillStyle = currentTheme() === "light" ? "#ece2cb" : "#04070a";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    }

    function step(ts) {
      rafId = window.requestAnimationFrame(step);
      if (!enabled || prefersReduced() || document.hidden) return;

      var dt = lastFrame ? Math.min((ts - lastFrame) / 16.67, 3) : 1;
      lastFrame = ts;

      ctx.fillStyle = currentTheme() === "light" ? "rgba(236,226,203,0.10)" : "rgba(4,7,10,0.10)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      for (var i = 0; i < drops.length; i++) {
        var x = i * fontSize;
        var y = drops[i] * fontSize;
        var ch = glyphs[(Math.random() * glyphs.length) | 0];

        ctx.fillStyle = colors.head;
        ctx.fillText(ch, x, y);
        ctx.fillStyle = colors.fill;
        ctx.fillText(glyphs[(Math.random() * glyphs.length) | 0], x, y - fontSize);

        if (y > window.innerHeight && Math.random() > 0.975) drops[i] = Math.random() * -20;
        drops[i] += dt * 0.85;
      }
    }

    function start() {
      if (running || prefersReduced()) return;
      running = true;
      lastFrame = 0;
      clear();
      rafId = window.requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    function repaint(theme) {
      glyphs = theme === "light" ? "01" : GLYPHS;
      colors = palette(theme || currentTheme());
      clear();
    }

    function toggle() {
      enabled = !enabled;
      store(MATRIX_KEY, enabled ? "on" : "off");
      canvas.style.display = enabled ? "" : "none";
      if (enabled) start(); else { stop(); clear(); }
      say("rain " + (enabled ? "on" : "off"));
      return enabled;
    }

    var rt = null;
    window.addEventListener("resize", function () {
      clearTimeout(rt);
      rt = setTimeout(resize, 180);
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else start();
    });

    reduceMotion.addEventListener("change", function () {
      if (prefersReduced()) { stop(); canvas.style.display = "none"; }
      else { canvas.style.display = ""; resize(); start(); }
    });

    resize();
    if (enabled && !prefersReduced()) start(); else canvas.style.display = "none";

    return { toggle: toggle, repaint: repaint };
  }

  /* -- typewriter -------------------------------------------------------- */

  function initTypewriter() {
    var el = $("[data-type-target]");
    if (!el || prefersReduced()) return;

    var text = (el.dataset.typeText || el.textContent || "").trim();
    if (!text) return;

    var out = "";
    var i = 0;
    var deleting = false;
    var SPEED = 58;

    function tick() {
      var delay = SPEED;

      if (!deleting) {
        var next = text.charAt(i);
        // occasional character scramble on the way in
        if (Math.random() < 0.09 && i < text.length - 1) {
          var pool = "!<>-_\\/[]{}—=+*^?#01";
          next = pool.charAt((Math.random() * pool.length) | 0);
          delay = 34;
        } else {
          i++;
        }
        out += next;
      } else {
        out = out.slice(0, -1);
        i = Math.min(i, out.length);
        delay = 26;
      }

      el.textContent = out;

      if (!deleting && i >= text.length) {
        deleting = true;
        delay = 2600;
      } else if (deleting && out === "") {
        deleting = false;
        i = 0;
        delay = 420;
      }

      window.setTimeout(tick, delay);
    }

    el.textContent = "";
    window.setTimeout(tick, 480);
  }

  /* -- glitch decode on load --------------------------------------------- */

  function initDecode() {
    if (prefersReduced()) return;
    $$(".glitch").forEach(function (el, i) {
      el.classList.add("is-decoding");
      window.setTimeout(function () { el.classList.remove("is-decoding"); }, 1800 + i * 120);
    });
  }

  /* -- counters ---------------------------------------------------------- */

  function initCounters() {
    var nodes = $$("[data-count]");
    if (!nodes.length) return;
    if (prefersReduced()) {
      nodes.forEach(function (n) { n.textContent = n.dataset.count; });
      return;
    }
    nodes.forEach(function (node) {
      var target = parseInt(node.dataset.count, 10) || 0;
      var start = performance.now();
      var dur = 900;
      (function frame(ts) {
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = String(Math.round(target * eased));
        if (p < 1) window.requestAnimationFrame(frame);
      })(start);
    });
  }

  /* -- code blocks: label + copy button ---------------------------------- */

  function initCode() {
    $$("div.highlighter-rouge, pre").forEach(function (block) {
      var pre = block.tagName === "PRE" ? block : $("pre", block);
      if (!pre || pre.hasAttribute("data-lang")) return;
      if (pre.closest(".hero, .panel--panic")) return;

      var code = $("code", pre);
      if (!code) return;

      var holder = block.closest('[class*="language-"]');
      var m = (holder && holder.className.match(/language-([\w+#-]+)/)) ||
              code.className.match(/language-([\w+#-]+)/) ||
              block.className.match(/language-([\w+#-]+)/);
      pre.setAttribute("data-lang", m ? m[1] : "text");

      if (!navigator.clipboard) return;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-code";
      btn.textContent = "copy";
      btn.setAttribute("aria-label", "Copy code block");
      btn.addEventListener("click", function () {
        navigator.clipboard.writeText(code.innerText).then(function () {
          btn.textContent = "copied";
          window.setTimeout(function () { btn.textContent = "copy"; }, 1600);
        }).catch(function () { btn.textContent = "denied"; });
      });
      pre.appendChild(btn);
    });
  }

  /* -- 404 panic boot ---------------------------------------------------- */

  function initPanic() {
    var pre = $("[data-panic] code");
    if (!pre || prefersReduced()) return;

    var path = window.location.pathname;
    var addr = (Math.random() * 0xffffffff) >>> 0;
    var lines = [
      "no-one@shadow:~# dmesg | tail -3",
      "[  " + String(Date.now()).slice(-9) + ".774032] segfault at 0x" + addr.toString(16) + " ip 00007ffff7a3c1e sp 00007ffd0c1e4b30 error 4 in libc.so.6",
      "[  " + String(Date.now()).slice(-9) + ".774033] Code: 48 8b 47 10 48 85 c0 74 0e 48 8b 40 10 48 85 c0 74 05 b8 ff ff ff ff 48 83 c4 08 c3 90",
      "kernel panic - not syncing: Attempted to kill init! exitcode=0x0000000b",
      "",
      "map: 0x" + addr.toString(16) + "  ->  " + path,
      "resolving '" + path + "' ...... failed (2: No such file or directory)"
    ];

    var i = 0;
    (function write() {
      if (i >= lines.length) {
        window.setTimeout(function () { say("fatal"); }, 400);
        return;
      }
      pre.textContent += lines[i] + "\n";
      i++;
      window.setTimeout(write, 120 + Math.random() * 180);
    })();
  }

  /* -- footer flourishes ------------------------------------------------- */

  function initFooter() {
    var year = $("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());

    var up = $("[data-uptime]");
    if (up) {
      var booted = Date.now();
      up.textContent = "00:00:00";
      window.setInterval(function () {
        var s = Math.floor((Date.now() - booted) / 1000);
        var h = String(Math.floor(s / 3600)).padStart(2, "0");
        var m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
        var ss = String(s % 60).padStart(2, "0");
        up.textContent = h + ":" + m + ":" + ss;
      }, 1000);
    }
  }

  /* -- keyboard ---------------------------------------------------------- */

  function initKeys() {
    document.addEventListener("keydown", function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (e.key === "t" || e.key === "T") {
        applyTheme(currentTheme() === "light" ? "dark" : "light");
        say("phosphor -> " + currentTheme());
      } else if ((e.key === "m" || e.key === "M") && window.__scMatrix) {
        window.__scMatrix.toggle();
      } else if (e.key === "/") {
        e.preventDefault();
        var first = $(".entries .entry__title a");
        if (first) first.focus();
      }
    });
  }

  /* -- boot -------------------------------------------------------------- */

  function boot() {
    initTheme();
    window.__scMatrix = initMatrix();
    initTypewriter();
    initDecode();
    initCounters();
    initCode();
    initPanic();
    initFooter();
    initKeys();

    var bootLines = ["mounting /", "loading theme.glitch", "checksum ok", "ready"];
    if (statusEl) {
      var n = 0;
      var id = window.setInterval(function () {
        if (n >= bootLines.length) { window.clearInterval(id); statusEl.textContent = "idle"; return; }
        statusEl.textContent = bootLines[n++];
      }, 260);
    }

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
