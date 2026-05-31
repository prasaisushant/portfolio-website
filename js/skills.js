/**
 * Skills Page Engine
 * App-launcher style grid with devicon logos, category filters, and search.
 * Proficiency encoded via colored left border: emerald=Expert, cyan=Proficient, amber=Familiar
 *
 * icon field: devicon name (uses -original.svg then falls back to -plain.svg)
 * iconType: "devicon" (default) | "text" (for tools not in devicon — renders abbrev badge)
 */

const skillsData = [
    // ── CI/CD & Automation ─────────────────────────────────────────────────
    { name: "Jenkins",        category: "CI/CD",         icon: "jenkins",          level: "expert"     },
    { name: "GitHub Actions", category: "CI/CD",         icon: "githubactions",    level: "expert"     },
    { name: "Ansible",        category: "CI/CD",         icon: "ansible",          level: "expert"     },
    { name: "Terraform",      category: "CI/CD",         icon: "terraform",        level: "expert"     },
    { name: "ArgoCD",         category: "CI/CD",         icon: "argocd",           level: "proficient" },
    { name: "Git",            category: "CI/CD",         icon: "git",              level: "expert"     },

    // ── Cloud ──────────────────────────────────────────────────────────────
    { name: "AWS",            category: "Cloud",         icon: "amazonwebservices", iconVariant: "plain-wordmark", level: "expert"     },
    { name: "Azure",          category: "Cloud",         icon: "azure",            level: "proficient" },
    { name: "DigitalOcean",   category: "Cloud",         icon: "digitalocean",     level: "proficient" },
    { name: "Oracle Cloud",   category: "Cloud",         icon: "oracle",           level: "proficient" },
    { name: "VMware",         category: "Cloud",         icon: "vmware",           iconType: "text",   level: "proficient" },
    { name: "OpenStack",      category: "Cloud",         icon: "openstack",        level: "familiar"   },
    { name: "cPanel",         category: "Cloud",         icon: "cpanel",           iconType: "text",   level: "familiar"   },

    // ── Containers ────────────────────────────────────────────────────────
    { name: "Kubernetes",     category: "Containers",    icon: "kubernetes",       level: "expert"     },
    { name: "Docker",         category: "Containers",    icon: "docker",           level: "expert"     },
    { name: "Helm",           category: "Containers",    icon: "helm",             level: "proficient" },

    // ── Observability ─────────────────────────────────────────────────────
    { name: "Prometheus",     category: "Observability", icon: "prometheus",       level: "proficient" },
    { name: "Grafana",        category: "Observability", icon: "grafana",          level: "proficient" },
    { name: "Loki",           category: "Observability", icon: "loki",             iconType: "text",   level: "familiar"   },
    { name: "Zabbix",         category: "Observability", icon: "zabbix",           iconType: "text",   level: "proficient" },
    { name: "Cacti",          category: "Observability", icon: "cacti",            iconType: "text",   level: "familiar"   },
    { name: "CloudWatch",     category: "Observability", icon: "cloudwatch",       iconType: "text",   level: "proficient" },

    // ── Security ──────────────────────────────────────────────────────────
    { name: "Wazuh",          category: "Security",      icon: "wazuh",            iconType: "text",   level: "proficient" },
    { name: "Trivy",          category: "Security",      icon: "trivy",            iconType: "text",   level: "proficient" },
    { name: "CIS Hardening",  category: "Security",      icon: "linux",            level: "expert"     },
    { name: "Check Point",    category: "Security",      icon: "checkpoint",       iconType: "text",   level: "familiar"   },
    { name: "Fortinet",       category: "Security",      icon: "fortinet",         iconType: "text",   level: "familiar"   },
    { name: "OPNsense",       category: "Security",      icon: "opensense",        iconType: "text",   level: "familiar"   },

    // ── Languages ─────────────────────────────────────────────────────────
    { name: "Python",         category: "Languages",     icon: "python",           level: "proficient" },
    { name: "FastAPI",        category: "Languages",     icon: "fastapi",          level: "proficient" },
    { name: "JavaScript",     category: "Languages",     icon: "javascript",       level: "familiar"   },
    { name: "Go",             category: "Languages",     icon: "go",               level: "familiar"   },
    { name: "Bash",           category: "Languages",     icon: "bash",             level: "expert"     },

    // ── OS & Infra ────────────────────────────────────────────────────────
    { name: "Ubuntu",         category: "OS",            icon: "ubuntu",           level: "expert"     },
    { name: "RHEL",           category: "OS",            icon: "redhat",           level: "proficient" },
    { name: "Linux",          category: "OS",            icon: "linux",            level: "expert"     },
    { name: "Windows Server", category: "OS",            icon: "windows8",         level: "proficient" },

    // ── Networking & Web ──────────────────────────────────────────────────
    { name: "Nginx",          category: "Networking",    icon: "nginx",            level: "proficient" },
    { name: "Apache",         category: "Networking",    icon: "apache",           level: "proficient" },
    { name: "HAProxy",        category: "Networking",    icon: "haproxy",          iconType: "text",   level: "proficient" },
    { name: "TCP/IP",         category: "Networking",    icon: "tcpip",            iconType: "text",   level: "expert"     },
    {name: "traefik",         category: "Networking",    icon: "traefik",          level: "familiar"   },

    
];

