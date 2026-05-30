/**
 * Interactive Command Line Parser with Native Tab-Autocomplete Array Logic Matrix
 */
const pageOffsets = {
    'login': 0,
    'about': 1,
    'terminal': 2,
    'projects': 3, 
    'skills': 4,          
    'certifications': 5,
    'contacts': 6
};

// --- Terminal Commands Registry Framework ---
const commandRegistry = {
    help: function() {
        return `Available Operations Map:\n` +
               `  <span class="text-emerald-400 font-bold">about</span>           - View summary system architectural specifications (Neofetch)\n` +
               `  <span class="text-emerald-400 font-bold">skills</span>          - Load compiled competency profiles and core frameworks\n` +
               `  <span class="text-emerald-400 font-bold">projects</span>        - Enumerate production systems and deployment skeletons\n` +
               `  <span class="text-emerald-400 font-bold">certifications</span>  - List cloud infrastructure and vendor verifications\n` +
               `  <span class="text-emerald-400 font-bold">contacts</span>        - Output upstream communication keys and endpoints\n` +
               `  <span class="text-emerald-400 font-bold">go [page]</span>       - Navigate layout direct via view execution matrix (e.g., 'go about')\n` +
               `  <span class="text-emerald-400 font-bold">echo [string]</span>   - Reflect text parameters directly back to stdout pipelines\n` +
               `  <span class="text-emerald-400 font-bold">pwd</span>             - Print current active session node working directory\n` +
               `  <span class="text-emerald-400 font-bold">whoami</span>          - Return session parameter evaluation authority token\n` +
               `  <span class="text-emerald-400 font-bold">ls</span>              - Alias mapping execution sequence for 'help'\n` +
               `  <span class="text-emerald-400 font-bold">clear</span>           - Purge stdout trace metrics buffer from active view`;
    },

    ls: function() {
        return this.help();
    },

    pwd: function() {
        return `guest@sushant.dev:~`;
    },

    whoami: function() {
        return `visitor@sushant.dev (Authorized Session Guest Instance)`;
    },

    echo: function(args) {
        return args ? args.join(' ') : '';
    },

    about: function() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">SYSTEM ARCHITECTURAL SPECIFICATIONS // SUSHANT PRASAI</span>\n` +
               `========================================================================\n` +
               `DevOps and System Engineer with nearly 3 years of hands-on experience designing,\n` +
               `automating, and operating production infrastructure across AWS, Azure, DigitalOcean,\n` +
               `VMware, and Kubernetes-based environments[cite: 6].\n\n` +
               `Strong background in CI/CD automation using Jenkins, GitHub workflows, Ansible, Docker,\n` +
               `Terraform, and Linux, with practical experience in monitoring, incident troubleshooting,\n` +
               `CIS benchmark hardening, high-availability infrastructure, and production workload support[cite: 7].`;
    },

    skills: function() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">CORE COMPETENCIES & TECHNICAL SKILLS MATRIX</span>\n` +
               `========================================================================\n` +
               `• <span class="text-emerald-400 font-bold">CI/CD & Automation    :</span> Jenkins, GitHub Actions, Terraform, Ansible, Bash [cite: 58, 59]\n` +
               `• <span class="text-emerald-400 font-bold">Cloud Infrastructure  :</span> AWS, Azure, DigitalOcean, Oracle Cloud, VMware vSphere [cite: 60]\n` +
               `• <span class="text-emerald-400 font-bold">Containers Platform   :</span> Kubernetes, Docker, Helm [cite: 58]\n` +
               `• <span class="text-emerald-400 font-bold">Observability Logic   :</span> Prometheus, Grafana, Loki, Zabbix, Cacti, Node Exporter [cite: 62]\n` +
               `• <span class="text-emerald-400 font-bold">Security Compliance   :</span> Trivy, Wazuh, CIS hardening, Check Point, Fortinet, pfSense [cite: 62]\n` +
               `• <span class="text-emerald-400 font-bold">Storage & OS Arrays   :</span> Ubuntu, RHEL-based Linux, Ceph, NAS, VPN (IPSec/OpenVPN) [cite: 62]`;
    },

    projects: function() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">PRODUCTION CORE ENGINEERING PROJECTS SKELETONS</span>\n` +
               `========================================================================\n` +
               `1. <span class="text-emerald-400 font-bold">2Klips Dating App Infrastructure Layer</span>\n` +
               `   Planned and migrated a projected 500K-user platform to AWS using VPC, IAM, RDS,\n` +
               `   and EKS clusters driven entirely by GitHub Actions CI/CD workflows[cite: 51, 52].\n\n` +
               `2. <span class="text-emerald-400 font-bold">Centralized Kubernetes Management Engine</span>\n` +
               `   Developed a FastAPI-based operational controller to manage multi-cluster environments,\n` +
               `   node health, visual tracking metrics, and custom automated node-scaling workflows[cite: 55].\n\n` +
               `3. <span class="text-emerald-400 font-bold">Sabai / Dammi Platform Architecture</span>\n` +
               `   Designed scalable DevOps deployment graphs and automated pipeline strategies for image build\n` +
               `   sequences and production container stability layers[cite: 53].\n\n` +
               `4. <span class="text-emerald-400 font-bold">Automated Ubuntu CIS Hardening Framework</span>\n` +
               `   Developed reproducible security loops via Wazuh and Ansible playbooks, a solution featured\n` +
               `   live on stage at UbuCon Asia 2025[cite: 56].`;
    },

    certifications: function() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">CLOUD INFRASTRUCTURE & VENDOR CERTIFICATION REGISTRY</span>\n` +
               `========================================================================\n` +
               `• <span class="text-emerald-400">AWS Certified Solutions Architect – Associate (SAA-C03)</span> [cite: 65]\n` +
               `• <span class="text-emerald-400">Oracle Cloud Infrastructure 2025 Certified DevOps Professional</span> [cite: 72]\n` +
               `• <span class="text-emerald-400">Microsoft Certified: Azure Developer Associate (AZ-204)</span> [cite: 68]\n` +
               `• <span class="text-emerald-400">Aviatrix Multi-Cloud Network Associate (MCNA)</span> [cite: 72]\n` +
               `• Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900) [cite: 67]\n` +
               `• Microsoft Certified: Azure Fundamentals (AZ-900) [cite: 66]\n` +
               `• Oracle Cloud Infrastructure 2025 Certified Foundations Associate [cite: 71]\n` +
               `• KodeKloud Engineer: Docker | Git | Jenkins | Linux | Ansible Certified [cite: 73]\n` +
               `• cPanel & WHM System Administrator I / Professional [cite: 74, 75]`;
    },

    contacts: function() {
        return `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">UPSTREAM COMMUNICATION ENDPOINTS & ACCESS KEYS</span>\n` +
               `========================================================================\n` +
               `• Secure Email     : <span class="text-emerald-400">sushant.prasai60@gmail.com</span> [cite: 3]\n` +
               `• Telephony Node   : <span class="text-emerald-400">+977 9863948087</span> [cite: 3]\n` +
               `• Interconnect Gateway:\n` +
               `    - Website      : <a href="https://sushantprasai.com.np" target="_blank" class="underline text-emerald-400">https://sushantprasai.com.np</a> [cite: 4]\n` +
               `    - LinkedIn     : <a href="https://linkedin.com/in/sushant-prasai-79391a218/" target="_blank" class="underline text-emerald-400">linkedin.com/in/sushant-prasai-79391a218/</a> [cite: 4]\n` +
               `========================================================================\n` +
               `<span class="text-emerald-400 font-bold">REFERENCES PROTOCOL:</span>\n` +
               `  - Er. Shankar Kharel  [Principal Engineer, Hotstone Innovations] [cite: 83, 84]\n` +
               `  - Er. Srijan Shrestha [Chief Technology Officer, Cloud Himalaya] [cite: 77, 78]`;
    },

    go: function(args) {
        if (!args || args.length === 0) {
            return `<span class="text-amber-400">Navigation Error: Specific destination required. Example: 'go about' or 'run projects'</span>`;
        }
        
        const destination = args[0].toLowerCase();
        
        if (destination in pageOffsets) {
            const targetIndex = pageOffsets[destination];
            const wrapper = document.getElementById('desktop-wrapper');
            
            if (wrapper) {
                wrapper.style.transform = `translateX(-${targetIndex * 100}vw)`;
                return `Navigation matrix synchronized. Execution routing complete: [Target Node: <span class="text-emerald-400">${destination}</span>]`;
            }
            return `<span class="text-red-400">Execution Abort: Desktop-wrapper canvas infrastructure element missing in DOM.</span>`;
        } else {
            return `<span class="text-red-400">Execution Refusal: Target node '${destination}' not found inside layout routing tables.</span>`;
        }
    },

    run: function(args) {
        return this.go(args);
    }
};

