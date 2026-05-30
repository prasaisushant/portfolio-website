/**
 * Master Environment Main Orchestrator Layer
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
let isDesktopActive = false;

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
        bootTimeout = setTimeout(processBootLogging, Math.random() * 80 + 40);
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
    setTimeout(() => {
        bootScreen.remove();
    }, 400);
}

// Global Environment Interaction Bindings Initializer Matrix
window.addEventListener("DOMContentLoaded", () => {
    // 1. Kick off custom hardware simulation boot sequence trace logging
    processBootLogging();

    // 2. Monitor Escape hotkey down events to skip initialization
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            terminateBootAndShowLogin();
        }
    });

    // 3. Bind interactive liquid-glass click action elements to swap horizontally
    const btnLogin = document.getElementById("btn-login");
    const desktopWrapper = document.getElementById("desktop-wrapper");
    const termInput = document.getElementById("terminal-input");
    
    if (btnLogin && desktopWrapper) {
        btnLogin.addEventListener("click", () => {
            // Shift perspective view directly to Workspace 1 (Horizontal Swap)
            desktopWrapper.style.transform = "translateX(-100vw)";
            
            // Activate and focus terminal input field line ONLY AFTER animation completes
            setTimeout(() => {
                isDesktopActive = true;
                if (termInput) {
                    termInput.removeAttribute("disabled");
                    termInput.focus();
                }
            }, 850);
        });
    }

    // 4. Force Focus behavior into input field anytime window background area is clicked (only if desktop is active)
    const termBody = document.getElementById("terminal-body");
    if (termBody) {
        termBody.addEventListener("click", () => {
            if (!isDesktopActive) return;
            if (termInput) termInput.focus();
        });
    }

    // 5. Active Live Time Tracker Engine mapping logic
    setInterval(() => {
        const clockNode = document.getElementById("live-clock");
        if (clockNode) {
            const now = new Date();
            clockNode.textContent = now.toUTCString().replace("GMT", "UTC");
        }
    }, 1000);

    // Initialize individual application modules without forcing early focus
    initializeTerminalShell();
});