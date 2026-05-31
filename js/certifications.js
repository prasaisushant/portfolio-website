/**
 * Certifications Page Engine
 * kubectl get certificates style table with provider icons,
 * status badges, and verify links.
 */

const certsData = [
    // ── AWS ───────────────────────────────────────────────────────────────
    {
        id:        "saa-c03",
        namespace: "aws",
        name:      "Solutions Architect – Associate",
        code:      "SAA-C03",
        issuer:    "Amazon",
        status:    "VALID",
        year:      "2024",
        icon:      "amazonwebservices",
        iconVariant: "plain-wordmark",
        link:      "https://cp.certmetrics.com/amazon/en/public/verify/credential/6e0b2671dfa2420f9262e4334d04c170"
    },

    // ── Microsoft ─────────────────────────────────────────────────────────
    {
        id:        "az-204",
        namespace: "microsoft",
        name:      "Azure Developer Associate",
        code:      "AZ-204",
        issuer:    "Microsoft",
        status:    "VALID",
        year:      "2024",
        icon:      "azure",
        link:      "https://learn.microsoft.com/en-us/users/sushantprasai-3651/credentials/9d9afd8aa70c32e8"
    },
    {
        id:        "az-900",
        namespace: "microsoft",
        name:      "Azure Fundamentals",
        code:      "AZ-900",
        issuer:    "Microsoft",
        status:    "VALID",
        year:      "2023",
        icon:      "azure",
        link:      "https://learn.microsoft.com/api/credentials/share/en-us/Sushantprasai-3651/44F9FE0EAA67244C"
    },
    {
        id:        "sc-900",
        namespace: "microsoft",
        name:      "Security, Compliance & Identity Fundamentals",
        code:      "SC-900",
        issuer:    "Microsoft",
        status:    "VALID",
        year:      "2023",
        icon:      "azure",
        link:      "https://learn.microsoft.com/en-us/users/Sushantprasai-3651/credentials/BC0323D75196DF65"
    },

    // ── Oracle ────────────────────────────────────────────────────────────
    {
        id:        "oci-devops-pro",
        namespace: "oracle",
        name:      "OCI DevOps Professional",
        code:      "OCI-2025",
        issuer:    "Oracle",
        status:    "VALID",
        year:      "2025",
        icon:      "oracle",
        link:      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=3E31F653D8FA3427F3939AD755E5FB2D5DEA992CB85F645FA7484B721D07D5EF"
    },
    {
        id:        "oci-foundations",
        namespace: "oracle",
        name:      "OCI Foundations Associate",
        code:      "OCI-2025",
        issuer:    "Oracle",
        status:    "VALID",
        year:      "2025",
        icon:      "oracle",
        link:      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=20EEF178F6ED49A6EF85DC6B0649F7AE4322C7A6E19A6CABF4D456680ADDBDFA"
    },
    {
        id:        "oci-ai-foundations",
        namespace: "oracle",
        name:      "OCI AI Foundations Associate",
        code:      "OCI-2025",
        issuer:    "Oracle",
        status:    "VALID",
        year:      "2025",
        icon:      "oracle",
        link:      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=BAF65F5F352C0BD225D05146BBE8CDF9B549B8A771F6E3FCACEDC13D5705AC1C"
    },
    {
        id:        "oracle-data-platform",
        namespace: "oracle",
        name:      "Data Platform Foundations Associate",
        code:      "OCI-2025",
        issuer:    "Oracle",
        status:    "VALID",
        year:      "2025",
        icon:      "oracle",
        link:      "https://catalog-education.oracle.com/ords/certview/sharebadge?id=3E31F653D8FA3427F3939AD755E5FB2DB3270874231645900BB8230B060C1045"
    },

    // ── Aviatrix ──────────────────────────────────────────────────────────
    {
        id:        "aviatrix-ace",
        namespace: "aviatrix",
        name:      "ACE Associate (MCNA)",
        code:      "ACE",
        issuer:    "Aviatrix",
        status:    "VALID",
        year:      "2024",
        icon:      "aviatrix",
        iconType:  "text",
        link:      "https://www.credly.com/badges/1b164008-6825-477e-9f7d-d7f637c9bd59/linked_in_profile"
    },

    // ── cPanel ────────────────────────────────────────────────────────────
    {
        id:        "cpanel-pro",
        namespace: "cpanel",
        name:      "cPanel Professional Certification",
        code:      "CPP",
        issuer:    "cPanel",
        status:    "VALID",
        year:      "2023",
        icon:      "cpanel",
        iconType:  "text",
        link:      "https://university.cpanel.net/certificate/21b2a178-e5b7-4743-92cd-34d883ea39ae/"
    },
    {
        id:        "cpanel-admin",
        namespace: "cpanel",
        name:      "cPanel & WHM Administrator",
        code:      "CWA",
        issuer:    "cPanel",
        status:    "VALID",
        year:      "2023",
        icon:      "cpanel",
        iconType:  "text",
        link:      "https://university.cpanel.net/certificate/c447885c-9ffe-4b5a-a5fb-d673dd484814/"
    },

    // ── KodeKloud ─────────────────────────────────────────────────────────
    {
        id:        "kk-docker",
        namespace: "kodekloud",
        name:      "Engineer – Docker (Level 1)",
        code:      "KKE",
        issuer:    "KodeKloud",
        status:    "VALID",
        year:      "2023",
        icon:      "docker",
        link:      "https://engineer.kodekloud.com/certificate-verification/307b85e6-e813-4adb-b4a6-51a3997338fb"
    },
    {
        id:        "kk-git",
        namespace: "kodekloud",
        name:      "Engineer – Git (Level 1)",
        code:      "KKE",
        issuer:    "KodeKloud",
        status:    "VALID",
        year:      "2023",
        icon:      "git",
        link:      "https://engineer.kodekloud.com/certificate-verification/713b7e4e-a550-47d3-bb09-4ba8fcea984e"
    },
    {
        id:        "kk-jenkins",
        namespace: "kodekloud",
        name:      "Engineer – Jenkins (Level 1)",
        code:      "KKE",
        issuer:    "KodeKloud",
        status:    "VALID",
        year:      "2023",
        icon:      "jenkins",
        link:      "https://engineer.kodekloud.com/certificate-verification/0ca82960-3292-4812-a4a5-5009c7ca244f"
    },
    {
        id:        "kk-linux",
        namespace: "kodekloud",
        name:      "Engineer – Linux (Level 1)",
        code:      "KKE",
        issuer:    "KodeKloud",
        status:    "VALID",
        year:      "2023",
        icon:      "linux",
        link:      "https://engineer.kodekloud.com/certificate-verification/e029a9f3-ad14-40e2-aae8-52ef8ebb81a3"
    },
];

