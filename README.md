# sushantprasai.com.np

> Personal portfolio built as an interactive terminal workspace — because a DevOps engineer's portfolio should feel like a DevOps engineer built it.

![favicon](favicon.svg)

---

## What it is

A fully client-side portfolio site themed as a Unix-like OS environment. No frameworks, no build step, no bundler. Eight workspaces slide horizontally like virtual desktops, each framed in its own DevOps metaphor (`neofetch`, `git log`, `kubectl describe`, etc.).

Live at **[sushantprasai.com.np](https://sushantprasai.com.np)**

---

## Structure

```
personal/
├── index.html              # All 8 workspace panels, Tailwind CDN
├── favicon.svg             # >_ terminal icon
├── resume.pdf              # Downloadable CV
├── projects.json           # Project data (edit here to add projects)
├── css/
│   └── style.css           # CRT overlay, glass card, scrollbar, typewriter
└── js/
    ├── main.js             # Navigation orchestrator — single source of truth
    ├── terminal.js         # Interactive shell, command registry, easter eggs
    ├── typewriter.js       # Login screen rotating headline engine
    ├── projects.js         # Fetches projects.json, renders master-detail panel
    ├── skills.js           # App-launcher grid with devicon logos + search/filter
    ├── experience.js       # git log style timeline with detail panel
    └── certifications.js   # kubectl-style table with expandable cert details
```

---

## Workspaces

| # | ID | Metaphor | Description |
|---|-----|----------|-------------|
| 0 | Login | SSH session | Boot sequence → typewriter headline → login |
| 1 | About | `neofetch` | System spec sheet with ASCII art header |
| 2 | Terminal | Bash shell | Fully interactive shell with command registry |
| 3 | Projects | `kubectl describe pod` | JSON-driven master-detail project viewer |
| 4 | Skills | Package registry | Filterable grid with devicon logos |
| 5 | Experience | `git log --oneline` | Timeline with commit-style detail view |
| 6 | Certifications | `kubectl get certificates` | Namespace-grouped cert table |
| 7 | Contacts | `cat /etc/contact-endpoints.conf` | Links, resume download |

---

## Navigation

| Method | Behaviour |
|--------|-----------|
| Mouse wheel | Scroll up/down between workspaces |
| Arrow keys / Page Up/Down | Keyboard navigation |
| Footer pip nav | Click any workspace label in the footer bar |
| Mobile swipe | Swipe up/down |
| Mobile PREV/NEXT buttons | Floating pill at bottom of screen (mobile only) |
| Terminal `go <page>` | e.g. `go projects`, `go skills` |
| Terminal `close session` | Returns to Login (the only way back) |

> Login (workspace 0) is intentionally unreachable via scroll or keyboard — only the terminal `close session` command returns to it.

---

## Terminal Commands

Type `help` in the terminal for the full list. Highlights:

```
help          — list all commands
about         — print summary
skills        — list tech stack
experience    — work history
projects      — project list
certs         — certifications
contact       — contact info
go <page>     — navigate to any workspace
whoami        — identity check
clear         — clear terminal
sudo          — try it
matrix        — try it
```

---

## Adding a Project

Edit `projects.json`. Each entry shape:

```json
{
  "id":          "unique-slug",
  "slug":        "svc/display-name",
  "title":       "Full Project Title",
  "status":      "PRODUCTION",
  "accentColor": "emerald",
  "summary":     "One-line card description",
  "description": "Full paragraph for detail panel",
  "tools":       ["Docker", "Terraform"],
  "role":        "Your role",
  "year":        "2025",
  "duration":    "3 months",
  "highlights":  ["Key achievement 1", "Key achievement 2"],
  "github":      "https://github.com/...",
  "live":        "https://...",
  "image":       "assets/images/preview.png"
}
```

`accentColor` accepts: `emerald` · `cyan` · `amber`

---

## Adding a Skill

Edit the `skillsData` array in `js/skills.js`:

```js
{ name: "ToolName", category: "CI/CD", icon: "devicon-name", level: "expert" }
```

`level` accepts: `expert` (emerald border) · `proficient` (cyan) · `familiar` (amber)

For tools not in [devicon](https://devicon.dev), add `iconType: "text"` — a monogram badge renders instead.

---

## Stack

- **HTML/CSS/JS** — zero framework, zero build step
- **Tailwind CSS** — via CDN (`@tailwindcss/browser@4`)
- **Fira Code** — monospace font via Google Fonts
- **Devicon** — tech stack icons via jsDelivr CDN
- **projects.json** — only runtime data fetch

---

## Local Development

No build step needed — just open `index.html` directly or serve with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node
npx serve .

# VS Code
# Live Server extension → right-click index.html → Open with Live Server
```

> `projects.json` is fetched via `fetch()` so you need a local server (not `file://`) for it to load correctly.

---

## Deployment

Drop the entire folder on any static host — Netlify, Vercel, GitHub Pages, Nginx, S3+CloudFront. No server-side logic, no environment variables.

```bash
# Nginx minimal config
server {
    listen 80;
    root /var/www/personal;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
```

---

## License

Personal portfolio — not open for reuse as a template. Feel free to draw inspiration.

---

*Built by [Sushant Prasai](https://sushantprasai.com.np) — DevOps & Cloud Infrastructure Engineer, Kathmandu, Nepal.*