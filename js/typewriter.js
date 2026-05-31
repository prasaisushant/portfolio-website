/**
 * Typewriter Loop Engine — Login screen rotating headlines
 */
const phrases = [
    "DevOps Engineer",
    "Cloud Architect",
    "Full‑Stack Engineer",
    "Automating the Boring Stuff",
    "Optimizing Runtime Latency"
];

let currentPhraseIndex = 0;
let currentCharIndex   = 0;
let isDeleting         = false;

const TYPING_SPEED   = 100;
const DELETING_SPEED = 50;
const PAUSE_AFTER    = 2000;
const PAUSE_BEFORE   = 500;

function tickTypewriter() {
    const el = document.getElementById("typewriter-text");
    if (!el) return;

    const phrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        currentCharIndex--;
        el.textContent = phrase.substring(0, currentCharIndex);
    } else {
        currentCharIndex++;
        el.textContent = phrase.substring(0, currentCharIndex);
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && currentCharIndex === phrase.length) {
        // Finished typing — pause, then start deleting
        isDeleting = true;
        delay = PAUSE_AFTER;
    } else if (isDeleting && currentCharIndex === 0) {
        // Finished deleting — move to next phrase
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        delay = PAUSE_BEFORE;
    }

    setTimeout(tickTypewriter, delay);
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(tickTypewriter, 1000);
});