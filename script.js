document.addEventListener("DOMContentLoaded", () => {
    

    const loader = document.getElementById("loader");

    setTimeout(() => {
        if (loader) {
            loader.classList.add("hidden");
        }
    }, 1000);

    // remaining code...
})

    // =========================
    // ELEMENTS
    // =========================

    const body = document.body;

    const loader = document.getElementById("loader");

    const pythonModeBtn = document.getElementById("pythonModeBtn");
    const analystModeBtn = document.getElementById("analystModeBtn");

    const roleText = document.getElementById("roleText");
    const homeTagline = document.getElementById("homeTagline");

    const modeButtons = document.querySelectorAll(".mode-btn");
    const pathCards = document.querySelectorAll(".path-card");

    const pythonContents = document.querySelectorAll(".python-content");
    const analystContents = document.querySelectorAll(".analyst-content");

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");

    const navbar = document.querySelector(".navbar");

    const badges = document.querySelectorAll(".floating-badge");

    const year = document.getElementById("year");

    const pythonFloats =
    document.querySelectorAll(".python-float");

const analystFloats =
    document.querySelectorAll(".analyst-float");

    // =========================
// LOADER
// =========================

setTimeout(() => {
    if (loader) {
        loader.classList.add("hidden");
    }
}, 1000);
    // =========================
    // MODE DATA
    // =========================

    const modeData = {

        python: {
            role: "Python Developer",

            tagline:
                "Building practical applications with Python, SQL and web technologies.",

            badges: [
                "Python",
                "SQL",
                "MySQL"
            ]
        },

        analyst: {
            role: "Data Analyst",

            tagline:
                "Turning data into meaningful insights with Python, SQL, Excel and Power BI.",

            badges: [
                "Excel",
                "Power BI",
                "SQL"
            ]
        }

    };


    // =========================
    // SET MODE
    // =========================

    function setMode(mode) {

        const data = modeData[mode];

        if (!data) return;



        

        // -------------------------
        // BODY THEME
        // -------------------------

        body.classList.remove(
            "python-theme",
            "analyst-theme"
        );

        body.classList.add(`${mode}-theme`);


        // -------------------------
        // MODE BUTTONS
        // -------------------------

        modeButtons.forEach(button => {

            const buttonMode = button.dataset.mode;

            button.classList.toggle(
                "active",
                buttonMode === mode
            );

            button.setAttribute(
                "aria-pressed",
                buttonMode === mode
            );

        });


        // -------------------------
        // PATH CARDS
        // -------------------------

        pathCards.forEach(card => {

            const cardMode = card.dataset.mode;

            card.classList.toggle(
                "active",
                cardMode === mode
            );

        });


        // -------------------------
        // SHOW / HIDE CONTENT
        // -------------------------

        pythonContents.forEach(section => {

            section.classList.toggle(
                "hidden",
                mode !== "python"
            );

        });

        analystContents.forEach(section => {

            section.classList.toggle(
                "hidden",
                mode !== "analyst"
            );

        });


        // -------------------------
        // HOME TEXT
        // -------------------------

        if (roleText) {
            roleText.textContent = data.role;
        }

        if (homeTagline) {
            homeTagline.textContent = data.tagline;
        }


        // -------------------------
        // FLOATING BADGES
        // -------------------------

        badges.forEach((badge, index) => {

            if (data.badges[index]) {
                badge.textContent = data.badges[index];
            }

        });


        // -------------------------
        // SAVE MODE
        // -------------------------

        localStorage.setItem(
            "portfolioMode",
            mode
        );


        // -------------------------
        // MODE TRANSITION
        // -------------------------

        body.classList.remove("mode-changing");

        void body.offsetWidth;

        body.classList.add("mode-changing");

        setTimeout(() => {
            body.classList.remove("mode-changing");
        }, 500);

    }


    // =========================
    // MODE BUTTON CLICK
    // =========================

    if (pythonModeBtn) {

        pythonModeBtn.addEventListener(
            "click",
            () => {

                setMode("python");

            }
        );

    }


    if (analystModeBtn) {

        analystModeBtn.addEventListener(
            "click",
            () => {

                setMode("analyst");

            }
        );

    }


    // =========================
    // PATH CARD CLICK
    // =========================

    pathCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                const mode = card.dataset.mode;

                setMode(mode);

                // Scroll to skills section
                const skillsSection =
                    document.getElementById("skills");

                if (skillsSection) {

                    skillsSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    });


    // =========================
    // MOBILE MENU
    // =========================

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                navMenu.classList.toggle("show");

                menuToggle.classList.toggle("active");

            }
        );

    }


    // =========================
    // CLOSE MOBILE MENU
    // =========================

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (navMenu) {
                    navMenu.classList.remove("show");
                }

                if (menuToggle) {
                    menuToggle.classList.remove("active");
                }

            }
        );

    });


    // =========================
    // NAVBAR SCROLL EFFECT
    // =========================

    window.addEventListener(
        "scroll",
        () => {

            if (!navbar) return;

            if (window.scrollY > 50) {

                navbar.classList.add("scrolled");

            } else {

                navbar.classList.remove("scrolled");

            }

        }
    );


    // =========================
    // ACTIVE NAV LINK
    // =========================

    const sections = document.querySelectorAll("section[id]");

    window.addEventListener(
        "scroll",
        () => {

            let currentSection = "";

            sections.forEach(section => {

                const sectionTop =
                    section.offsetTop - 150;

                const sectionHeight =
                    section.offsetHeight;

                if (
                    window.scrollY >= sectionTop &&
                    window.scrollY < sectionTop + sectionHeight
                ) {

                    currentSection =
                        section.getAttribute("id");

                }

            });


            navLinks.forEach(link => {

                link.classList.remove("active");

                const target =
                    link.getAttribute("href");

                if (
                    target === `#${currentSection}`
                ) {

                    link.classList.add("active");

                }

            });

        }
    );


    // =========================
    // CURRENT YEAR
    // =========================

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }


    // =========================
    // LOAD SAVED MODE
    // =========================

    const savedMode =
        localStorage.getItem("portfolioMode");


    if (
        savedMode === "python" ||
        savedMode === "analyst"
    ) {

        setMode(savedMode);

    } else {

        setMode("python");

    }


    // =========================
    // ESC KEY
    // =========================

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                if (navMenu) {
                    navMenu.classList.remove("show");
                }

                if (menuToggle) {
                    menuToggle.classList.remove("active");
                }

            }

        }
    );

analystContents.forEach(section => {
    section.classList.toggle(
        "hidden",
        mode !== "analyst"
    );
});




function setMode(mode) {

    const data = modeData[mode];

    if (!data) return;


    // =========================
    // CHANGE THEME
    // =========================

    body.classList.remove(
        "python-theme",
        "analyst-theme"
    );

    body.classList.add(`${mode}-theme`);


    // =========================
    // MODE BUTTON
    // =========================

    modeButtons.forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.mode === mode
        );

    });


    // =========================
    // PYTHON CONTENT
    // =========================

    pythonContents.forEach(section => {

        section.classList.toggle(
            "hidden",
            mode !== "python"
        );

    });


    // =========================
    // DATA ANALYST CONTENT
    // =========================

    analystContents.forEach(section => {

        section.classList.toggle(
            "hidden",
            mode !== "analyst"
        );

    });


    // =========================
    // HOME TEXT
    // =========================

    roleText.textContent = data.role;

    homeTagline.textContent = data.tagline;


    // =========================
    // SAVE MODE
    // =========================

    localStorage.setItem(
        "portfolioMode",
        mode
    );

}