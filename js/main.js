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

// ─── Workspace Labels ─────────────────────────────────────────────────────────
const WORKSPACE_LABELS = ['LOGIN','ABOUT','TERM','PROJ','SKILLS','EXP','CERTS','CONTACT'];

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
function navigateTo(index) {
    if (index < 0 || index >= TOTAL_WORKSPACES) return;

    activeWorkspaceIndex = index;
    const wrapper = document.getElementById("desktop-wrapper");
    if (!wrapper) return;

    wrapper.style.transform = `translateX(${activeWorkspaceIndex * -100}vw)`;

    // Sync all nav UI
    syncFooterNav(activeWorkspaceIndex);
    syncMobileNav(activeWorkspaceIndex);

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

        pip.classList.toggle('text-emerald-400',   isActive);
        pip.classList.toggle('border-emerald-500',  isActive);
        pip.classList.toggle('bg-emerald-950/60',   isActive);
        pip.classList.toggle('text-zinc-600',       !isActive);
        pip.classList.toggle('border-zinc-800',     !isActive);
        pip.classList.toggle('bg-transparent',      !isActive);

        if (isLogin) {
            pip.classList.add('opacity-30', 'cursor-not-allowed');
            pip.onclick = null;
        } else {
            pip.onclick = () => window.navigateTo(pipIndex);
        }
    });
}

// ─── Mobile Nav Pill Sync ─────────────────────────────────────────────────────
function syncMobileNav(index) {
    const nav   = document.getElementById('mobile-nav');
    const label = document.getElementById('mobile-nav-label');
    const prev  = document.getElementById('mobile-prev');
    const next  = document.getElementById('mobile-next');
    if (!nav) return;

    if (index === 0) {
        nav.style.opacity      = '0';
        nav.style.pointerEvents = 'none';
        return;
    }

    nav.style.opacity      = '1';
    nav.style.pointerEvents = 'auto';

    if (label) label.textContent = WORKSPACE_LABELS[index] + ' ' + index + '/' + (TOTAL_WORKSPACES - 1);

    // Dim at boundaries
    if (prev) prev.style.opacity = index <= 1 ? '0.3' : '1';
    if (next) next.style.opacity = index >= TOTAL_WORKSPACES - 1 ? '0.3' : '1';
}

// ─── Scroll Handler ───────────────────────────────────────────────────────────
function handleViewportScroll(e) {
    if (activeWorkspaceIndex === 0) return;
    if (scrollThrottled) return;

    const terminalBody = document.getElementById("terminal-body");
    if (terminalBody && terminalBody.contains(e.target)) {
        const atTop    = terminalBody.scrollTop === 0;
        const atBottom = Math.ceil(terminalBody.scrollTop + terminalBody.clientHeight) >= terminalBody.scrollHeight;
        if (e.deltaY < 0 && !atTop)    return;
        if (e.deltaY > 0 && !atBottom) return;
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
    if (e.key === "Escape") {
        terminateBootAndShowLogin();
        return;
    }

    const NAV_KEYS = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "PageDown", "PageUp"];
    if (!NAV_KEYS.includes(e.key)) return;
    if (activeWorkspaceIndex === 0) return;

    if (activeWorkspaceIndex === 2) {
        const termInput = document.getElementById("terminal-input");
        if (termInput && document.activeElement === termInput) return;
    }

    if (scrollThrottled) return;

    const goForward = ["ArrowDown", "ArrowRight", "PageDown"].includes(e.key);
    const goBack    = ["ArrowUp",   "ArrowLeft",  "PageUp"  ].includes(e.key);

    let changed = false;
    if (goForward && activeWorkspaceIndex < TOTAL_WORKSPACES - 1) {
        activeWorkspaceIndex++;
        changed = true;
    } else if (goBack && activeWorkspaceIndex > 1) {
        activeWorkspaceIndex--;
        changed = true;
    }

    if (changed) {
        e.preventDefault();
        scrollThrottled = true;
        navigateTo(activeWorkspaceIndex);
        setTimeout(() => { scrollThrottled = false; }, TRANSITION_DURATION);
    }
}

// ─── Touch Swipe Handler ──────────────────────────────────────────────────────
let touchStartY = 0;
let touchStartX = 0;

function initTouchHandlers() {
    window.addEventListener("touchstart", (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener("touchend", (e) => {
        if (activeWorkspaceIndex === 0) return;
        if (scrollThrottled) return;

        const deltaY = touchStartY - e.changedTouches[0].clientY;
        const deltaX = touchStartX - e.changedTouches[0].clientX;

        if (Math.abs(deltaY) < 50 || Math.abs(deltaY) < Math.abs(deltaX)) return;

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
}

// ─── DOMContentLoaded ─────────────────────────────────────────────────────────
window.addEventListener("DOMContentLoaded", () => {
    processBootLogging();

    window.addEventListener("keydown", handleKeyNavigation);
    window.addEventListener("wheel", handleViewportScroll, { passive: true });
    initTouchHandlers();

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

    // Mobile prev/next buttons
    const mobilePrev = document.getElementById('mobile-prev');
    const mobileNext = document.getElementById('mobile-next');
    if (mobilePrev) {
        mobilePrev.addEventListener('click', () => {
            if (activeWorkspaceIndex > 1 && !scrollThrottled) {
                scrollThrottled = true;
                activeWorkspaceIndex--;
                navigateTo(activeWorkspaceIndex);
                setTimeout(() => { scrollThrottled = false; }, TRANSITION_DURATION);
            }
        });
    }
    if (mobileNext) {
        mobileNext.addEventListener('click', () => {
            if (activeWorkspaceIndex < TOTAL_WORKSPACES - 1 && !scrollThrottled) {
                scrollThrottled = true;
                activeWorkspaceIndex++;
                navigateTo(activeWorkspaceIndex);
                setTimeout(() => { scrollThrottled = false; }, TRANSITION_DURATION);
            }
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

    // Page init
    initializeTerminalShell();
    initProjectsPage();
    initSkillsPage();
    initCertificationsPage();
    initExperiencePage();

    // Initial nav sync
    syncFooterNav(activeWorkspaceIndex);
    syncMobileNav(activeWorkspaceIndex);
});