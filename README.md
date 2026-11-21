# HALF/LIGHT: Cyborg Landing Page

A responsive, cyborg-themed landing page for a fictional human-augmentation lab.
Tagline: **Half human. Fully you.**

Built with plain HTML, CSS and JavaScript. No frameworks and no build step.

## Live features

- **Split-eye hero**: one eye, half organic and half mechanical, follows your cursor (or finger on touch screens).
- **Augmentation slider**: drag from 0% to 100% to move the seam between human and machine. The class label changes from Baseline to Enhanced, Hybrid and Full Cyborg.
- **Boot sequence**: a short terminal-style "system boot" on the first visit (skipped on later visits in the same session).
- **Scan-sweep cards**: hovering or focusing an augment card plays a scan line and redraws its icon.
- **Integration timeline**: a progress line that fills as you scroll. It is horizontal on desktop and vertical on mobile.
- **Telemetry counters**: the numbers count up when they come into view.
- **Waitlist form**: checks the email and replies with an in-character confirmation.
- **Responsive**: layouts for desktop, tablet (2 columns) and mobile (1 column), plus an animated hamburger menu.
- **Accessible**: skip link, keyboard-focusable cards, visible focus rings, ARIA labels, and support for `prefers-reduced-motion`.

## Design system

| Token | Hex | Use |
|---|---|---|
| Carbon | `#0C0E11` | Page background |
| Surface | `#14171C` | Cards, alternate sections |
| Bone | `#EDE7DC` | The "human" side |
| Signal Orange | `#FF5A1F` | The "machine" accent, CTAs |
| Steel | `#9AA0AA` | Secondary text |

**Fonts:** Space Grotesk (headings and body) and JetBrains Mono (HUD labels, data).

## Run it

Open `index.html` in any modern browser. You can also serve the folder:

```bash
npx serve .
```

## Structure

```
index.html   markup and inline SVG (eye, icons)
style.css    design tokens, layout, animation, breakpoints
script.js    eye tracking, slider, boot, reveal, counters, form
```

---
HALF/LIGHT is a fictional concept made for the Techfest 2026 web design challenge.
