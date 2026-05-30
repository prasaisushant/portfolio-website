/**
 * Interactive Command Line Parser with Native Tab-Autocomplete Array Logic Matrix
 */
const pageOffsets = {
    'login': 0,
    'about': 1,
    'terminal': 2,
    'skills': 3,          
    'projects': 4,        
    'certifications': 5,
    'contacts': 6
};

// --- Terminal Commands Registry Framework ---
const commandRegistry = {
    help: function() {
        return `Available Operations Map:\n` +
               `  <span class="text-emerald-400 font-bold">about</span>           - View system architectural specifications (Neofetch)\n` +
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

    certifications: function() {
        return `========================================================================\n` +
               `CLOUD INFRASTRUCTURE & VENDOR CERTIFICATION REGISTRY\n` +
               `========================================================================\n` +
               `• AWS Certified Solutions Architect – Associate (SAA-C03)\n` +
               `• Oracle Cloud Infrastructure 2025 Certified DevOps Professional\n` +
               `• Microsoft Certified: Azure Developer Associate (AZ-204)\n` +
               `• Aviatrix Multi-Cloud Network Associate (MCNA)\n` +
               `• Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900)\n` +
               `• Microsoft Certified: Azure Fundamentals (AZ-900)\n` +
               `• Oracle Cloud Infrastructure 2025 Certified Foundations Associate\n` +
               `• KodeKloud Engineer: Docker | Git | Jenkins | Linux | Ansible Certified\n` +
               `• cPanel & WHM System Administrator I / Professional`;
    },

    contacts: function() {
        return `========================================================================\n` +
               `UPSTREAM COMMUNICATION ENDPOINTS & ACCESS KEYS\n` +
               `========================================================================\n` +
               `• Secure Email     : sushant.prasai60@gmail.com\n` +
               `• Telephony Node   : +977 9863948087\n` +
               `• Interconnect Gateway:\n` +
               `    - Website      : https://sushantprasai.com.np\n` +
               `    - LinkedIn     : https://linkedin.com/in/sushant-prasai-79391a218/\n` +
               `========================================================================\n` +
               `REFERENCES PROTOCOL:\n` +
               `  - Er. Shankar Kharel  [Principal Engineer, Hotstone Innovations]\n` +
               `  - Er. Srijan Shrestha [Chief Technology Officer, Cloud Himalaya]`;
    },

    go: function(args) {
        if (!args || args.length === 0) {
            return `Navigation Error: Specific destination required. Example: 'go about' or 'run projects'`;
        }
        
        const destination = args[0].toLowerCase();
        
        if (destination in pageOffsets) {
            const targetIndex = pageOffsets[destination];
            const wrapper = document.getElementById('desktop-wrapper');
            
            if (wrapper) {
                wrapper.style.transform = `translateX(-${targetIndex * 100}vw)`;
                return `Navigation matrix synchronized. Execution routing complete: [Target Node: ${destination}]`;
            }
            return `Execution Abort: Desktop-wrapper canvas infrastructure element missing in DOM.`;
        } else {
            return `Execution Refusal: Target node '${destination}' not found inside layout routing tables.`;
        }
    },

    run: function(args) {
        return this.go(args);
    }
};

// Autocomplete suggestion dictionary matching all keys
const autocompleteKeywords = Object.keys(commandRegistry).concat([
    "clear", 
    "sudo", 
    "matrix", 
    "about", 
    "projects", 
    "skills"
]);
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

            const matchingCandidates = autocompleteKeywords.filter(cmd => cmd.startsWith(currentBuffer.toLowerCase()));

            if (matchingCandidates.length === 1) {
                input.value = matchingCandidates[0];
            } else if (matchingCandidates.length > 1) {
                appendEchoRow(rawValue);
                const optionsRow = document.createElement("p");
                optionsRow.className = "text-zinc-500 text-xs tracking-wider space-x-6";
                optionsRow.innerHTML = matchingCandidates.map(cmd => `<span>${cmd}</span>`).join("");
                history.appendChild(optionsRow);
                body.scrollTop = body.scrollHeight;
            }
        }

        if (e.key === "Enter") {
            if (!currentBuffer) return;
            appendEchoRow(rawValue);

            const loweredBuffer = currentBuffer.toLowerCase();

            if (loweredBuffer === "clear") {
                history.innerHTML = "";
            } else if (loweredBuffer === "sudo") {
                appendResponseRow("Nice try, but you do not have root access privileges on sushant.dev infrastructure arrays.");
            } else if (loweredBuffer === "matrix") {
                triggerMatrixEasterEgg();
            } else {
                // Pipe directly through our handleTerminalCommand execution pipeline
                const systemResponse = handleTerminalCommand(rawValue);
                if (systemResponse) {
                    appendResponseRow(systemResponse);
                }
            }

            input.value = "";
            body.scrollTop = body.scrollHeight;
        }
    });
}

function appendEchoRow(text) {
    const history = document.getElementById("terminal-history");
    const row = document.createElement("p");
    row.innerHTML = `<span class="text-emerald-400 font-bold">guest@sushant.dev:~$</span> <span class="text-white">${text}</span>`;
    history.appendChild(row);
}

// Accept line-break structures formatting responses naturally
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

    const legacyTerminalPages = ['about', 'projects', 'skills'];

    if (commandName in commandRegistry) {
        return commandRegistry[commandName](argumentsPassed);
    } else if (legacyTerminalPages.includes(commandName)) {
        return commandRegistry.go([commandName]);
    } else {
        return `<span class="text-red-400">bash: command not found: ${commandName}. Press Tab key twice to review candidate vectors or type 'help'.</span>`;
    }
}

// Boot stream engine sequence
document.addEventListener("DOMContentLoaded", () => {
    initializeTerminalShell();
});