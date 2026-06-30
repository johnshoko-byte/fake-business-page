import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(CustomEase, SplitText, ScrollTrigger);

CustomEase.create("hop", "0.8, 0, 0.2, 1");
CustomEase.create("hop2", "0.9, 0, 0.1, 1");

// Stop page scrolling while preloader is active
document.body.classList.add("is-loading");

const splitText = (selector, type, className, mask = true) => {
    return SplitText.create(selector, {
        type: type,
        [`${type}Class`]: className,
        ...(mask && { mask: type }),
    });
};

// Split text
const preloaderHeaderSplit = splitText(".preloader-header h1", "chars", "char");
const navSplit = splitText("nav a", "words", "word");
const headingSplit = splitText(".sandwich-text", "chars", "char", false);

// Make split text animatable
gsap.set(".preloader-header .char, .sandwich-text .char, nav a .word", {
    display: "inline-block",
});

// Starting positions for text animations
gsap.set(".preloader-header .char", {
    yPercent: 100,
});

gsap.set(".preloader-counter p", {
    yPercent: 100,
});

gsap.set("nav a .word", {
    yPercent: 100,
});

gsap.set(".sandwich-text .char", {
    yPercent: 100,
});

gsap.set(".sandwich-logo", {
    autoAlpha: 0,
    scale: 0.92,
});

gsap.set(".sandwich-front-text", {
    autoAlpha: 0,
    y: 20,
});

// Old preloader image animation setup
const preloaderImgInitRotation = [7.5, -2.5, -10, 12.5, -5, 5];

gsap.set(".preloader-img", {
    xPercent: -50,
    yPercent: -50,
    scale: 0.001, // safer than 0, prevents transform snapping
    autoAlpha: 1,
    clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
    rotate: (i) => preloaderImgInitRotation[i],
    transformOrigin: "50% 50%",
    force3D: true,
});

gsap.set(".preloader-img img", {
    scale: 1.04,
    transformOrigin: "50% 50%",
    force3D: true,
});

// Main timeline
const tl = gsap.timeline({
    paused: true,
    delay: 0.5,
    defaults: {
        overwrite: "auto",
    },
});

// OLD IMAGE ENTER ANIMATION BROUGHT BACK
tl.to(".preloader-img", {
    scale: 1,
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: "hop",
    stagger: 0.2,
});

// Tiny inner image settle, keeps it feeling smoother
tl.to(
    ".preloader-img img",
    {
        scale: 1,
        duration: 1,
        ease: "hop",
        stagger: 0.2,
    },
    "<"
);

// Preloader title comes in
tl.to(
    ".preloader-header .char",
    {
        yPercent: 0,
        duration: 1,
        ease: "hop2",
        stagger: {
            each: 0.125,
            from: "random",
        },
    },
    "0.35"
);

// Counter comes in and counts up
tl.to(
    ".preloader-counter p",
    {
        yPercent: 0,
        duration: 1,
        ease: "hop2",
        onStart: () => {
            const counterEl = document.querySelector(".preloader-counter p");
            const counter = { value: 0 };

            gsap.to(counter, {
                value: 100,
                duration: 2,
                delay: 0.5,
                ease: "power2.inOut",
                onUpdate: () => {
                    counterEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
                },
            });
        },
    },
    "<"
);

// Counter leaves
tl.to(
    ".preloader-counter p",
    {
        yPercent: -100,
        duration: 0.75,
        ease: "hop2",
    },
    3.25
);

// Preloader title leaves
tl.to(
    ".preloader-header .char",
    {
        yPercent: -100,
        duration: 0.75,
        ease: "hop2",
        stagger: {
            each: 0.125,
            from: "random",
        },
    },
    3.25
);

// OLD IMAGE EXIT ANIMATION BROUGHT BACK
tl.to(
    ".preloader-img",
    {
        scale: 0.001, // safer than 0
        clipPath: "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
        duration: 1,
        ease: "hop2",
        stagger: -0.075,
    },
    3.5
);

tl.to(
    ".preloader-img img",
    {
        scale: 1.04,
        duration: 1,
        ease: "hop2",
        stagger: -0.075,
    },
    "<"
);

tl.to(
    ".preloader",
    {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.8,
        ease: "hop2",
        onComplete: () => {
            gsap.set(".preloader", {
                display: "none",
            });

            document.body.classList.remove("is-loading");
        },
    },
    4.65
);

tl.to(
    ".sandwich-text .char",
    {
        yPercent: 0,
        duration: 1,
        ease: "hop2",
        stagger: {
            each: 0.075,
            from: "random",
        },
    },
    5.35
);

tl.to(
    ".sandwich-logo",
    {
        autoAlpha: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
    },
    5.45
);

tl.to(
    ".sandwich-front-text",
    {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    },
    5.6
);

tl.to(
    "nav a .word",
    {
        yPercent: 0,
        duration: 1,
        ease: "hop",
        stagger: 0.075,
    },
    5.35
);
gsap.set(".features-section .info, .features-section .stat, .features-section .card", {
    autoAlpha: 0,
    y: 40,
});

gsap.timeline({
    scrollTrigger: {
        trigger: ".features-section",
        start: "top 72%",
        once: true,
    },
})
    .to(".features-section .info", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
    })
    .to(".features-section .stat", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
    }, "-=0.35")
    .to(".features-section .card", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.14,
    }, "-=0.35");
// Play only after page assets are loaded.
// This helps prevent image-size snapping.
if (document.readyState === "complete") {
    tl.play();
} else {
    window.addEventListener(
        "load",
        () => {
            tl.play();
        },
        { once: true }
    );
}