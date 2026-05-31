/**
 * Interactive Terminal Shell
 * - Command registry with tab-autocomplete
 * - Command history (↑ / ↓ arrows)
 * - Navigation via window.navigateTo() — state lives in main.js
 * - Scroll engine removed (main.js owns the single wheel listener)
 */

const pageOffsets = {
    'login':          0,
    'about':          1,
    'terminal':       2,
    'projects':       3,
    'skills':         4,
    'experience':     5,
    'certifications': 6,
    'contacts':       7
};

// ─── Command Registry ─────────────────────────────────────────────────────────
const commandRegistry = {
    help() {
        return `Available commands:\n` +
               `  <span class="text-emerald-400 font-bold">go <span class="text-purple-400">[page]</span></span>       - Navigate to a workspace (e.g. 'go about')\n` +
               `  <span class="text-emerald-400 font-bold">about</span>           - System specs and bio\n` +
               `  <span class="text-emerald-400 font-bold">skills</span>          - Core competencies and tech stack\n` +
               `  <span class="text-emerald-400 font-bold">projects</span>        - Production engineering projects\n` +
               `  <span class="text-emerald-400 font-bold">certifications</span>  - Cloud and vendor certifications\n` +
               `  <span class="text-emerald-400 font-bold">experience</span>       - Work experience and education\n` +
               `  <span class="text-emerald-400 font-bold">contacts</span>        - Communication endpoints\n` +
               `  <span class="text-emerald-400 font-bold">echo [text]</span>     - Print text to stdout\n` +
               `  <span class="text-emerald-400 font-bold">pwd</span>             - Print working directory\n` +
               `  <span class="text-emerald-400 font-bold">whoami</span>          - Print current session user\n` +
               `  <span class="text-emerald-400 font-bold">ls</span>              - Alias for help\n` +
               `  <span class="text-emerald-400 font-bold">clear</span>           - Clear terminal output`;
    },

    ls() {
        return this.help();
    },

    pwd() {
        return `guest@sushant.dev:~`;
    },

    whoami() {
        return `visitor@sushant.dev (Authorized Session Guest)`;
    },

    echo(args) {
        return args ? args.join(' ') : '';
    },

    about() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">SYSTEM SPECS // SUSHANT PRASAI</span>\n` +
               `========================================================================\n` +
               `DevOps and System Engineer with nearly 3 years of hands-on experience designing,\n` +
               `automating, and operating production infrastructure across AWS, Azure, DigitalOcean,\n` +
               `VMware, and Kubernetes-based environments.\n\n` +
               `Strong background in CI/CD automation using Jenkins, GitHub Actions, Ansible, Docker,\n` +
               `Terraform, and Linux, with practical experience in monitoring, incident troubleshooting,\n` +
               `CIS benchmark hardening, high-availability infrastructure, and production workload support.`;
    },

    skills() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">CORE COMPETENCIES & TECHNICAL SKILLS</span>\n` +
               `========================================================================\n` +
               `• <span class="text-emerald-400 font-bold">CI/CD & Automation    :</span> Jenkins, GitHub Actions, Terraform, Ansible, Bash\n` +
               `• <span class="text-emerald-400 font-bold">Cloud Infrastructure  :</span> AWS, Azure, DigitalOcean, Oracle Cloud, VMware vSphere\n` +
               `• <span class="text-emerald-400 font-bold">Containers            :</span> Kubernetes, Docker, Helm\n` +
               `• <span class="text-emerald-400 font-bold">Observability         :</span> Prometheus, Grafana, Loki, Zabbix, Cacti, Node Exporter\n` +
               `• <span class="text-emerald-400 font-bold">Security & Compliance :</span> Trivy, Wazuh, CIS hardening, Check Point, Fortinet, pfSense\n` +
               `• <span class="text-emerald-400 font-bold">Storage & OS          :</span> Ubuntu, RHEL-based Linux, Ceph, NAS, VPN (IPSec/OpenVPN)`;
    },

    projects() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">PRODUCTION ENGINEERING PROJECTS</span>\n` +
               `========================================================================\n` +
               `1. <span class="text-emerald-400 font-bold">2Klips Dating App Infrastructure</span>\n` +
               `   Planned and migrated a projected 500K-user platform to AWS using VPC, IAM, RDS,\n` +
               `   and EKS clusters driven entirely by GitHub Actions CI/CD workflows.\n\n` +
               `2. <span class="text-emerald-400 font-bold">Centralized Kubernetes Management Engine</span>\n` +
               `   Developed a FastAPI-based operational controller to manage multi-cluster environments,\n` +
               `   node health, visual tracking metrics, and custom automated node-scaling workflows.\n\n` +
               `3. <span class="text-emerald-400 font-bold">Sabai / Dammi Platform Architecture</span>\n` +
               `   Designed scalable DevOps deployment graphs and automated pipeline strategies for image\n` +
               `   build sequences and production container stability layers.\n\n` +
               `4. <span class="text-emerald-400 font-bold">Automated Ubuntu CIS Hardening Framework</span>\n` +
               `   Developed reproducible security loops via Wazuh and Ansible playbooks, featured\n` +
               `   live on stage at UbuCon Asia 2025.`;
    },

    experience() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">PROFESSIONAL EXPERIENCE & EDUCATION</span>\n` +
                `========================================================================\n` +
                `• <span class="text-emerald-400 font-bold">Hotstone Innovations</span> — DevOps Engineer (2023–Present)\n` +
                '• <span class="text-emerald-400 font-bold">Cloud Himalaya</span> — Network and System Engineer (2021–2023)' 
    },


    certifications() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">CLOUD & VENDOR CERTIFICATION REGISTRY</span>\n` +
               `========================================================================\n` +
               `• <span class="text-emerald-400">AWS Certified Solutions Architect – Associate (SAA-C03)</span>\n` +
               `• <span class="text-emerald-400">Oracle Cloud Infrastructure 2025 Certified DevOps Professional</span>\n` +
               `• <span class="text-emerald-400">Microsoft Certified: Azure Developer Associate (AZ-204)</span>\n` +
               `• <span class="text-emerald-400">Aviatrix Multi-Cloud Network Associate (MCNA)</span>\n` +
               `• Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)\n` +
               `• Microsoft Certified: Azure Fundamentals (AZ-900)\n` +
               `• Oracle Cloud Infrastructure 2025 Certified Foundations Associate\n` +
               `• KodeKloud Engineer: Docker | Git | Jenkins | Linux | Ansible Certified\n` +
               `• cPanel & WHM System Administrator I / Professional`;
    },

    contacts() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">COMMUNICATION ENDPOINTS</span>\n` +
               `========================================================================\n` +
               `• Email     : <span class="text-emerald-400">sushant.prasai60@gmail.com</span>\n` +
               `• Phone     : <span class="text-emerald-400">+977 9863948087</span>\n` +
               `• Website   : <a href="https://sushantprasai.com.np" target="_blank" class="underline text-emerald-400">https://sushantprasai.com.np</a>\n` +
               `• LinkedIn  : <a href="https://linkedin.com/in/sushant-prasai-79391a218/" target="_blank" class="underline text-emerald-400">linkedin.com/in/sushant-prasai-79391a218/</a>\n` +
               `• GitHub    : <a href="https://github.com/sushant-prasai" target="_blank" class="underline text-emerald-400">github.com/sushant-prasai</a>\n` +
               `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">REFERENCES:</span>\n` +
               `  - Er. Shankar Kharel  [Principal Engineer, Hotstone Innovations]\n` +
               `  - Er. Srijan Shrestha [Chief Technology Officer, Cloud Himalaya]`;
    },

    go(args) {
        if (!args || args.length === 0) {
            return `<span class="text-amber-400">Usage: go [page] — e.g. 'go about', 'go projects'</span>`;
        }

        const destination = args[0].toLowerCase();

        if (destination in pageOffsets) {
            const targetIndex = pageOffsets[destination];
            // Use the shared navigator in main.js so activeWorkspaceIndex stays in sync
            if (typeof window.navigateTo === 'function') {
                window.navigateTo(targetIndex);
                return `Navigating to: <span class="text-emerald-400">${destination}</span>`;
            }
            return `<span class="text-red-400">Error: Navigation engine not ready.</span>`;
        }

        return `<span class="text-red-400">Unknown destination: '${destination}'. ` +
               `Valid pages: ${Object.keys(pageOffsets).join(', ')}</span>`;
    },

    run(args) {
        return this.go(args);
    }
};

