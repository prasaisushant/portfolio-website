/**
 * Experience & Education Page Engine
 * git log --oneline style list on left, full detail panel on right.
 * Education entries mixed into the timeline chronologically.
 */

const experienceData = [
    {
        id:       "hotstone",
        type:     "work",
        hash:     "a3f9c12",
        role:     "DevOps Engineer",
        org:      "Hotstone Innovation (Jiwan Tech)",
        period:   "Dec 2025 – Present",
        location: "Kathmandu, Nepal",
        status:   "ACTIVE",
        statusColor: "emerald",
        tags:     ["Kubernetes", "Terraform", "Docker", "Ansible", "Prometheus", "Grafana", "Loki", "AWS", "DigitalOcean", "Helm"],
        bullets: [
            "Designed and maintained Kubernetes-native infrastructure for web, mobile, and backend services using Docker, Kubernetes, Terraform OSS, and Ansible.",
            "Built and improved CI/CD pipelines for automated build, test, Docker image creation, and Kubernetes deployment workflows.",
            "Automated infrastructure provisioning across AWS and DigitalOcean using Terraform, improving repeatability and reducing manual deployment effort.",
            "Managed Helm-based Kubernetes deployments with environment-specific configurations for development, staging, and production workloads.",
            "Implemented production monitoring and alerting using Prometheus, Grafana, Loki, and Node Exporter to improve service visibility and incident detection.",
            "Containerized backend and frontend services, improving deployment consistency, rollback readiness, and operational portability.",
            "Collaborated with developers to improve release reliability, troubleshoot production issues, and optimize platform performance.",
            "Supported Kubernetes workload scaling, resource optimization, and cluster-level troubleshooting for production environments.",
        ]
    },
    {
        id:       "cloudhimalaya",
        type:     "work",
        hash:     "8b2e441",
        role:     "Network & System Engineer",
        org:      "Cloud Himalaya Pvt. Ltd.",
        period:   "Sep 2023 – Dec 2025",
        location: "Kathmandu, Nepal",
        status:   "COMPLETED",
        statusColor: "zinc",
        tags:     ["VMware", "Kubernetes", "Docker", "Zabbix", "Cacti", "Ansible", "Wazuh", "Check Point", "Fortinet", "pfSense", "Ceph"],
        bullets: [
            "Operated VMware ESXi and vSphere-based production infrastructure, provisioning Linux VMs, configuring networking, storage, and security for business-critical workloads.",
            "Built a hardened Ubuntu/Linux VM template and improved CIS Benchmark score from 45 to 83, reducing manual hardening effort and improving baseline security compliance.",
            "Supported Kubernetes and Docker-based workloads across multiple clusters, troubleshooting deployment failures, container runtime issues, and networking problems.",
            "Managed NAS storage systems; configured storage volumes, access controls, and backup schedules to ensure reliable data availability and disaster recovery readiness.",
            "Deployed and managed Ceph distributed storage to support high availability, redundancy, and resilient production workloads.",
            "Implemented infrastructure monitoring using Zabbix and Cacti, maintaining 99.9% uptime and enabling proactive incident detection and resolution.",
            "Secured enterprise network environments using Check Point, Fortinet, and pfSense firewalls with IPSec, OpenVPN, and WireGuard VPNs.",
            "Automated Linux hardening and configuration workflows using Ansible and Wazuh, supporting repeatable security operations and compliance improvements.",
        ]
    },
    {
        id:       "ubucon",
        type:     "activity",
        hash:     "f1d8a03",
        role:     "Speaker",
        org:      "UbuCon Asia 2025",
        period:   "2025",
        location: "Kathmandu, Nepal",
        status:   "DELIVERED",
        statusColor: "cyan",
        tags:     ["Ansible", "Wazuh", "Ubuntu", "CIS Hardening", "Public Speaking"],
        bullets: [
            "Delivered a technical talk on 'Enhancing CIS Benchmark for Ubuntu Using Wazuh and Ansible'.",
            "Demonstrated automation of security hardening processes and monitoring improvements to a live audience.",
        ]
    },
    {
        id:       "bsc",
        type:     "education",
        hash:     "3d7f190",
        role:     "B.Sc. in Computer Science & Information Technology",
        org:      "Tribhuvan University — St. Xavier's College",
        period:   "2020 – 2024",
        location: "Kathmandu, Nepal",
        status:   "GRADUATED",
        statusColor: "amber",
        tags:     ["Computer Networks", "Operating Systems", "Databases", "Cloud Computing", "Software Engineering"],
        bullets: [
            "Focused on Computer Networks, Operating Systems, Databases, Cloud Computing, and Software Engineering.",
            "Active member of SQC UDAAN (Executive Member) and EcoSphere Club (Coordinator).",
            "Led environmental awareness events and technical workshops for students.",
        ]
    },
];

