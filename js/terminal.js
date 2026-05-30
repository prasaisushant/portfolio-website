/**
 * Interactive Command Line Parser with Native Tab-Autocomplete Array Logic Matrix
 */
const commandResponses = {
    help: "Available expressions:<br> <span class='text-emerald-400'>'about'</span> - Architectural scope context overview<br> <span class='text-emerald-400'>'projects'</span> - Product codebase deployment parameters<br> <span class='text-emerald-400'>'skills'</span> - Visual infrastructure asset profiles<br> <span class='text-emerald-400'>'whoami'</span> - Print structural connection metadata<br> <span class='text-emerald-400'>'pwd'</span> - Print explicit system active coordinates<br> <span class='text-emerald-400'>'clear'</span> - Clear visual execution logs canvas buffer",
    about: "Sushant Prasai: Systems & DevOps Engineer focused on resilient platform telemetry monitoring architectures and high-density virtualization setups.",
    projects: "📁 production-cluster-mesh [Active/DevOps] <br>📁 matrix-compressor-api [Active/Node.js]",
    skills: "Cloud Architectures: AWS, GCP, Kubernetes Core Deployments<br>Infrastructure Setup: Ansible, Terraform, Ceph Storage Clusters, VMware ESXi",
    whoami: "guest@sushant.dev // Secure external session connection authorized.",
    pwd: "portfolio:~/home/workspace"
};

const commands = Object.keys(commandResponses).concat(["clear", "sudo", "matrix"]);

function initializeTerminalShell() {
    const input = document.getElementById("terminal-input");
    const history = document.getElementById("terminal-history");
    const body = document.getElementById("terminal-body");

    if (!input) return;

    input.addEventListener("keydown", (e) => {
        const rawValue = input.value;
        const currentBuffer = rawValue.trim().toLowerCase();

        if (e.key === "Tab") {
            e.preventDefault(); 
            if (!currentBuffer) return;

            const matchingCandidates = commands.filter(cmd => cmd.startsWith(currentBuffer));

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

            if (currentBuffer === "clear") {
                history.innerHTML = "";
            } else if (currentBuffer === "sudo") {
                appendResponseRow("Nice try, but you do not have root access privileges on sushant.dev infrastructure arrays.");
            } else if (currentBuffer === "matrix") {
                triggerMatrixEasterEgg();
            } else if (commandResponses[currentBuffer]) {
                appendResponseRow(commandResponses[currentBuffer]);
            } else {
                appendResponseRow(`bash: command not found: ${currentBuffer}. Press Tab key twice to review candidate vectors or type 'help'.`, "text-red-400");
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

function appendResponseRow(text, customClass = "") {
    const history = document.getElementById("terminal-history");
    const row = document.createElement("p");
    if (customClass) row.className = customClass;
    row.innerHTML = text;
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