// ─── Autocomplete ─────────────────────────────────────────────────────────────
const coreKeywords    = Object.keys(commandRegistry).concat(["clear", "sudo", "matrix"]);
const navigateTargets = Object.keys(pageOffsets);

// ─── Terminal Init (called ONCE from main.js DOMContentLoaded) ────────────────
function initializeTerminalShell() {
    const input   = document.getElementById("terminal-input");
    const history = document.getElementById("terminal-history");
    const body    = document.getElementById("terminal-body");

    if (!input) return;

    // Command history buffer
    const cmdHistory = [];
    let historyPointer = -1;

    input.addEventListener("keydown", (e) => {
        const rawValue     = input.value;
        const currentBuffer = rawValue.trim();

        // ── Arrow Up/Down: cycle command history ──────────────────────────────
        if (e.key === "ArrowUp") {
            e.preventDefault();
            if (cmdHistory.length === 0) return;
            historyPointer = Math.min(historyPointer + 1, cmdHistory.length - 1);
            input.value = cmdHistory[historyPointer];
            // Move cursor to end
            setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
            return;
        }

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyPointer <= 0) {
                historyPointer = -1;
                input.value = "";
                return;
            }
            historyPointer--;
            input.value = cmdHistory[historyPointer];
            setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
            return;
        }

        // ── Tab: autocomplete ─────────────────────────────────────────────────
        if (e.key === "Tab") {
            e.preventDefault();
            if (!currentBuffer) return;

            const tokens      = currentBuffer.split(/\s+/);
            const commandWord = tokens[0].toLowerCase();

            if (tokens.length > 1 && (commandWord === "go" || commandWord === "run")) {
                const partial = tokens[tokens.length - 1].toLowerCase();
                const matches = navigateTargets.filter(t => t.startsWith(partial));

                if (matches.length === 1) {
                    tokens[tokens.length - 1] = matches[0];
                    input.value = tokens.join(" ");
                } else if (matches.length > 1) {
                    appendEchoRow(rawValue);
                    printAutocompleteOptions(matches);
                }
            } else if (tokens.length === 1) {
                const partial = tokens[0].toLowerCase();
                const matches = coreKeywords.filter(c => c.startsWith(partial));

                if (matches.length === 1) {
                    input.value = matches[0];
                } else if (matches.length > 1) {
                    appendEchoRow(rawValue);
                    printAutocompleteOptions(matches);
                }
            }
            return;
        }

        // ── Enter: execute command ────────────────────────────────────────────
        if (e.key === "Enter") {
            if (!currentBuffer) return;

            // Save to history (newest first, skip duplicates at top)
            if (cmdHistory[0] !== currentBuffer) {
                cmdHistory.unshift(currentBuffer);
                if (cmdHistory.length > 50) cmdHistory.pop(); // cap history
            }
            historyPointer = -1;

            appendEchoRow(rawValue);

            const tokens      = currentBuffer.split(/\s+/);
            const baseCommand = tokens[0].toLowerCase();

            if (baseCommand === "clear") {
                history.innerHTML = "";
            } else if (baseCommand === "sudo") {
                appendResponseRow("Nice try, but you do not have root access on sushant.dev.");
            } else if (baseCommand === "matrix") {
                triggerMatrixEasterEgg();
            } else {
                const response = handleTerminalCommand(rawValue);
                if (response) appendResponseRow(response);
            }

            input.value = "";
            body.scrollTop = body.scrollHeight;
        }
    });

    function printAutocompleteOptions(list) {
        const row = document.createElement("p");
        row.className = "text-zinc-500 text-xs tracking-wider";
        row.innerHTML = list.map(cmd => `<span class="text-emerald-400 font-bold mr-4">${cmd}</span>`).join("");
        history.appendChild(row);
        body.scrollTop = body.scrollHeight;
    }
}