// ── Color maps ────────────────────────────────────────────────────────────────
const EXP_COLOR = {
    emerald: { badge: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60', dot: 'bg-emerald-400', hash: 'text-emerald-400', border: 'border-l-emerald-500' },
    cyan:    { badge: 'bg-cyan-950/80 text-cyan-400 border-cyan-800/60',          dot: 'bg-cyan-400',    hash: 'text-cyan-400',    border: 'border-l-cyan-500'    },
    amber:   { badge: 'bg-amber-950/80 text-amber-400 border-amber-800/60',       dot: 'bg-amber-400',   hash: 'text-amber-400',   border: 'border-l-amber-400'   },
    zinc:    { badge: 'bg-zinc-800/80 text-zinc-400 border-zinc-700/60',           dot: 'bg-zinc-400',    hash: 'text-zinc-500',    border: 'border-l-zinc-600'    },
};

const TYPE_ICON = {
    work:      '▸',
    education: '✦',
    activity:  '◆',
};

let activeExpId = experienceData[0].id;

// ── Bootstrap ─────────────────────────────────────────────────────────────────
function initExperiencePage() {
    renderExpList();
    renderExpDetail(activeExpId);
}

// ── Left panel — git log list ─────────────────────────────────────────────────
function renderExpList() {
    const list = document.getElementById('exp-list');
    if (!list) return;

    list.innerHTML = experienceData.map((e, i) => {
        const c = EXP_COLOR[e.statusColor] || EXP_COLOR.zinc;
        const isActive = e.id === activeExpId;
        return `
        <div id="exp-item-${e.id}"
             onclick="selectExp('${e.id}')"
             class="group relative pl-8 pr-3 py-3 cursor-pointer border-l-2 transition-all duration-200
                    ${isActive ? `${c.border} bg-[#0d131a]` : 'border-l-transparent hover:border-l-zinc-700 hover:bg-[#0a0f14]'}">

            <!-- Timeline dot -->
            <div class="absolute left-[-5px] top-4 w-2 h-2 rounded-full border-2 border-[#090d13]
                        ${isActive ? c.dot : 'bg-zinc-700 group-hover:bg-zinc-500'} transition-colors"></div>

            <!-- Hash + type -->
            <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-mono ${isActive ? c.hash : 'text-zinc-600 group-hover:text-zinc-500'} transition-colors">${TYPE_ICON[e.type]} ${e.hash}</span>
                <span class="text-[9px] font-mono text-zinc-700 uppercase tracking-wider">${e.type}</span>
            </div>

            <!-- Role -->
            <p class="text-xs font-bold font-mono ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'} transition-colors leading-tight">${e.role}</p>

            <!-- Org + period -->
            <p class="text-[10px] font-mono text-zinc-500 mt-0.5">${e.org}</p>
            <div class="flex items-center justify-between mt-1.5">
                <span class="text-[9px] font-mono text-zinc-600">${e.period}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded font-bold font-mono border ${c.badge}">${e.status}</span>
            </div>
        </div>
        ${i < experienceData.length - 1 ? '<div class="ml-8 border-l border-zinc-800/60 h-3"></div>' : ''}
        `;
    }).join('');
}

// ── Right panel — detail view ─────────────────────────────────────────────────
function renderExpDetail(id) {
    const e = experienceData.find(x => x.id === id);
    if (!e) return;

    const panel = document.getElementById('exp-detail-panel');
    if (!panel) return;

    const c = EXP_COLOR[e.statusColor] || EXP_COLOR.zinc;

    const bullets = e.bullets.map(b =>
        `<li class="flex items-start gap-2 text-zinc-400 leading-relaxed">
            <span class="${c.hash} font-bold shrink-0 mt-0.5">+</span>
            <span>${b}</span>
        </li>`
    ).join('');

    const tags = e.tags.map(t =>
        `<span class="bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-zinc-300 rounded text-[10px] font-mono">${t}</span>`
    ).join('');

    panel.innerHTML = `
        <!-- Header -->
        <div class="flex items-center gap-2 border-b border-zinc-900 pb-2.5 mb-4">
            <span class="w-2 h-2 rounded-full ${c.dot} animate-pulse shrink-0"></span>
            <span class="font-bold tracking-widest text-[10px] uppercase text-zinc-400">git show ${e.hash}</span>
        </div>

        <!-- Commit metadata block -->
        <div class="bg-[#0a0e14] border border-zinc-800/60 rounded-lg p-3 mb-4 font-mono text-[11px] space-y-1">
            <p class="text-zinc-300"><span class="${c.hash} font-bold">commit</span> ${e.hash}</p>
            <p class="text-zinc-300"><span class="${c.hash} font-bold">Author:</span> Sushant Prasai &lt;sushant.prasai60@gmail.com&gt;</p>
            <p class="text-zinc-300"><span class="${c.hash} font-bold">Date:</span>   ${e.period}</p>
            <p class="text-zinc-300"><span class="${c.hash} font-bold">Location:</span> ${e.location}</p>
            <p class="mt-1.5 text-white font-bold">${e.role} @ ${e.org}</p>
        </div>

        <!-- Diff output -->
        <div class="mb-4">
            <p class="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-2">// diff --responsibilities</p>
            <ul class="space-y-2 text-[11px] font-mono bg-[#0a0e14] border border-zinc-800/60 rounded-lg p-3">
                ${bullets}
            </ul>
        </div>

        <!-- Tags -->
        <div>
            <p class="text-[10px] uppercase tracking-widest font-bold ${c.hash} mb-2">// stack / tools</p>
            <div class="flex flex-wrap gap-1.5">${tags}</div>
        </div>
    `;
}

function selectExp(id) {
    activeExpId = id;
    renderExpList();
    renderExpDetail(id);
}

window.selectExp = selectExp;