/**
 * Typewriter Loop Engine - Handles Login Rotating Headlines
 */
const phrases = [
    "DevOps Engineer",
    "Cloud Architect",
    "Full‑Stack Engineer",
    "Automating the Boring Stuff",
    "Optimizing Runtime Latency"
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseBetweenPhrases = 2000;

function tickTypewriter() {
    const targetElement = document.getElementById("typewriter-text");
    if (!targetElement) return;

    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
        targetElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        targetElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }

    let currentDelay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        currentDelay = pauseBetweenPhrases; // Hold position
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        currentDelay = 500; // Breath pause before typing next
    }

    setTimeout(tickTypewriter, currentDelay);
}

// Start sequence when file is processed
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(tickTypewriter, 1000);
});