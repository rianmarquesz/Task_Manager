# Project Guidelines

## Code Style
- **HTML**: Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **CSS**: Follow BEM naming convention (`.block__element--modifier`) for classes when styling
- **JavaScript**: Use ES6+ syntax; prefer `const` over `let`, and `let` over `var`
- **Indentation**: 2 spaces for HTML/CSS/JS files
- **File naming**: Use kebab-case for files (e.g., `style.css`, `main.js`, `index.html`)

## Architecture
This is a front-end web project that uses a flat file structure:
- **index.html**: Main entry point and primary HTML structure
- **Styles**: Keep CSS in separate files (future `styles/` directory) to maintain separation of concerns
- **Scripts**: Keep JavaScript modular in separate files (future `scripts/` directory)
- **Assets**: Store images, fonts, and other media in an `assets/` directory

## Build and Test
- No build system currently configured
- For development: Use a local HTTP server (e.g., `python -m http.server 8000` or VS Code Live Server extension)
- Future: Consider adding build tooling (Vite, Webpack) if the project expands with multiple pages or a bundling need

## Project Conventions
- Keep the HTML structure clean and self-documenting
- Use meta tags for viewport, charset, and SEO
- Avoid inline styles—use external CSS files
- Avoid inline event handlers—use JavaScript event listeners
- Mobile-first responsive design approach when adding styles

## Integration Points
- No external dependencies currently; consider adding them through CDN or npm/pnpm if expanding
- Plan for potential static hosting (GitHub Pages, Vercel, Netlify)

## Security
- Keep sensitive data out of client-side code
- Sanitize any user inputs if adding interactive features
- Use HTTPS when deployed