// ── Level config ──────────────────────────────────────────────────────────────
const LEVEL = {
    expert:     { border: 'border-l-emerald-500', glow: 'hover:shadow-emerald-500/20' },
    proficient: { border: 'border-l-cyan-500',    glow: 'hover:shadow-cyan-500/20'    },
    familiar:   { border: 'border-l-amber-400',   glow: 'hover:shadow-amber-400/20'   },
};

// ── State ─────────────────────────────────────────────────────────────────────
let activeCategory = 'All';
let searchQuery    = '';

// ── Bootstrap ─────────────────────────────────────────────────────────────────
function initSkillsPage() {
    buildFilterPills();
    renderSkillsGrid();

    document.getElementById('skills-search').addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderSkillsGrid();
    });
}

// ── Filter pills ──────────────────────────────────────────────────────────────
function buildFilterPills() {
    const categories = ['All', ...new Set(skillsData.map(s => s.category))];
    const bar = document.getElementById('skills-filter-bar');
    if (!bar) return;

    bar.innerHTML = categories.map(cat => `
        <button
            data-cat="${cat}"
            onclick="setSkillCategory('${cat}')"
            class="skills-pill px-3 py-1.5 text-[10px] font-bold rounded border transition-all duration-150 font-mono whitespace-nowrap cursor-pointer
                   ${cat === 'All'
                     ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-400'
                     : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'}"
        >${cat}</button>
    `).join('');
}

function setSkillCategory(cat) {
    activeCategory = cat;
    document.querySelectorAll('.skills-pill').forEach(btn => {
        const isActive = btn.dataset.cat === cat;
        btn.className = btn.className
            .replace(/bg-emerald-500\/15|border-emerald-500\/50|text-emerald-400|bg-zinc-900|border-zinc-800|text-zinc-500|hover:border-zinc-600|hover:text-zinc-300/g, '')
            .trim();
        btn.classList.add(
            ...(isActive
                ? ['bg-emerald-500/15', 'border-emerald-500/50', 'text-emerald-400']
                : ['bg-zinc-900', 'border-zinc-800', 'text-zinc-500', 'hover:border-zinc-600', 'hover:text-zinc-300'])
        );
    });
    renderSkillsGrid();
}

// ── Icon HTML builder ─────────────────────────────────────────────────────────
function buildIconHTML(s) {
    if (s.iconType === 'text') {
        // Text badge for tools not in devicon
        const abbrev = s.name.replace(/[^A-Z0-9]/g, '') || s.name.slice(0, 3).toUpperCase();
        const initials = abbrev.length > 4 ? abbrev.slice(0, 4) : abbrev;
        return `<div class="w-8 h-8 flex items-center justify-center rounded bg-zinc-800 border border-zinc-700 text-[9px] font-bold text-zinc-300 font-mono leading-tight text-center select-none">${initials}</div>`;
    }

    const variant  = s.iconVariant || 'original';
    const fallback = 'plain';
    const base     = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${s.icon}`;

    return `<img
        src="${base}/${s.icon}-${variant}.svg"
        onerror="this.src='${base}/${s.icon}-${fallback}.svg'; this.onerror=function(){this.style.display='none'; this.nextElementSibling.style.display='flex'};"
        alt="${s.name}"
        class="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
        loading="lazy"
    ><div style="display:none" class="w-8 h-8 items-center justify-center rounded bg-zinc-800 border border-zinc-700 text-[9px] font-bold text-zinc-300 font-mono">${s.name.slice(0,4)}</div>`;
}

// ── Grid render ───────────────────────────────────────────────────────────────
function renderSkillsGrid() {
    const container = document.querySelector('#skills-grid .grid');
    if (!container) return;

    const filtered = skillsData.filter(s => {
        const matchCat    = activeCategory === 'All' || s.category === activeCategory;
        const matchSearch = !searchQuery || s.name.toLowerCase().includes(searchQuery) || s.category.toLowerCase().includes(searchQuery);
        return matchCat && matchSearch;
    });

    const countEl = document.getElementById('skills-count');
    if (countEl) countEl.textContent = `${filtered.length} / ${skillsData.length} modules loaded`;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <span class="text-zinc-600 text-xs font-mono">[NULL] No modules match query: "${searchQuery}"</span>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map(s => {
        const lv = LEVEL[s.level] || LEVEL.familiar;
        return `
            <div class="group relative bg-[#0d131a] border border-zinc-800/80 border-l-2 ${lv.border}
                        rounded-lg p-3 flex flex-col items-center gap-2 cursor-default
                        hover:border-zinc-700 hover:bg-[#111820] transition-all duration-200
                        hover:shadow-lg ${lv.glow}">
                ${buildIconHTML(s)}
                <span class="text-zinc-300 text-[10px] font-bold font-mono text-center leading-tight group-hover:text-white transition-colors">${s.name}</span>
                <span class="text-[9px] text-zinc-600 font-mono">${s.category}</span>
            </div>
        `;
    }).join('');
}

window.setSkillCategory = setSkillCategory;