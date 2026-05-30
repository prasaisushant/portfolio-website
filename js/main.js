/**
 * Master Environment Navigation Orchestrator Layer
 */
const systemBootLogs = [
    "Initializing secure kernel-level architecture protocols...",
    "Verifying cloud configuration clusters... [OK]",
    "Mounting remote virtualization infrastructure maps...",
    "Optimizing sarcasm engine parameters... complete",
    "Waking up system monitor interfaces...",
    "Syncing active shell execution logic blocks...",
    "Establishing external handshake matrix variables...",
    "Initialization complete. Connecting remote terminal node proxy..."
];

let bootStep = 0;
let bootTimeout;

// NAVIGATION CONTROL VECTOR STATE MATRIX
let activeWorkspaceIndex = 0; // 0: Login, 1: About Me, 2: Terminal Shell
let scrollThrottleGuard = false;
const animationHoldDuration = 900; 

function processBootLogging() {
    const logCanvas = document.getElementById("boot-log");
    const logScreen = document.getElementById("boot-screen");
    
    if (!logCanvas || !logScreen) return;

    if (bootStep < systemBootLogs.length) {
        const logLine = document.createElement("p");
        logLine.textContent = `[ OK ] ${systemBootLogs[bootStep]}`;
        logCanvas.appendChild(logLine);
        logScreen.scrollTop = logScreen.scrollHeight;
        bootStep++;
        bootTimeout = setTimeout(processBootLogging, Math.random() * 80 + 30);
    } else {
        terminateBootAndShowLogin();
    }
}

function terminateBootAndShowLogin() {
    clearTimeout(bootTimeout);
    const bootScreen = document.getElementById("boot-screen");
    if (!bootScreen) return;
    
    bootScreen.style.opacity = '0';
    bootScreen.style.transition = 'opacity 400ms ease-out';
    setTimeout(() => bootScreen.remove(), 400);
}

// CAROUSEL VIEW MATRIX DISPLACEMENT MAP ENGINE
function updateWorkspaceViewportPosition() {
    const wrapper = document.getElementById("desktop-wrapper");
    const termInput = document.getElementById("terminal-input");
    if (!wrapper) return;

    // Calculate structural percent offsets horizontally across display bounds
    const displacementValue = activeWorkspaceIndex * -100;
    wrapper.style.transform = `translateX(${displacementValue}vw)`;

    // Handle interactive element state changes based on visibility fields
    if (activeWorkspaceIndex === 2) {
        setTimeout(() => {
            if (termInput) {
                termInput.removeAttribute("disabled");
                termInput.focus();
            }
        }, animationHoldDuration);
    } else {
        if (termInput) termInput.setAttribute("disabled", "true");
    }
}

// PROGRAMMATIC DEBOUNCED MOUSE WHEEL ROTATION PARSER INTERCEPTOR
function handleSystemViewportScroll(e) {
    // Block scroll action routines if active on Login workspace screen index
    if (activeWorkspaceIndex === 0) return;
    if (scrollThrottleGuard) return;

    const directionalDelta = e.deltaY;
    let baselineStateChanged = false;

    if (directionalDelta > 30) {
        // User scrolled down -> Step forward horizontally to next index
        if (activeWorkspaceIndex < 2) { // Caps movement path threshold dynamically at index 2 for now
            activeWorkspaceIndex++;
            baselineStateChanged = true;
        } else if (activeWorkspaceIndex === 2) {
            // Skeleton trigger log warning for upcoming projects section placeholder
            console.log("Next workspace: Project Matrix Space Pipeline target slot.");
        }
    } else if (directionalDelta < -30) {
        // User scrolled up -> Step backward horizontally to previous index
        if (activeWorkspaceIndex > 1) { 
            activeWorkspaceIndex--;
            baselineStateChanged = true;
        }
    }

    if (baselineStateChanged) {
        scrollThrottleGuard = true;
        updateWorkspaceViewportPosition();
        setTimeout(() => {
            scrollThrottleGuard = false;
        }, animationHoldDuration);
    }
}

// Global Environment Interaction Bindings Initializer Matrix
window.addEventListener("DOMContentLoaded", () => {
    processBootLogging();

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") terminateBootAndShowLogin();
    });

    // Capture vertical wheel loops to map horizontal desktop animations
    window.addEventListener("wheel", handleSystemViewportScroll, { passive: true });

    // Handle Login Button execution flow
    const btnLogin = document.getElementById("btn-login");
    if (btnLogin) {
        btnLogin.addEventListener("click", () => {
            activeWorkspaceIndex = 1; // Advance directly into Neofetch About Me Desktop Screen
            updateWorkspaceViewportPosition();
        });
    }

    // Handle structural redirection action rule targeting Close terminal button layout elements
    const btnCloseTerminal = document.getElementById("btn-terminal-close");
    if (btnCloseTerminal) {
        btnCloseTerminal.addEventListener("click", () => {
            activeWorkspaceIndex = 0; // Drop directly backwards onto initial gatekeeper login grid card layout
            updateWorkspaceViewportPosition();
        });
    }

    // Force Terminal window input layout focus behaviors on clean background element clicks
    const termBody = document.getElementById("terminal-body");
    if (termBody) {
        termBody.addEventListener("click", () => {
            if (activeWorkspaceIndex !== 2) return;
            const input = document.getElementById("terminal-input");
            if (input) input.focus();
        });
    }

    // Simple common system background loop monitoring system clock instances
    setInterval(() => {
        const timeString = new Date().toUTCString().replace("GMT", "UTC");
        const mainClock = document.getElementById("live-clock");
        const aboutClock = document.getElementById("about-clock");
        if (mainClock) mainClock.textContent = timeString;
        if (aboutClock) aboutClock.textContent = timeString;
    }, 1000);

    initializeTerminalShell();
});