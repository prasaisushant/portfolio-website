/**
 * Skills Page Engine
 * App-launcher style grid with devicon logos, category filters, and search.
 * Proficiency encoded via colored left border: emerald=Expert, cyan=Proficient, amber=Familiar
 */

const skillsData = [
    // ── CI/CD & Automation ─────────────────────────────────────────────────
    { name: "Jenkins",        category: "CI/CD",       icon: "jenkins",        level: "expert"     },
    { name: "GitHub Actions", category: "CI/CD",       icon: "githubactions",  level: "expert"     },
    { name: "Ansible",        category: "CI/CD",       icon: "ansible",        level: "expert"     },
    { name: "Terraform",      category: "CI/CD",       icon: "terraform",      level: "expert"     },
    { name: "Bash",           category: "CI/CD",       icon: "bash",           level: "expert"     },
    { name: "ArgoCD",         category: "CI/CD",       icon: "argocd",         level: "proficient" },

    // ── Cloud ──────────────────────────────────────────────────────────────
    { name: "AWS",            category: "Cloud",       icon: "amazonwebservices", level: "expert"  },
    { name: "Azure",          category: "Cloud",       icon: "azure",          level: "proficient" },
    { name: "DigitalOcean",   category: "Cloud",       icon: "digitalocean",   level: "proficient" },
    { name: "Oracle Cloud",   category: "Cloud",       icon: "oracle",         level: "proficient" },
    { name: "VMware",         category: "Cloud",       icon: "vmware",         level: "proficient" },

    // ── Containers ────────────────────────────────────────────────────────
    { name: "Kubernetes",     category: "Containers",  icon: "kubernetes",     level: "expert"     },
    { name: "Docker",         category: "Containers",  icon: "docker",         level: "expert"     },
    { name: "Helm",           category: "Containers",  icon: "helm",           level: "proficient" },

    // ── Observability ─────────────────────────────────────────────────────
    { name: "Prometheus",     category: "Observability", icon: "prometheus",   level: "proficient" },
    { name: "Grafana",        category: "Observability", icon: "grafana",      level: "proficient" },
    { name: "Loki",           category: "Observability", icon: "grafana",      level: "familiar"   },

    // ── Security ──────────────────────────────────────────────────────────
    { name: "Wazuh",          category: "Security",    icon: "linux",          level: "proficient" },
    { name: "Trivy",          category: "Security",    icon: "aqua",           level: "proficient" },
    { name: "pfSense",        category: "Security",    icon: "freebsd",        level: "familiar"   },

    // ── Languages ─────────────────────────────────────────────────────────
    { name: "Python",         category: "Languages",   icon: "python",         level: "proficient" },
    { name: "FastAPI",        category: "Languages",   icon: "fastapi",        level: "proficient" },
    { name: "JavaScript",     category: "Languages",   icon: "javascript",     level: "familiar"   },

    // ── OS & Storage ──────────────────────────────────────────────────────
    { name: "Ubuntu",         category: "OS",          icon: "ubuntu",         level: "expert"     },
    { name: "RHEL",           category: "OS",          icon: "redhat",         level: "proficient" },
    { name: "Linux",          category: "OS",          icon: "linux",          level: "expert"     },
    { name: "Nginx",          category: "OS",          icon: "nginx",          level: "proficient" },
    { name: "Git",            category: "OS",          icon: "git",            level: "expert"     },
];

// ── Level config ──────────────────────────────────────────────────────────────
const LEVEL = {
    expert:     { border: 'border-l-emerald-500', glow: 'hover:shadow-emerald-500/20', dot: 'bg-emerald-500' },
    proficient: { border: 'border-l-cyan-500',    glow: 'hover:shadow-cyan-500/20',    dot: 'bg-cyan-500'    },
    familiar:   { border: 'border-l-amber-400',   glow: 'hover:shadow-amber-400/20',   dot: 'bg-amber-400'   },
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
            <div class="col-span-full flex flex-col items-center justify-center py-16 text-center space-y-2 opacity-40">
                <span class="text-zinc-600 text-xs font-mono">[NULL] No modules match query: "${searchQuery}"</span>
            </div>`;
        return;
    }

    container.innerHTML = filtered.map(s => {
        const lv = LEVEL[s.level] || LEVEL.familiar;
        // devicon uses plain name for most, "plain" or "original" colored variants
        const iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${s.icon}/${s.icon}-original.svg`;
        const iconFallback = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${s.icon}/${s.icon}-plain.svg`;

        return `
            <div class="group relative bg-[#0d131a] border border-zinc-800/80 border-l-2 ${lv.border}
                        rounded-lg p-3 flex flex-col items-center gap-2 cursor-default
                        hover:border-zinc-700 hover:bg-[#111820] transition-all duration-200
                        hover:shadow-lg ${lv.glow}">
                <img
                    src="${iconUrl}"
                    onerror="this.src='${iconFallback}'; this.onerror=null;"
                    alt="${s.name}"
                    class="w-8 h-8 object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-200"
                    loading="lazy"
                >
                <span class="text-zinc-300 text-[10px] font-bold font-mono text-center leading-tight group-hover:text-white transition-colors">${s.name}</span>
                <span class="text-[9px] text-zinc-600 font-mono">${s.category}</span>
            </div>
        `;
    }).join('');
}

window.setSkillCategory = setSkillCategory;