// ── Namespace accent colors ───────────────────────────────────────────────────
const NS_COLOR = {
    aws:       { text: 'text-amber-400',  bg: 'bg-amber-950/80',  border: 'border-amber-800/60',  row: 'hover:border-l-amber-400'  },
    microsoft: { text: 'text-blue-400',   bg: 'bg-blue-950/80',   border: 'border-blue-800/60',   row: 'hover:border-l-blue-400'   },
    oracle:    { text: 'text-red-400',    bg: 'bg-red-950/80',    border: 'border-red-800/60',    row: 'hover:border-l-red-400'    },
    aviatrix:  { text: 'text-emerald-400',bg: 'bg-emerald-950/80',border: 'border-emerald-800/60',row: 'hover:border-l-emerald-400'},
    cpanel:    { text: 'text-orange-400', bg: 'bg-orange-950/80', border: 'border-orange-800/60', row: 'hover:border-l-orange-400' },
    kodekloud: { text: 'text-purple-400', bg: 'bg-purple-950/80', border: 'border-purple-800/60', row: 'hover:border-l-purple-400' },
};

let expandedCertId = null;

// ── Bootstrap ─────────────────────────────────────────────────────────────────
function initCertificationsPage() {
    renderCertsTable();
}

// ── Icon builder (reuses same pattern as skills.js) ───────────────────────────
function buildCertIconHTML(cert) {
    if (cert.iconType === 'text') {
        const initials = cert.issuer.slice(0, 3).toUpperCase();
        return `<div class="w-6 h-6 flex items-center justify-center rounded bg-zinc-800 border border-zinc-700 text-[8px] font-bold text-zinc-300 font-mono shrink-0">${initials}</div>`;
    }
    const variant  = cert.iconVariant || 'original';
    const base     = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${cert.icon}`;
    return `<img
        src="${base}/${cert.icon}-${variant}.svg"
        onerror="this.src='${base}/${cert.icon}-plain.svg'; this.onerror=function(){this.style.display='none';this.nextElementSibling.style.display='flex'};"
        alt="${cert.issuer}"
        class="w-6 h-6 object-contain shrink-0"
    ><div style="display:none" class="w-6 h-6 items-center justify-center rounded bg-zinc-800 border border-zinc-700 text-[8px] font-bold text-zinc-300 font-mono shrink-0">${cert.issuer.slice(0,3)}</div>`;
}

// ── Table render ──────────────────────────────────────────────────────────────
function renderCertsTable() {
    const tbody = document.getElementById('certs-tbody');
    if (!tbody) return;

    tbody.innerHTML = certsData.map(cert => {
        const ns  = NS_COLOR[cert.namespace] || NS_COLOR.aws;
        const isExpanded = expandedCertId === cert.id;

        return `
        <tr id="cert-row-${cert.id}"
            class="cert-row border-b border-zinc-900 border-l-2 border-l-transparent ${ns.row}
                   transition-all duration-200 cursor-pointer group"
            onclick="toggleCertRow('${cert.id}')">

            <td class="py-3 pl-4 pr-3 whitespace-nowrap">
                <div class="flex items-center gap-2">
                    ${buildCertIconHTML(cert)}
                    <span class="${ns.text} font-bold text-[11px] font-mono">${cert.namespace}/</span>
                </div>
            </td>

            <td class="py-3 px-3">
                <div class="flex flex-col gap-0.5">
                    <span class="text-white text-xs font-bold font-mono group-hover:text-emerald-300 transition-colors">${cert.name}</span>
                    <span class="text-zinc-600 text-[10px] font-mono">${cert.code}</span>
                </div>
            </td>

            <td class="py-3 px-3 whitespace-nowrap hidden md:table-cell">
                <span class="text-zinc-400 text-[11px] font-mono">${cert.issuer}</span>
            </td>

            <td class="py-3 px-3 whitespace-nowrap">
                <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold font-mono
                             bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
                    ${cert.status}
                </span>
            </td>

            <td class="py-3 px-3 whitespace-nowrap hidden sm:table-cell">
                <span class="text-zinc-500 text-[11px] font-mono">${cert.year}</span>
            </td>

            <td class="py-3 pl-3 pr-4 whitespace-nowrap">
                <a href="${cert.link}" target="_blank" rel="noopener"
                   onclick="event.stopPropagation()"
                   class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-bold font-mono
                          ${ns.bg} ${ns.text} ${ns.border}
                          hover:brightness-125 transition-all duration-150">
                    <svg class="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                    VERIFY
                </a>
            </td>
        </tr>

        <tr id="cert-expand-${cert.id}" class="${isExpanded ? '' : 'hidden'}">
            <td colspan="6" class="px-4 pb-3 pt-0">
                <div class="bg-[#090d13] border border-zinc-800/60 rounded-lg p-4 font-mono text-xs space-y-1.5 border-l-2 ${ns.row.replace('hover:', '')}">
                    <p class="text-zinc-500 text-[10px] uppercase tracking-widest mb-2">// kubectl describe certificate ${cert.id}</p>
                    <p class="text-zinc-300"><span class="${ns.text} font-bold">Name:</span> ${cert.name}</p>
                    <p class="text-zinc-300"><span class="${ns.text} font-bold">Issuer:</span> ${cert.issuer}</p>
                    <p class="text-zinc-300"><span class="${ns.text} font-bold">Code:</span> ${cert.code}</p>
                    <p class="text-zinc-300"><span class="${ns.text} font-bold">Year:</span> ${cert.year}</p>
                    <p class="text-zinc-300"><span class="${ns.text} font-bold">Status:</span> <span class="text-emerald-400 font-bold">${cert.status}</span></p>
                    <p class="text-zinc-300 break-all"><span class="${ns.text} font-bold">Verify-URL:</span> <a href="${cert.link}" target="_blank" rel="noopener" class="underline text-zinc-400 hover:text-white transition-colors">${cert.link}</a></p>
                </div>
            </td>
        </tr>
        `;
    }).join('');

    updateCertCount();
}

function toggleCertRow(id) {
    const expandEl = document.getElementById(`cert-expand-${id}`);
    if (!expandEl) return;

    if (expandedCertId === id) {
        expandEl.classList.add('hidden');
        expandedCertId = null;
    } else {
        if (expandedCertId) {
            const prev = document.getElementById(`cert-expand-${expandedCertId}`);
            if (prev) prev.classList.add('hidden');
        }
        expandEl.classList.remove('hidden');
        expandedCertId = id;
    }
}

function updateCertCount() {
    const el = document.getElementById('certs-count');
    if (el) el.textContent = `${certsData.length} certificates • ${[...new Set(certsData.map(c => c.namespace))].length} issuers`;
}

window.toggleCertRow = toggleCertRow;