/**
 * Master Environment Navigation Orchestrator
 * Single source of truth for workspace index state and scroll handling.
 * terminal.js calls window.navigateTo() to move the viewport.
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

// ─── Shared Navigation Constants ─────────────────────────────────────────────
const TRANSITION_DURATION = 850; // Must match duration-[850ms] in HTML
const TOTAL_WORKSPACES    = 8;   // Must match w-[800vw] and pageOffsets in terminal.js

// ─── Workspace State ──────────────────────────────────────────────────────────
let activeWorkspaceIndex = 0;    // 0=Login 1=About 2=Terminal 3=Projects 4=Skills 5=Experience 6=Certifications 7=Contacts
let scrollThrottled      = false;

// ─── Boot Sequence ────────────────────────────────────────────────────────────
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

// ─── Core Navigation ─────────────────────────────────────────────────────────
/**
 * Move the viewport to the given workspace index.
 * Exposed globally so terminal.js `go` command can call it without
 * maintaining its own copy of activeWorkspaceIndex.
 */
function navigateTo(index) {
    if (index < 0 || index >= TOTAL_WORKSPACES) return;

    activeWorkspaceIndex = index;
    const wrapper = document.getElementById("desktop-wrapper");
    if (!wrapper) return;

    // wrapper.style.transform = `translateX(${activeWorkspaceIndex * -100}vw)`;
    wrapper.style.transform = `translateX(${activeWorkspaceIndex * -100}vw)`;
    // Enable / disable terminal input depending on visibility
    const termInput = document.getElementById("terminal-input");
    if (activeWorkspaceIndex === 2) {
        setTimeout(() => {
            if (termInput) {
                termInput.removeAttribute("disabled");
                termInput.focus();
            }
        }, TRANSITION_DURATION);
    } else {
        if (termInput) termInput.setAttribute("disabled", "true");
    }
}

// Expose globally for terminal.js
window.navigateTo = navigateTo;

// ─── Footer Nav Sync ──────────────────────────────────────────────────────────
function syncFooterNav(index) {
    document.querySelectorAll('.footer-nav-pip').forEach(pip => {
        const pipIndex = parseInt(pip.dataset.index);
        const isActive = pipIndex === index;
        const isLogin  = pipIndex === 0;

        pip.classList.toggle('text-emerald-400',  isActive);
        pip.classList.toggle('border-emerald-500', isActive);
        pip.classList.toggle('bg-emerald-950/60',  isActive);
        pip.classList.toggle('text-zinc-600',      !isActive);
        pip.classList.toggle('border-zinc-800',    !isActive);
        pip.classList.toggle('bg-transparent',     !isActive);

        // Login pip is never clickable once session has started
        if (isLogin) {
            pip.classList.add('opacity-30', 'cursor-not-allowed');
            pip.onclick = null;
        } else {
            pip.onclick = () => window.navigateTo(pipIndex);
        }
    });
}

// ─── Scroll Handler ───────────────────────────────────────────────────────────
function handleViewportScroll(e) {
    // Lock out scroll navigation while on Login screen
    if (activeWorkspaceIndex === 0) return;
    if (scrollThrottled) return;

    // If the mouse is inside the terminal body, let it scroll internally
    // unless it has already hit its boundary (handled in terminal.js scroll setup)
    const terminalBody = document.getElementById("terminal-body");
    if (terminalBody && terminalBody.contains(e.target)) {
        const isScrollingUp   = e.deltaY < 0;
        const isScrollingDown = e.deltaY > 0;
        const atTop    = terminalBody.scrollTop === 0;
        const atBottom = Math.ceil(terminalBody.scrollTop + terminalBody.clientHeight) >= terminalBody.scrollHeight;

        if (isScrollingUp   && !atTop)    return;
        if (isScrollingDown && !atBottom) return;
    }

    let changed = false;

    if (e.deltaY > 30 && activeWorkspaceIndex < TOTAL_WORKSPACES - 1) {
        activeWorkspaceIndex++;
        changed = true;
    } else if (e.deltaY < -30 && activeWorkspaceIndex > 1) {
        activeWorkspaceIndex--;
        changed = true;
    }

    if (changed) {
        scrollThrottled = true;
        navigateTo(activeWorkspaceIndex);
        setTimeout(() => { scrollThrottled = false; }, TRANSITION_DURATION);
    }
}

