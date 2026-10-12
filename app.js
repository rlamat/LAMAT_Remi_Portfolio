(function () {
    // localStorage can throw (private mode, blocked storage): never let it break the page
    const store = {
        get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
        set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* ignore */ } }
    };

    // --- Navigation between sections ---
    const controls = [...document.querySelectorAll(".control")];
    const sectionIds = controls.map(c => c.dataset.id);

    function showSection(id) {
        if (!sectionIds.includes(id)) id = "home";
        document.querySelectorAll(".container.active").forEach(s => s.classList.remove("active"));
        document.getElementById(id).classList.add("active");
        controls.forEach(c => {
            const isActive = c.dataset.id === id;
            c.classList.toggle("active-btn", isActive);
            if (isActive) c.setAttribute("aria-current", "page");
            else c.removeAttribute("aria-current");
        });
        window.scrollTo(0, 0);
    }

    function goTo(id) {
        if (location.hash !== "#" + id) history.pushState(null, "", "#" + id);
        showSection(id);
    }

    controls.forEach(button => button.addEventListener("click", () => goTo(button.dataset.id)));
    document.querySelectorAll("[data-goto]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            goTo(link.dataset.goto);
        });
    });
    window.addEventListener("popstate", () => showSection(location.hash.slice(1)));
    if (location.hash) showSection(location.hash.slice(1));

    // --- Theme toggle (dark/light) ---
    const themeBtn = document.querySelector(".theme-btn");
    if (store.get("theme") === "light") document.body.classList.add("light-mode");
    themeBtn.addEventListener("click", () => {
        const light = document.body.classList.toggle("light-mode");
        store.set("theme", light ? "light" : "dark");
    });

    // --- Language toggle (FR/EN) ---
    // French is the source text in index.html; only English lives here.
    const en = {
        job_title: "Computer Science Engineering Student · Software Engineering Apprentice",
        header_intro: "Final-year engineering student at ENSEIRB-MATMECA (Bordeaux INP), Networks &amp; Computer Science work-study programme. At CEA, I contribute to modernizing the control-command system of the Laser Mégajoule.",
        badge_school: "ENSEIRB-MATMECA · graduating 2027",
        badge_cea: "CEA · Laser Mégajoule",
        badge_lang: "French · English · Spanish",
        download_cv: "Download CV",
        contact_me: "Contact me",

        work_title_a: "Work",
        work_title_b: "experience",
        work_bg: "Career",
        work_h4: "My professional path",
        work_p: "Three years of apprenticeship, first in banking and then in scientific research, plus two internships including one abroad, allowed me to work on production systems, both in agile teams and in environments with high reliability requirements. Alongside this, I am self-employed and co-founded the company Xenalis.",
        work_fact1_value: "3 years",
        work_fact1_label: "apprenticeship",
        work_fact2_value: "2 internships",
        work_fact2_label: "France · Italy",
        work_fact3_label: "Scientific research",
        work_fact4_label: "Banking &amp; insurance",

        work_tl_title: "Professional experience",
        work_tl1_duration: "Sep 2024 – Sep 2027",
        work_tl1_title: "Software Engineering Apprentice",
        work_tl1_desc: "Modernization of part of the Laser Mégajoule control-command system, a research facility with demanding reliability and software quality requirements.",
        work_tl2_duration: "Summer 2026 · 3 months",
        work_tl2_title: "Intern",
        work_tl2_org: " · Terranova da Sibari, Italy",
        work_tl2_desc: "Three-month internship abroad, in southern Italy.",
        work_tl3_duration: "Aug 2023 – Jul 2024",
        work_tl3_title: "Software Developer Apprentice",
        work_tl3_desc: "Back-end developer in the Tool team of DSIBA (Banking &amp; Insurance IT Department). Built internal PHP applications; evolution and maintenance of three applications using agile practices (daily stand-ups, sprint reviews).",
        work_tl4_duration: "Apr – Jun 2023",
        work_tl4_title: "Python Developer Intern",
        work_tl4_desc: "HELP team at DSIBA: helped map the bank's information system, using an ETL (Extract, Transform, Load) pipeline to collect and process data.",
        entre_title: "Entrepreneurship",
        entre1_duration: "Ongoing",
        entre1_title: "Co-founder &amp; partner",
        entre1_org: " · Xenalis",
        entre1_desc: "Together with my brother, I co-founded Xenalis, a company building a shop and information platform for Pokémon products. Its core mission: fighting scalping (bulk buying products to resell them at inflated prices) so that collectors and players can buy at fair prices.",
        tag_ecommerce: "E-commerce",
        tag_creation: "Company creation",
        entre2_duration: "Ongoing",
        entre2_title: "Self-employed (micro-entrepreneur)",
        entre2_desc: "Independent business run alongside my studies and apprenticeship.",
        work_tech_title: "Technical environment at work",

        about_title_a: "About",
        about_title_b: "me",
        about_bg: "Profile",
        about_h4: "Who am I?",
        about_p: "Passionate about software development, versatile and a good listener, I am used to working in teams and on projects. Outside class, I coach young tennis players and chair Chesseirb, the ENSEIRB-MATMECA chess club I co-founded.",
        about_fact1: "Engineering degree",
        about_fact2_value: "3 languages",
        about_fact2_label: "FR · EN (B2) · ES (B1)",
        about_fact3: "French tennis ranking",
        about_fact4: "President &amp; co-founder",

        edu_title: "Education",
        edu1_duration: "2024 – 2027",
        edu1_title: "Master's-level Engineering Degree",
        edu1_desc: "Bordeaux INP, Networks &amp; Computer Science (R&amp;I) work-study programme, currently in final year. Software engineering, networks, systems, plus mathematics and management.",
        edu2_title: "Bachelor's in Computer Science (BUT)",
        edu2_desc: "Programming (Java, C, C#, Python, PHP), databases, web development and Bash. Team projects using Git/GitHub and agile methods. Final year as a work-study student.",
        edu3_title: "French Baccalaureate, with honours",
        edu3_desc: "Mathematics and Physics-Chemistry majors, advanced mathematics option. Spanish European section.",

        engage_title: "Involvement",
        engage1_duration: "Student association",
        engage1_title: "President &amp; co-founder",
        engage1_desc: "Founded and run the ENSEIRB-MATMECA chess club: event organization, community management and website development.",
        engage2_duration: "Since 2019",
        engage2_title: "Tennis coach",
        engage2_desc: "Certified instructor (2020). Coaching young players aged 6 to 18, planning sessions and volunteering at club events.",

        skills_title: "Skills",
        skills_lang: "Languages",
        skills_web: "Web",
        skills_tools: "Tools &amp; DevOps",
        skills_net: "Networking",
        skills_routing: "Routing",
        skills_ssh: "SSH tunnels",
        skills_methods: "Methods",
        skills_agile: "Agile / Scrum",
        skills_tests: "Testing &amp; static analysis",
        skills_fa: "Functional analysis",
        skills_languages: "Spoken languages",
        lang_fr: "French · native",
        lang_en: "English · B2",
        lang_es: "Spanish · B1",

        portfolio_title_a: "My",
        portfolio_title_b: "projects",
        portfolio_p: "A selection of personal projects, followed by academic projects from my Bachelor's degree.",
        featured_title: "Personal projects",
        older_title: "Academic projects (Bachelor's)",
        link_site: "Website",
        link_report: "Report",
        link_source: "Source",

        fp1_title: "Crypto Ascend — trading bot",
        fp1_desc: "Bot and web interface to automate cryptocurrency trading strategies.",
        fp2_title: "Chesseirb — club website",
        fp2_desc: "Website of the ENSEIRB-MATMECA chess club: club presentation, events and practical information.",
        fp3_title: "LG Stats — Werewolf UHC",
        fp3_desc: "Minecraft match statistics dashboard and player performance tracking.",
        fp4_title: "WrapperAI — posts from a video",
        fp4_desc: "Tool that automatically generates social media posts from a video.",

        ap_rsa_title: "RSA encryption",
        ap_rsa_desc: "Simulation of an encrypted message exchange using RSA.",
        ap_lowatem_title: "Lowatem — game AI",
        ap_lowatem_desc: "Implemented a board game's rules with unit tests, then designed and optimized an AI player.",
        ap_woodeo_desc: "Web application to track TV series and anime, built as a team.",
        ap_pong_desc: "Pong remake: menus, pause, scoring and multi-ball mode.",
        ap_jpo_title: "Processing workshop (open day)",
        ap_jpo_desc: "Game to complete and guided exercise sheet introducing open-day visitors to programming.",
        ap_bd_title: "Database",
        ap_bd_desc: "Database design, seeding script and SQL queries based on a specification.",
        ap_web_title: "Showcase website",
        ap_web_desc: "Persona, mock-up and responsive HTML/CSS build, without JavaScript.",
        ap_install_title: "Workstation setup",
        ap_install_desc: "Virtual machine setup: user accounts, role-based permissions and developer tools.",
        ap_gestion_title: "Business creation",
        ap_gestion_desc: "Fictional company: branding, PESTEL and SWOT analyses, org chart and forecasts.",
        tag_management: "Management",

        contact_title_a: "Contact",
        contact_title_b: "me",
        contact_p: "A question or an opportunity? Feel free to reach out, I reply quickly.",
        contact_phone: "Phone",
        contact_location: "Location",
        contact_city: "Bordeaux, France",

        nav_home: "Home",
        nav_work: "Experience",
        nav_about: "About",
        nav_portfolio: "Projects",
        nav_contact: "Contact"
    };

    const meta = {
        fr: {
            title: document.title,
            langBtn: { label: "EN", aria: "Switch to English" },
            themeAria: "Changer de thème"
        },
        en: {
            title: "Rémi Lamat — Computer Science Engineering Student",
            langBtn: { label: "FR", aria: "Passer en français" },
            themeAria: "Toggle theme"
        }
    };

    const CV_HREF = {
        fr: "pdf/LAMAT_Remi_CV.pdf",
        en: "pdf/Remi_Lamat_English_CV.pdf"
    };

    const i18nNodes = [...document.querySelectorAll("[data-i18n]")];
    const fr = {};
    i18nNodes.forEach(el => { fr[el.dataset.i18n] = el.innerHTML; });

    let currentLang = "fr";

    function applyLanguage(lang) {
        currentLang = lang === "en" ? "en" : "fr";
        const dict = currentLang === "en" ? en : fr;
        document.documentElement.lang = currentLang;
        document.title = meta[currentLang].title;

        i18nNodes.forEach(el => {
            const key = el.dataset.i18n;
            el.innerHTML = dict[key] !== undefined ? dict[key] : fr[key];
        });

        document.querySelectorAll("a.cv-download").forEach(a => a.setAttribute("href", CV_HREF[currentLang]));

        const langBtn = document.querySelector(".lang-btn");
        langBtn.querySelector(".lang-label").textContent = meta[currentLang].langBtn.label;
        langBtn.setAttribute("aria-label", meta[currentLang].langBtn.aria);
        themeBtn.setAttribute("aria-label", meta[currentLang].themeAria);

        store.set("lang", currentLang);
    }

    document.querySelector(".lang-btn").addEventListener("click", () => {
        applyLanguage(currentLang === "fr" ? "en" : "fr");
    });

    if (store.get("lang") === "en") applyLanguage("en");
})();
