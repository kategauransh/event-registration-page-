# Event Registration Page

A fully responsive event registration page for **TechConf 2025**, built with semantic HTML5, modern CSS (custom properties, Grid, Flexbox), and vanilla JavaScript.

## Features

- **Responsive layout** — works on mobile (360 px) through 4K
- **Accessible form** — `aria-required`, `aria-describedby`, `role="alert"` on error messages, `aria-live` on success
- **Client-side validation** — real-time blur/input validation for all required fields
- **Character counter** — live count for the textarea (0 / 500)
- **Multi-select tracks** — checkbox grid with at-least-one validation
- **Simulated async submit** — loading spinner on the button, then success message
- **CSS custom properties** — easy theming via design tokens
- **No frameworks or dependencies** — pure HTML, CSS, JS

## File Structure

```
event-registration-page/
├── index.html   ← semantic HTML, ARIA attributes
├── style.css    ← custom properties, Grid, Flexbox, responsive
└── app.js       ← validation, character counter, submit simulation
```

## How to Run

Just open `index.html` in any modern browser — no build step needed.