// ─── Keyboard Navigation Handler ─────────────────────────────────────────────
function handleKeyNavigation(e) {
    // Always allow Escape to skip boot
    if (e.key === "Escape") {
        terminateBootAndShowLogin();
        return;
    }

    // Arrow / Page keys only — ignore everything else
    const NAV_KEYS = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "PageDown", "PageUp"];
    if (!NAV_KEYS.includes(e.key)) return;

    // Lock out on Login screen (index 0) — by design, can't keyboard-nav away from login
    if (activeWorkspaceIndex === 0) return;

    // If the terminal input is focused, let arrow keys serve the input (history nav)
    // Only suppress workspace nav when terminal workspace is active
    if (activeWorkspaceIndex === 2) {
        const termInput = document.getElementById("terminal-input");
        if (termInput && document.activeElement === termInput) return;
    }

    // Respect throttle — same rule as wheel scroll
    if (scrollThrottled) return;

    const goForward = ["ArrowDown", "ArrowRight", "PageDown"].includes(e.key);
    const goBack    = ["ArrowUp",   "ArrowLeft",  "PageUp"  ].includes(e.key);

    let changed = false;

    if (goForward && activeWorkspaceIndex < TOTAL_WORKSPACES - 1) {
        activeWorkspaceIndex++;
        changed = true;
    } else if (goBack && activeWorkspaceIndex > 1) {
        // Floor at 1 (About) — Login (0) is only reachable via "close session"
        activeWorkspaceIndex--;
        changed = true;
    }

    if (changed) {
        // Prevent the key from scrolling any inner scrollable containers
        e.preventDefault();
        scrollThrottled = true;
        navigateTo(activeWorkspaceIndex);
        setTimeout(() => { scrollThrottled = false; }, TRANSITION_DURATION);
    }
}

// ─── DOMContentLoaded ─────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
    processBootLogging();

    window.addEventListener("keydown", handleKeyNavigation);

    // Single wheel listener — terminal.js scroll engine removed
    window.addEventListener("wheel", handleViewportScroll, { passive: true });
    // ─── Touch Swipe Handler ──────────────────────────────────────────────────────
        let touchStartY = 0;
        let touchStartX = 0;

        window.addEventListener("touchstart", (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });

        window.addEventListener("touchend", (e) => {
            if (activeWorkspaceIndex === 0) return;
            if (scrollThrottled) return;

            const deltaY = touchStartY - e.changedTouches[0].clientY;
            const deltaX = touchStartX - e.changedTouches[0].clientX;

            // Only trigger if vertical swipe is dominant and long enough
            if (Math.abs(deltaY) < 50 || Math.abs(deltaY) < Math.abs(deltaX)) return;

            // If inside terminal body and not at boundary, let it scroll
            const terminalBody = document.getElementById("terminal-body");
            if (terminalBody && terminalBody.contains(e.target)) {
                const atTop    = terminalBody.scrollTop === 0;
                const atBottom = Math.ceil(terminalBody.scrollTop + terminalBody.clientHeight) >= terminalBody.scrollHeight;
                if (deltaY < 0 && !atTop)    return;
                if (deltaY > 0 && !atBottom) return;
            }

            let changed = false;

            if (deltaY > 0 && activeWorkspaceIndex < TOTAL_WORKSPACES - 1) {
                activeWorkspaceIndex++;
                changed = true;
            } else if (deltaY < 0 && activeWorkspaceIndex > 1) {
                activeWorkspaceIndex--;
                changed = true;
            }

            if (changed) {
                scrollThrottled = true;
                navigateTo(activeWorkspaceIndex);
                setTimeout(() => { scrollThrottled = false; }, TRANSITION_DURATION);
            }
        }, { passive: true });

    // Login button
    const btnLogin = document.getElementById("btn-login");
    if (btnLogin) {
        btnLogin.addEventListener("click", () => navigateTo(1));
    }

    // Terminal close button
    const btnCloseTerminal = document.getElementById("btn-terminal-close");
    if (btnCloseTerminal) {
        btnCloseTerminal.addEventListener("click", () => navigateTo(0));
    }

    // Click anywhere in terminal body to refocus input
    const termBody = document.getElementById("terminal-body");
    if (termBody) {
        termBody.addEventListener("click", () => {
            if (activeWorkspaceIndex !== 2) return;
            const input = document.getElementById("terminal-input");
            if (input) input.focus();
        });
    }

    // Live clock — updates both footer clocks
    setInterval(() => {
        const timeString = new Date().toUTCString().replace("GMT", "UTC");
        const mainClock  = document.getElementById("live-clock");
        const aboutClock = document.getElementById("about-clock");
        if (mainClock)  mainClock.textContent  = timeString;
        if (aboutClock) aboutClock.textContent = timeString;
    }, 1000);

    // Terminal shell init — called ONCE here only (terminal.js does NOT call it again)
    initializeTerminalShell();
    initProjectsPage(); 
    initSkillsPage();
    initCertificationsPage();
    initExperiencePage();
    syncFooterNav(activeWorkspaceIndex);
});