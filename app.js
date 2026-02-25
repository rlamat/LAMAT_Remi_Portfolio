(function () {
    // Navigation between sections
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function () {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        });
    });

    // Theme toggle (dark/light)
    const themeBtn = document.querySelector(".theme-btn");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
        });
    }

    // --- Language toggle (FR/EN) ---
    const translations = {
        fr: {
            job_title: "Étudiant Ingénieur/Développeur Informatique",
            header_intro: "Étudiant ingénieur à l'ENSEIRB MATMECA de Bordeaux. Actuellement en alternance au CEA en tant qu'ingénieur dans le cadre de la jouvance du Control Commande du Laser Mégajoule.",
            download_cv: "Télécharger le CV",

            work_title: "Experiences",
            work_bg: "professionnelles",
            work_h4: "Experiences professionnelles",
            work_p: "Lors de mon parcours, j'ai eu l'occasion de gagner en experience professionnelle. J'ai effectué plusieurs alternances et stages que vous pourrez retrouver ci-dessous.",

            about_title: "Personnelles",
            about_bg: "informations",
            about_h4: "Informations personnelles",
            about_p: "Passionné par l’informatique et notamment le développement, polyvalent, à l’écoute et motivé, j’ai l’habitude du travail en mode projet et par équipe. Je recherche un stage de 3 mois à l'étranger pendant la période Juin/Juillet/Août.",

            portfolio_title_prefix: "Mon ",
            portfolio_title_span: "Portfolio",
            portfolio_bg: "My Work",
            portfolio_p: "Ici vous trouverez mes principaux projets personnels, ainsi que quelques projets académiques plus anciens.",
            featured_title: "Projets personnels (mise en avant)",
            older_title: "Autres projets (second plan)",

            fp1_title: "Bot de trading de crypto-monnaies",
            fp1_desc: "Bot et interface pour automatiser des stratégies de trading. Projet personnel (Crypto Ascend).",
            fp2_title: "Site de l'association d'échecs (ENSEIRB)",
            fp2_desc: "Site vitrine + infos club. Président et co-fondateur de l'association.",
            fp3_title: "Stats Loup-Garou UHC (Minecraft)",
            fp3_desc: "Visualisation de statistiques de parties et suivi des performances.",
            fp4_title: "Génération de posts à partir d'une vidéo",
            fp4_desc: "Outil pour générer automatiquement des posts pour les réseaux sociaux depuis une vidéo.",



            timeline_title: "Ma Timeline",

            work_summary_apprenticeship: "2 ans d'alternance",
            work_summary_internship: "3 mois de stage",
            work_summary_company_cea: "CEA",
            work_summary_company_lbp: "La Banque Postale",

            work_tl1_duration: "septembre 2024 - septembre 2027",
            work_tl1_title: "Alternant<span> - CEA</span>",
            work_tl1_desc: "Ingénieur/Développeur au CEA. Chargé de la jouvance d'une partie du Control Commande du Laser Mégajoule.",

            work_tl2_duration: "août 2023 - août 2024",
            work_tl2_title: "Alternant<span> - La Banque Postale</span>",
            work_tl2_desc: "Tavail à la Banque Postale pour la DSIBA (Direction des Systèmes d'Information Banque et Assurance) en tant que développeur informatique dans l'équipe Tool. J'ai notamment codé en PhP des applications destinées aux différents collaborateurs. Les projets étaient gérés de manière agile. Mon équipe était chargé de l'évolution et la maintenance de 3 applications.",

            work_tl3_duration: "avril 2023 - juin 2023",
            work_tl3_title: "Stagiaire<span> - La Banque Postale</span>",
            work_tl3_desc: "Développeur python dans l'équipe HELP de la DSIBA (Direction des Systèmes d'Information Banque et Assurance), j'étais chargé d'aider à la cartographie du SI de La Banque Postale. Pour se faire j'ai utilisé un ETL (Extract, Transform, Load) pour récupérer les données et les traiter.",

            work_lang_title: "Les langages utilisés :",
            work_tech_title: "Les technologies utilisées :",

            about_metric_projects: "Projets <br /> Complétés",
            about_metric_years_exp: "Années<br /> d'experience",
            about_metric_tennis: "Années <br /> de tennis",
            about_metric_motivation: "Motivation <br /> Détermination",
            about_skills_title: "Mes compétences",

            about_tl1_duration: "2021 - present",
            about_tl1_title: "Étudiant<span> - ENSEIRB MATMECA</span>",
            about_tl1_desc: "Diplôme d'ingénieur dans la filière R&I (Réseau et Informatique). Apprentissage du réseau, de l'informatique et de tout le nécéssaire à un ingénieur de ce domaine (mathématiques, physiques, management ...).",

            about_tl2_duration: "2021 - 2024",
            about_tl2_title: "Étudiant<span> - BUT Informatique</span>",
            about_tl2_desc: "Aprentissage des langages de programmation et des bases de données comme Java, C#, C, Python, SQL, HTML, CSS, PHP, bash. Travail en groupe sur des projets avec Git et GitHub combiné aux methodes agiles.",

            about_tl3_duration: "2018 - 2021",
            about_tl3_title: "Étudiant<span> - Lycée</span>",
            about_tl3_desc: "Bac mention bien en spécialité Maths, phisique chimie et numérique et sciences de l'informatique (non conservé en terminal). Euro espagnol.",

            about_tl4_duration: "2014 - 2018",
            about_tl4_title: "Étudiant<span> - Collège</span>",
            about_tl4_desc: "Stage d'observation au Laboratoire des pratiques innovantes en Design (LID). Creation de jeux vidéos avec Scratch. Création d'un site web avec WordPress. 2ème régional du concours de maths Alkindie.",

            about_tl5_duration: "2019 - 2022",
            about_tl5_title: "Initiateur fédéral<span> - SPUC tennis</span>",
            about_tl5_desc: "Diplome d'initiateur fédéral de tennis et de pré-iniateur de tennis. Entraineur de jeunes de 6 à 18 ans au SPUC tennis. Organisation et encadrement bénévole d'animation pour le club.",
            contact_title_prefix: "Me ",
            contact_title_span: "Contacter",
            contact_bg: "Contact",
            contact_h4: "Pour me contacter :",
            contact_addr: "Adresse ➔ 4 rue Bengaline 33600 Pessac France",
            contact_email: "Email ➔ remi.lamat@gmail.com",
            contact_edu: "Education ➔ ENSEIRB MATMECA Bordeaux",
            contact_phone: "Téléphone mobile ➔ 06 24 01 54 75",
            contact_lang: "Languages ➔ Français, anglais et espagnol",
            networks: "Mes réseaux :"
        },
        en: {
            job_title: "Engineering Student / Software Developer",
            header_intro: "Engineering student at ENSEIRB MATMECA (Bordeaux). Currently an apprentice at CEA, working on modernizing part of the control-command system for the Laser Mégajoule.",
            download_cv: "Download CV",

            work_title: "Experience",
            work_bg: "work",
            work_h4: "Professional experience",
            work_p: "During my studies, I gained professional experience through apprenticeships and internships (details below).",

            about_title: "Personal",
            about_bg: "info",
            about_h4: "About me",
            about_p: "Passionate about software development, adaptable and team-oriented, I am used to project-based work. I am looking for a 3-month internship abroad between June and August.",

            portfolio_title_prefix: "My ",
            portfolio_title_span: "Portfolio",
            portfolio_bg: "Projects",
            portfolio_p: "Here you can find my main personal projects, plus a few older academic projects.",
            featured_title: "Featured personal projects",
            older_title: "Older projects",

            fp1_title: "Crypto trading bot",
            fp1_desc: "Bot + interface to automate trading strategies (Crypto Ascend).",
            fp2_title: "Chess club website (ENSEIRB)",
            fp2_desc: "Club website + information. President and co-founder.",
            fp3_title: "Werewolf UHC stats (Minecraft)",
            fp3_desc: "Match statistics dashboard and performance tracking.",
            fp4_title: "Auto post generation from video",
            fp4_desc: "Tool to automatically generate social media posts from a video.",



            timeline_title: "Timeline",

            work_summary_apprenticeship: "2 years apprenticeship",
            work_summary_internship: "3-month internship",
            work_summary_company_cea: "CEA",
            work_summary_company_lbp: "La Banque Postale",

            work_tl1_duration: "September 2024 - September 2027",
            work_tl1_title: "Apprentice<span> - CEA</span>",
            work_tl1_desc: "Engineer / Software developer at CEA. Working on the modernization of part of the Laser Mégajoule control-command system.",

            work_tl2_duration: "August 2023 - August 2024",
            work_tl2_title: "Apprentice<span> - La Banque Postale</span>",
            work_tl2_desc: "Worked at La Banque Postale within DSIBA (Bank & Insurance IS Directorate) as a software developer in the Tool team. Built PHP applications for internal users. Projects were managed using agile methods. My team handled the evolution and maintenance of three applications.",

            work_tl3_duration: "April 2023 - June 2023",
            work_tl3_title: "Intern<span> - La Banque Postale</span>",
            work_tl3_desc: "Python developer in the HELP team (DSIBA). Contributed to mapping La Banque Postale's information system using an ETL (Extract, Transform, Load) pipeline to collect and process data.",

            work_lang_title: "Languages used:",
            work_tech_title: "Technologies used:",

            about_metric_projects: "Projects <br /> Completed",
            about_metric_years_exp: "Years<br /> of experience",
            about_metric_tennis: "Years <br /> of tennis",
            about_metric_motivation: "Motivation <br /> Determination",
            about_skills_title: "Skills",

            about_tl1_duration: "2021 - present",
            about_tl1_title: "Student<span> - ENSEIRB MATMECA</span>",
            about_tl1_desc: "Engineering degree in Networks & Computer Science (R&I). Learning networking, software engineering, and the broader engineering fundamentals (mathematics, physics, management, etc.).",

            about_tl2_duration: "2021 - 2024",
            about_tl2_title: "Student<span> - Bachelor's in Computer Science</span>",
            about_tl2_desc: "Learned programming languages and databases such as Java, C#, C, Python, SQL, HTML, CSS, PHP, and bash. Team projects using Git/GitHub combined with agile methods.",

            about_tl3_duration: "2018 - 2021",
            about_tl3_title: "Student<span> - High school</span>",
            about_tl3_desc: "High school diploma with honors, specializing in Mathematics, Physics-Chemistry, and Computer Science (NSI). Spanish European section.",

            about_tl4_duration: "2014 - 2018",
            about_tl4_title: "Student<span> - Middle school</span>",
            about_tl4_desc: "Observation internship at the Laboratory of Innovative Design Practices (LID). Created video games with Scratch. Built a website with WordPress. 2nd place (regional) in the Alkindie math contest.",

            about_tl5_duration: "2019 - 2022",
            about_tl5_title: "Tennis instructor<span> - SPUC Tennis</span>",
            about_tl5_desc: "Certified tennis instructor. Coached youth players (6 to 18) at SPUC Tennis. Volunteered to organize and run club events.",
            contact_title_prefix: "Contact ",
            contact_title_span: "Me",
            contact_bg: "Contact",
            contact_h4: "Get in touch:",
            contact_addr: "Address ➔ 4 rue Bengaline 33600 Pessac, France",
            contact_email: "Email ➔ remi.lamat@gmail.com",
            contact_edu: "Education ➔ ENSEIRB MATMECA Bordeaux",
            contact_phone: "Phone ➔ +33 6 24 01 54 75",
            contact_lang: "Languages ➔ French, English, Spanish",
            networks: "Links:"
        }
    };

    const CV_HREF = {
        fr: "pdf/LAMAT_Remi_CV.pdf",
        en: "pdf/Remi_Lamat_English_CV.pdf"
    };

    function applyLanguage(lang) {
        const dict = translations[lang] || translations.fr;
        document.documentElement.setAttribute("lang", lang);

        // Update text nodes
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }


        // Update HTML nodes (preserve inner markup)
        document.querySelectorAll("[data-i18n-html]").forEach(el => {
            const key = el.getAttribute("data-i18n-html");
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });
        });

        // Update composite titles where needed
        const portfolioTitlePrefix = document.querySelector("[data-i18n='portfolio_title_prefix']");
        const portfolioTitleSpan = document.querySelector("[data-i18n='portfolio_title_span']");
        // (textContent already handled)

        // Update all CV links
        document.querySelectorAll("a.cv-download").forEach(a => {
            a.setAttribute("href", CV_HREF[lang] || CV_HREF.fr);
        });

        // Update language button label
        const lbl = document.querySelector(".lang-btn .lang-label");
        if (lbl) lbl.textContent = (lang === "fr") ? "FR" : "EN";

        localStorage.setItem("lang", lang);
    }

    function toggleLanguage() {
        const current = localStorage.getItem("lang") || "fr";
        const next = current === "fr" ? "en" : "fr";
        applyLanguage(next);
    }

    // Bind
    const langBtn = document.querySelector(".lang-btn");
    if (langBtn) {
        langBtn.addEventListener("click", toggleLanguage);
    }

    // Initial language
    const savedLang = localStorage.getItem("lang") || "fr";
    applyLanguage(savedLang);
})();
