(function () {
    // localStorage can throw (private mode, blocked storage): never let it break the page
    const store = {
        get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
        set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignore */ } }
    };

    // --- Theme toggle (dark/light) ---
    const themeBtn = document.querySelector(".theme-btn");
    if (store.get("theme") === "light") document.body.classList.add("light-mode");
    themeBtn.addEventListener("click", () => {
        const light = document.body.classList.toggle("light-mode");
        store.set("theme", light ? "light" : "dark");
    });

    // --- Highlight the nav button of the section currently on screen ---
    const controls = [...document.querySelectorAll(".control")];
    if (controls.length && "IntersectionObserver" in window) {
        const byId = new Map(controls.map(c => [c.getAttribute("href").slice(1), c]));
        const setActive = id => controls.forEach(c => {
            const active = c === byId.get(id);
            c.classList.toggle("active-btn", active);
            if (active) c.setAttribute("aria-current", "true");
            else c.removeAttribute("aria-current");
        });
        // A section counts as "current" when it crosses the middle of the viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
        }, { rootMargin: "-50% 0px -50% 0px" });
        byId.forEach((_, id) => {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        });
    }

    // --- Keep the current section when switching language ---
    const langBtn = document.querySelector(".lang-btn");
    langBtn.addEventListener("click", () => {
        const current = document.querySelector(".control.active-btn");
        if (current && current.getAttribute("href") !== "#home") {
            langBtn.href = langBtn.getAttribute("href").split("#")[0] + current.getAttribute("href");
        }
    });

    // --- Phone number: decoded at runtime so it never appears in the raw HTML ---
    document.querySelectorAll("[data-phone]").forEach(card => {
        const number = atob(card.dataset.phone);                       // "+33624015475"
        const pretty = number.replace(/^\+33(\d)(\d{2})(\d{2})(\d{2})(\d{2})$/, "+33 $1 $2 $3 $4 $5");
        card.href = "tel:" + number;
        card.querySelector(".contact-value").textContent = pretty;
    });

    // --- Screenshot lightbox (project pages) ---
    const lightbox = document.querySelector(".lightbox");
    if (lightbox) {
        const lbImg = lightbox.querySelector("img");
        document.querySelectorAll(".shot").forEach(btn => {
            btn.addEventListener("click", () => {
                const img = btn.querySelector("img");
                lbImg.src = btn.dataset.full;
                lbImg.alt = img.alt;
                lightbox.showModal();
            });
        });
        lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
        // Click on the backdrop closes it
        lightbox.addEventListener("click", e => { if (e.target === lightbox) lightbox.close(); });
    }
})();
