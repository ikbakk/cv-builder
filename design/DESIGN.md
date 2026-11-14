# CV Builder landing design language

The selected direction is **Guided Start**. The landing page welcomes someone who needs a clear CV quickly, then shows the actual sequence: enter details, choose a template, generate a PDF. The editor remains a separate working surface at `/editor`.

## Visual system

| Role | Value | Use |
| --- | --- | --- |
| Night | `#11141d` | Landing and editor ground |
| Raised surface | `#1c2030` | Editor controls and supporting panels |
| Border | `#394054` | Dividers and form outlines |
| Text | `#f3f1f8` | Main copy and labels |
| Muted text | `#b9bbcf` | Supporting copy |
| Lavender | `#c4b4f4` | Actions, links, and emphasis |
| Deep aubergine | `#29243c` | CV preview stage |

The landing uses a bold sans display with tight but readable tracking. Large headings carry the message; smaller text explains the workflow. The illustrative CV is a CSS and HTML specimen, clearly labelled as a preview. The primary action always opens `/editor`.

Layout follows the content: a two-column hero on desktop, a stacked hero on phones, then workflow, templates, privacy, and a final invitation. The workflow is an ordered rail with dividers, and editor sections use the same divider rhythm. Mobile navigation remains visible in a second header row. The Typst CLI requirement appears beside the first call to action. Motion is limited to button hover feedback and respects reduced-motion preferences. Focus states, a skip link, and readable contrast are part of the system.

The shared dark colors live in `src/index.css` and are used by both routes. Landing-specific composition lives in `src/landing.css`; the editor uses the same palette through Tailwind tokens. Illustrative CV sheets remain a pale document surface so they read as paper against the dark interface.
