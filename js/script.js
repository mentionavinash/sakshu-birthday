/* =========================================
   SAKSHU BIRTHDAY WEBSITE
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LOADER
    ====================================== */

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 1800);


    /* =====================================
       MUSIC
    ====================================== */

    const music = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicButton");
    const openSurprise = document.getElementById("openSurprise");

    let musicPlaying = false;


    function playMusic() {

        if (!music) return;

        music.volume = 0.35;

        music.play()
            .then(() => {

                musicPlaying = true;

                musicButton.classList.add("playing");

                musicButton.innerHTML = "♫";

            })
            .catch(() => {

                console.log("Music requires user interaction.");

            });
    }


    function pauseMusic() {

        music.pause();

        musicPlaying = false;

        musicButton.classList.remove("playing");

        musicButton.innerHTML = "♪";
    }


    musicButton.addEventListener("click", () => {

        if (musicPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }

    });


    if (openSurprise) {

        openSurprise.addEventListener("click", () => {

            playMusic();

            document.body.classList.remove("no-scroll");

            const intro = document.querySelector(".intro");

            if (intro) {
                intro.scrollIntoView({
                    behavior: "smooth"
                });
            }

            createHeartBurst();

        });

    }


    /* =====================================
       REVEAL ANIMATIONS
    ====================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================
       FLOATING HEARTS
    ====================================== */

    const heartsContainer =
        document.getElementById("heartsContainer");


    function createFloatingHeart() {

        if (!heartsContainer) return;

        const heart =
            document.createElement("div");

        heart.className =
            "floating-heart";

        heart.innerHTML =
            Math.random() > .5 ? "♥" : "♡";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.fontSize =
            (10 + Math.random() * 20) + "px";

        heart.style.animationDuration =
            (7 + Math.random() * 8) + "s";

        heart.style.animationDelay =
            Math.random() * 2 + "s";

        heartsContainer.appendChild(heart);


        setTimeout(() => {

            heart.remove();

        }, 16000);

    }


    setInterval(
        createFloatingHeart,
        900
    );


    /* =====================================
       HEART BURST
    ====================================== */

    function createHeartBurst() {

        if (!heartsContainer) return;

        for (let i = 0; i < 20; i++) {

            const heart =
                document.createElement("div");

            heart.className =
                "floating-heart";

            heart.innerHTML = "♥";

            heart.style.left =
                (40 + Math.random() * 20) + "%";

            heart.style.bottom =
                (35 + Math.random() * 10) + "%";

            heart.style.fontSize =
                (12 + Math.random() * 25) + "px";

            heart.style.animationDuration =
                (3 + Math.random() * 3) + "s";

            heartsContainer.appendChild(heart);


            setTimeout(() => {

                heart.remove();

            }, 7000);

        }

    }


    /* =====================================
       BIRTHDAY WISH
    ====================================== */

    const wishButton =
        document.getElementById("wishButton");

    const wishMessage =
        document.getElementById("wishMessage");

    const cakeWrapper =
        document.querySelector(".cake-wrapper");


    if (wishButton) {

        wishButton.addEventListener("click", () => {

            if (cakeWrapper) {

                cakeWrapper.classList.add("blown");

            }

            if (wishMessage) {

                wishMessage.classList.add("show");

            }

            createConfetti();

            createHeartBurst();

            playMusic();

        });

    }


    /* =====================================
       CONFETTI
    ====================================== */

    function createConfetti() {

        const container =
            document.getElementById("confetti");

        if (!container) return;


        for (let i = 0; i < 120; i++) {

            const piece =
                document.createElement("div");

            piece.className =
                "confetti-piece";


            const colors = [
                "#d8b26e",
                "#b84d6a",
                "#f0d9a0",
                "#ffffff",
                "#8e3150"
            ];

            piece.style.background =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            piece.style.left =
                Math.random() * 100 + "%";


            piece.style.width =
                (5 + Math.random() * 8) + "px";


            piece.style.height =
                (8 + Math.random() * 14) + "px";


            piece.style.animationDuration =
                (3 + Math.random() * 4) + "s";


            piece.style.animationDelay =
                Math.random() * 1.5 + "s";


            container.appendChild(piece);


            setTimeout(() => {

                piece.remove();

            }, 8000);

        }

    }


    /* =====================================
       PARALLAX HERO
    ====================================== */

    const hero =
        document.querySelector(".hero");


    window.addEventListener(
        "scroll",
        () => {

            if (!hero) return;

            const scrollY =
                window.scrollY;

            if (scrollY < window.innerHeight) {

                hero.style.backgroundPosition =
                    `center ${scrollY * 0.2}px`;

            }

        }
    );


    /* =====================================
       KEYBOARD MUSIC
    ====================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.code === "Space") {

                if (
                    document.activeElement.tagName !==
                    "INPUT" &&
                    document.activeElement.tagName !==
                    "TEXTAREA"
                ) {

                    event.preventDefault();

                    if (musicPlaying) {
                        pauseMusic();
                    } else {
                        playMusic();
                    }

                }

            }

        }
    );

});
