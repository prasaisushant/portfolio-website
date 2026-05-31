
/**
 * Projects Page Engine
 * Fetches projects.json, renders the left card list dynamically,
 * and populates the right detail panel on card click.
 */

// ─── Color maps for the accent/status theme per project ──────────────────────
const COLOR = {
    emerald: {
        border:      'hover:border-emerald-500/40',
        accent:      'bg-emerald-500',
        titleHover:  'group-hover:text-emerald-400',
        statusBg:    'bg-emerald-950/80',
        statusText:  'text-emerald-400',
        statusBorder:'border-emerald-800/60',
        activeBorder:'border-emerald-500/70',
        tag:         'text-emerald-400',
        linkBg:      'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        highlight:   'text-emerald-400',
    },
    cyan: {
        border:      'hover:border-cyan-500/40',
        accent:      'bg-cyan-500',
        titleHover:  'group-hover:text-cyan-400',
        statusBg:    'bg-cyan-950/80',
        statusText:  'text-cyan-400',
        statusBorder:'border-cyan-800/60',
        activeBorder:'border-cyan-500/70',
        tag:         'text-cyan-400',
        linkBg:      'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
        highlight:   'text-cyan-400',
    },
    amber: {
        border:      'hover:border-amber-400/40',
        accent:      'bg-amber-400',
        titleHover:  'group-hover:text-amber-400',
        statusBg:    'bg-amber-950/80',
        statusText:  'text-amber-400',
        statusBorder:'border-amber-800/60',
        activeBorder:'border-amber-400/70',
        tag:         'text-amber-400',
        linkBg:      'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30',
        highlight:   'text-amber-400',
    },
};

let projectsData   = [];
let activeProjectId = null;

// ─── Bootstrap ────────────────────────────────────────────────────────────────
async function initProjectsPage() {
    try {
        const res  = await fetch('projects.json');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        projectsData = await res.json();
        renderProjectCards();
        if (projectsData.length > 0) selectProject(projectsData[0].id);
    } catch (err) {
        console.error('Failed to load projects.json:', err);
        document.getElementById('project-card-list').innerHTML =
            `<p class="text-red-400 text-xs font-mono p-4">[ERROR] Could not load projects.json: ${err.message}</p>`;
    }
}

// ─── Left panel — card list ───────────────────────────────────────────────────
function renderProjectCards() {
    const list = document.getElementById('project-card-list');
    if (!list) return;
    list.innerHTML = '';

    projectsData.forEach(p => {
        const c = COLOR[p.accentColor] || COLOR.emerald;
        const card = document.createElement('div');
        card.id = `project-card-${p.id}`;
        card.className = [
            'group p-4 bg-[#0d131a] border border-zinc-800/80',
            c.border,
            'rounded-lg transition-all duration-200 cursor-pointer relative overflow-hidden'
        ].join(' ');

        card.innerHTML = `
            <div class="absolute top-0 left-0 w-1 h-full ${c.accent}"></div>
            <div class="flex justify-between items-start mb-1.5">
                <h4 class="text-white font-bold tracking-wide ${c.titleHover} transition-colors text-xs md:text-sm">${p.slug}</h4>
                <span class="px-2 py-0.5 text-[10px] rounded font-bold ${c.statusBg} ${c.statusText} border ${c.statusBorder} whitespace-nowrap ml-2">${p.status}</span>
            </div>
            <p class="text-zinc-400 text-xs leading-relaxed mb-2.5">${p.summary}</p>
            <div class="flex flex-wrap gap-1.5 text-[11px]">
                ${p.tools.slice(0, 4).map(t => `<span class="bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-zinc-400 rounded">${t}</span>`).join('')}
                ${p.tools.length > 4 ? `<span class="bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-zinc-500 rounded">+${p.tools.length - 4} more</span>` : ''}
            </div>
        `;

        card.addEventListener('click', () => selectProject(p.id));
        list.appendChild(card);
    });
}