// Autocomplete targets matching core tools and parameters
const coreKeywords = Object.keys(commandRegistry).concat(["clear", "sudo", "matrix"]);
const navigateTargets = Object.keys(pageOffsets);

function initializeTerminalShell() {
    const input = document.getElementById("terminal-input");
    const history = document.getElementById("terminal-history");
    const body = document.getElementById("terminal-body");

    if (!input) return;

    input.addEventListener("keydown", (e) => {
        const rawValue = input.value;
        const currentBuffer = rawValue.trim();

        if (e.key === "Tab") {
            e.preventDefault(); 
            if (!currentBuffer) return;

            const tokens = currentBuffer.split(/\s+/);
            const commandWord = tokens[0].toLowerCase();

            if (tokens.length > 1 && (commandWord === "go" || commandWord === "run")) {
                const targetToken = tokens[tokens.length - 1].toLowerCase();
                const matches = navigateTargets.filter(t => t.startsWith(targetToken));

                if (matches.length === 1) {
                    tokens[tokens.length - 1] = matches[0];
                    input.value = tokens.join(" ");
                } else if (matches.length > 1) {
                    appendEchoRow(rawValue);
                    printAutocompleteOptions(matches);
                }
            } else if (tokens.length === 1) {
                const baseToken = tokens[0].toLowerCase();
                const matches = coreKeywords.filter(c => c.startsWith(baseToken));

                if (matches.length === 1) {
                    input.value = matches[0];
                } else if (matches.length > 1) {
                    appendEchoRow(rawValue);
                    printAutocompleteOptions(matches);
                }
            }
        }

        if (e.key === "Enter") {
            if (!currentBuffer) return;
            appendEchoRow(rawValue);

            const tokens = currentBuffer.split(/\s+/);
            const baseCommand = tokens[0].toLowerCase();

            if (baseCommand === "clear") {
                history.innerHTML = "";
            } else if (baseCommand === "sudo") {
                appendResponseRow("Nice try, but you do not have root access privileges on sushant.dev infrastructure arrays.");
            } else if (baseCommand === "matrix") {
                triggerMatrixEasterEgg();
            } else {
                const systemResponse = handleTerminalCommand(rawValue);
                if (systemResponse) {
                    appendResponseRow(systemResponse);
                }
            }

            input.value = "";
            body.scrollTop = body.scrollHeight;
        }
    });

    function printAutocompleteOptions(list) {
        const optionsRow = document.createElement("p");
        optionsRow.className = "text-zinc-500 text-xs tracking-wider space-x-6";
        optionsRow.innerHTML = list.map(cmd => `<span class="text-emerald-400 font-bold">${cmd}</span>`).join("");
        history.appendChild(optionsRow);
        body.scrollTop = body.scrollHeight;
    }
}