// ─── Output Helpers ───────────────────────────────────────────────────────────
function appendEchoRow(text) {
    const history = document.getElementById("terminal-history");
    const row     = document.createElement("p");
    row.innerHTML = `<span class="text-emerald-400 font-bold">guest@sushant.dev:~$</span> <span class="text-white">${text}</span>`;
    history.appendChild(row);
}

function appendResponseRow(text, customClass = "") {
    const history = document.getElementById("terminal-history");
    const row     = document.createElement("p");
    if (customClass) row.className = customClass;
    row.innerHTML = text.replace(/\n/g, "<br>");
    history.appendChild(row);
}

// ─── Easter Egg ───────────────────────────────────────────────────────────────
function triggerMatrixEasterEgg() {
    appendResponseRow("Initializing data stream visualization...", "text-zinc-500 text-xs italic");
    const body = document.getElementById("terminal-body");

    let count = 0;
    const interval = setInterval(() => {
        const line = document.createElement("p");
        line.className = "text-emerald-500/30 text-xs font-mono select-none truncate";
        line.textContent = Array.from({ length: 45 }, () => Math.random() > 0.5 ? "1" : "0").join(" ");
        body.appendChild(line);
        body.scrollTop = body.scrollHeight;

        if (++count > 25) {
            clearInterval(interval);
            appendResponseRow("Stream complete.", "text-emerald-400 font-bold text-xs");
        }
    }, 60);
}

// ─── Command Dispatcher ───────────────────────────────────────────────────────
function handleTerminalCommand(rawInput) {
    const trimmed = rawInput.trim();
    if (!trimmed) return "";

    const tokens      = trimmed.split(/\s+/);
    const commandName = tokens[0].toLowerCase();
    const args        = tokens.slice(1);

    if (commandName in commandRegistry) {
        return commandRegistry[commandName](args);
    }

    return `<span class="text-red-400">bash: command not found: ${commandName}. Type 'help' to see available commands.</span>`;
}