// ─── Right panel — detail view ────────────────────────────────────────────────
function selectProject(id) {
    const p = projectsData.find(x => x.id === id);
    if (!p) return;

    activeProjectId = id;
    const c = COLOR[p.accentColor] || COLOR.emerald;

    // Highlight the active card on the left
    projectsData.forEach(x => {
        const card = document.getElementById(`project-card-${x.id}`);
        if (!card) return;
        const xc = COLOR[x.accentColor] || COLOR.emerald;
        // Reset to default border
        card.className = card.className
            .replace(/border-\S+\/\d+\s*/g, '')
            .trim();
        card.classList.add('border', 'border-zinc-800/80');
        if (x.id === id) {
            card.classList.remove('border-zinc-800/80');
            card.classList.add(xc.activeBorder);
        }
    });

    // Build detail panel content
    const panel = document.getElementById('project-detail-panel');
    if (!panel) return;

    const highlightItems = p.highlights.map(h =>
        `<li class="flex items-start gap-2">
            <span class="${c.highlight} font-bold shrink-0">▸</span>
            <span>${h}</span>
         </li>`
    ).join('');

    const allTools = p.tools.map(t =>
        `<span class="bg-zinc-900 border border-zinc-800 px-2 py-0.5 text-zinc-300 rounded text-[11px]">${t}</span>`
    ).join('');

    const imageBlock = p.image
        ? `<div class="mb-3 rounded overflow-hidden border border-zinc-800/60">
               <img src="${p.image}" alt="${p.title} screenshot" class="w-full object-cover max-h-36">
           </div>`
        : `<div class="mb-3 rounded border border-zinc-800/60 bg-[#0a0e14] h-24 flex items-center justify-center">
               <span class="text-zinc-700 text-[10px] font-mono">// no screenshot attached</span>
           </div>`;

    const githubBtn = p.github
        ? `<a href="${p.github}" target="_blank" rel="noopener"
               class="flex-1 flex items-center justify-center gap-1.5 py-2 ${c.linkBg} border rounded font-bold transition-all text-center text-[11px]">
               <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.4.6.1.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
               GitHub
           </a>`
        : '';

    const liveBtn = p.live
        ? `<a href="${p.live}" target="_blank" rel="noopener"
               class="flex-1 flex items-center justify-center gap-1.5 py-2 bg-zinc-800/60 hover:bg-zinc-700/60 text-zinc-300 border border-zinc-700 rounded font-bold transition-all text-center text-[11px]">
               <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
               Live
           </a>`
        : '';

    panel.innerHTML = `
        <div class="flex items-center gap-2 border-b border-zinc-900 pb-2.5 mb-3">
            <span class="w-2 h-2 rounded-full ${c.accent} animate-pulse shrink-0"></span>
            <span class="font-bold tracking-widest text-[10px] uppercase text-zinc-400">kubectl describe pod</span>
        </div>

        ${imageBlock}

        <div class="space-y-0.5 mb-3 text-[11px]">
            <p class="text-zinc-300"><span class="${c.highlight} font-bold">Name:</span> ${p.title}</p>
            <p class="text-zinc-300"><span class="${c.highlight} font-bold">Role:</span> ${p.role}</p>
            <p class="text-zinc-300"><span class="${c.highlight} font-bold">Year:</span> ${p.year} 
            <p class="text-zinc-300"><span class="${c.highlight} font-bold">Status:</span> <span class="${c.statusText} font-bold">${p.status}</span></p>
        </div>

        <div class="mb-3 bg-[#090d13]/50 p-2.5 border border-zinc-900 rounded text-[11px] leading-relaxed text-zinc-400">
            ${p.description}
        </div>

        <div class="mb-3">
            <p class="${c.highlight} font-bold text-[10px] uppercase tracking-widest mb-1.5">Key Highlights</p>
            <ul class="space-y-1 text-zinc-400 text-[11px] leading-relaxed">
                ${highlightItems}
            </ul>
        </div>

        <div class="mb-3">
            <p class="${c.highlight} font-bold text-[10px] uppercase tracking-widest mb-1.5">Stack</p>
            <div class="flex flex-wrap gap-1.5">${allTools}</div>
        </div>

        ${(githubBtn || liveBtn) ? `
        <div class="pt-2 border-t border-zinc-900 flex gap-2">
            ${githubBtn}
            ${liveBtn}
        </div>` : ''}
    `;
}

// ─── Entry point — called after DOM is ready ──────────────────────────────────
// initProjectsPage() is called from main.js DOMContentLoaded