function appendEchoRow(text) {
    const history = document.getElementById("terminal-history");
    const row = document.createElement("p");
    row.innerHTML = `<span class="text-emerald-400 font-bold">guest@sushant.dev:~$</span> <span class="text-white">${text}</span>`;
    history.appendChild(row);
}

function appendResponseRow(text, customClass = "") {
    const history = document.getElementById("terminal-history");
    const row = document.createElement("p");
    if (customClass) row.className = customClass;
    row.innerHTML = text.replace(/\n/g, "<br>");
    history.appendChild(row);
}

function triggerMatrixEasterEgg() {
    appendResponseRow("Initializing kernel data streams visualization overlay...", "text-zinc-500 text-xs italic");
    const body = document.getElementById("terminal-body");
    
    let countdown = 0;
    const interval = setInterval(() => {
        const matrixStream = document.createElement("p");
        matrixStream.className = "text-emerald-500/30 text-xs font-mono select-none truncate";
        matrixStream.textContent = Array.from({length: 45}, () => Math.random() > 0.5 ? "1" : "0").join(" ");
        body.appendChild(matrixStream);
        body.scrollTop = body.scrollHeight;
        
        countdown++;
        if (countdown > 25) {
            clearInterval(interval);
            appendResponseRow("Stream monitoring vector complete.", "text-emerald-400 font-bold text-xs");
        }
    }, 60);
}

