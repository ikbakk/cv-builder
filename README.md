# CV Builder

A browser-based resume builder with a dark landing page at `/` and a matching dark editor at `/editor`. It compiles your CV to PDF using **Typst** on your local machine. Edit your resume in a structured form, pick a template, and generate a professionally typeset PDF.

> **No data leaves your device.** The Typst compiler runs locally via the system `typst` CLI. Everything stays in your browser and your machine.

---

## Features

- **Structured form editor** — profile, summary, experience, skills, education, and additional info
- **PDF preview** — generate a PDF and review the result in an `<iframe>`
- **Multiple templates** — ATS-friendly and Professional layouts included
- **Custom templates** — upload your own `.typ` files
- **Auto‑save** — all data persisted in IndexedDB (survives page refresh)
- **Smart output naming** — PDFs are named `{Name}_Resume_{Template}.pdf`
- **Keyboard‑friendly** — all form fields are tabbable

---

## Prerequisites

- [Node.js](https://nodejs.org/) ≥ 22
- [Typst](https://typst.app/) CLI installed locally

```bash
# Fedora
sudo dnf install typst

# Arch / CachyOS
sudo pacman -S typst

# macOS
brew install typst

# Windows (via winget)
winget install Typst.Typst
```

Verify both are available:

```bash
node --version   # ≥ 22
typst --version  # ≥ 0.12
```

---

## Getting Started

```bash
# Clone
git clone https://github.com/OWNER/cv-builder.git
cd cv-builder

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open **http://localhost:5173** for the landing page, then choose **Create my CV** to open the editor at **http://localhost:5173/editor**. You can also open `/editor` directly.

---

## Usage

1. **Edit your data** — fill in the form on the left panel. Changes auto‑save.
2. **Choose a template** — pick "ATS Friendly" or "Professional" from the dropdown, or upload your own `.typ` file.
3. **Generate PDF** — click the "Generate PDF" button. The PDF opens in the preview pane and downloads automatically.

### Custom Templates

Upload your own Typst template by clicking the **Upload** button next to the template selector. Your template receives the following data variables automatically:

| Variable | Type | Description |
|----------|------|-------------|
| `profile` | dictionary | `name`, `headline`, `location`, `email`, `phone`, `portfolio`, `github`, `linkedin` |
| `summary` | string | Professional summary paragraph |
| `experiences` | array | Each entry: `title`, `company`, `period`, `tech`, `intro`, `bullets` |
| `skills` | array | Pairs of `(category, skills)` |
| `education` | dictionary | `degree`, `institution`, `location`, `period` |
| `additional` | array | Bullet points of additional info |

Shared layout helpers (defined in `public/templates/components.typ`) are also available: `rule()`, `section(title, body)`, `header(profile)`, `role(exp)`, and `skills-block(skills)`.

---

## Project Structure

```
src/
├── domain/              ← Core types and default data
│   ├── types.ts
│   └── defaults.ts
├── application/         ← Business logic
│   ├── store.ts         ← Zustand state management
│   └── services/
│       ├── template-engine.ts   ← ResumeData → .typ source
│       └── compiler.ts          ← Compilation API client
├── infrastructure/
│   └── storage.ts       ← IndexedDB persistence via localforage
├── components/
│   ├── atoms/           ← Button, Input, Textarea, Select, Label, IconButton
│   ├── molecules/       ← FormField, BulletList, EntryCard
│   └── organisms/       ← ProfileSection, SummarySection, PreviewPanel, …
├── pages/
│   ├── LandingPage.tsx  ← Landing route at /
│   └── EditorPage.tsx   ← Two‑panel editor at /editor
├── App.tsx              ← Route selection
├── main.tsx
├── index.css            ← Tailwind CSS + shared dark theme tokens
└── landing.css          ← Scoped landing design system

design/
├── DESIGN.md            ← Selected landing design language
└── directions.html      ← Three design examples

public/
└── templates/
    ├── ats.typ
    ├── professional.typ
    └── components.typ    ← Shared layout helpers

vite.config.ts            ← Vite + /api/compile middleware (local typst CLI)
```

---

## Architecture

```
┌──────────────┐     POST /api/compile      ┌──────────────────┐
│  React SPA   │  ────────────────────────▶  │  Vite Dev Server │
│  / landing   │                              │  ┌────────────┐  │
│  /editor app │  ◀────────────────────────   │  │ typst CLI  │  │
└──────────────┘       PDF bytes             │  └────────────┘  │
                                              └──────────────────┘
       │                                               │
       ▼                                               ▼
  IndexedDB                                      Temp files
  (localforage)                                 (cleaned up)
```

### Layers

| Layer | Technology | Responsibility |
|-------|-----------|---------------|
| **Presentation** | React 19 + Tailwind CSS v4 | Form UI, preview, user interaction |
| **Application** | Zustand (store) + Services (template engine, compiler client) | State management, data → Typst conversion, compilation orchestration |
| **Domain** | TypeScript types | Resume data model, editor status |
| **Infrastructure** | IndexedDB via localforage | Persistent storage (resume data, templates) |

### Compilation

1. Form state is converted to a Typst source string by the **template engine**
2. Source is POSTed to the Vite dev server's `/api/compile` middleware
3. The middleware writes source to a temp file and runs `typst compile`
4. The resulting PDF bytes are returned to the browser
5. The browser displays the PDF in an iframe and triggers a download

In production, the app is designed to be deployed as a static site with a small backend that provides the compile endpoint, or to fall back to client‑side WASM compilation.

---

## Build

```bash
npm run build    # TypeScript check + Vite production build
npm run preview  # Preview the production build locally
```

Output goes to `dist/`.

When hosting the build, serve `/` from `index.html` and rewrite `/editor` to the same file so direct editor links work. PDF generation also needs a local `/api/compile` endpoint backed by Typst; `npm run preview` checks the built UI but does not provide that endpoint.

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Vite 6](https://vite.dev/) | Build tool and dev server |
| [React 19](https://react.dev/) | UI framework |
| [TypeScript 5.7](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [Zustand](https://github.com/pmndrs/zustand) | State management |
| [localforage](https://localforage.github.io/localForage/) | IndexedDB wrapper |
| [Typst](https://typst.app/) | PDF typesetting engine |
| [GitHub CLI](https://cli.github.com/) | Repository management |

---

## License

MIT