function handleTerminalCommand(rawInputValue) {
    const trimmedInput = rawInputValue.trim();
    if (!trimmedInput) return "";

    const tokens = trimmedInput.split(/\s+/);
    const commandName = tokens[0].toLowerCase();
    const argumentsPassed = tokens.slice(1);

    if (commandName in commandRegistry) {
        return commandRegistry[commandName](argumentsPassed);
    } else {
        return `<span class="text-red-400">bash: command not found: ${commandName}. Press Tab key twice to review candidate vectors or type 'help'.</span>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initializeTerminalShell();
});

/**
 * Global Workspace Scroll and Navigation Track Synchronization Engine
 */
let currentWorkspaceIndex = 0;
const totalWorkspacesCount = 7; // Synced with w-[700vw] matrix
let isScrollThrottled = false;

function setupWorkspaceScrollEngine() {
    const wrapper = document.getElementById('desktop-wrapper');
    const terminalBody = document.getElementById('terminal-body');

    if (!wrapper) return;

    window.addEventListener('wheel', (e) => {
        // 1. INTENT SANITIZATION: If mouse is inside active terminal console body, 
        // let the container scroll internally instead of shifting the global layout.
        if (terminalBody && terminalBody.contains(e.target)) {
            // Only capture layout scroll if user is at boundary metrics edges
            const isScrollingUp = e.deltaY < 0;
            const isScrollingDown = e.deltaY > 0;
            
            const isAtTop = terminalBody.scrollTop === 0;
            const isAtBottom = Math.ceil(terminalBody.scrollTop + terminalBody.clientHeight) >= terminalBody.scrollHeight;

            if (isScrollingUp && !isAtTop) return;   // Let terminal scroll up internally
            if (isScrollingDown && !isAtBottom) return; // Let terminal scroll down internally
        }

        // 2. THROTTLE LOOP: Prevent rapid mouse wheel flicks from throwing out viewport index
        if (isScrollThrottled) return;

        if (e.deltaY > 0) {
            // Scroll Down / Wheel Forward -> Navigate Next Page
            if (currentWorkspaceIndex < totalWorkspacesCount - 1) {
                currentWorkspaceIndex++;
                executeLayoutTransition();
            }
        } else if (e.deltaY < 0) {
            // Scroll Up / Wheel Backward -> Navigate Previous Page
            if (currentWorkspaceIndex > 0) {
                currentWorkspaceIndex--;
                executeLayoutTransition();
            }
        }
    }, { passive: false });

    function executeLayoutTransition() {
        isScrollThrottled = true;
        
        // Translate the horizontal canvas wrapper relative to current global index
        wrapper.style.transform = `translateX(-${currentWorkspaceIndex * 100}vw)`;
        
        // Clear lock once transition completes smoothly (Matching 850ms duration-[850ms])
        setTimeout(() => {
            isScrollThrottled = false;
        }, 850);
    }
}

// Ensure execution loops wait properly for full DOM hydration maps
document.addEventListener('DOMContentLoaded', () => {
    setupWorkspaceScrollEngine();
});