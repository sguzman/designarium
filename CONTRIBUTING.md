# Adding a Designarium study

Designarium is a **curated aesthetic reference gallery**, not an application-store catalog.
It may include real software projects, speculative products, and entirely unrelated GUI
designs when the composition, typography, information architecture or visual language
is worth preserving.

1. Save a carefully optimized full-size image under `assets/concepts/<project>/<slug>.webp`.
2. Add an object to `data/concepts.json` with stable id, title, project, kind, description,
   tags, image, alt, source, order, publication status and provenance.
3. Label AI-generated concepts clearly; do not represent generated historical events,
   market prices, sports scores, photographs, or product functionality as verified facts.
4. Preserve the original visual direction. Do not auto-replace a liked concept with an
   alternative, nor use one generic layout for unrelated applications.
5. Open the site, exercise search, filters, lightbox, keyboard navigation and mobile layout.
6. GitHub Actions validates catalog integrity and publishes the public static gallery.

The repo is an aesthetic archive. ViewWright's source blueprints and application code
belong in their own repositories; metadata may link to them when useful.

No private conversations, credentials, user-specific personal notes, or unrelated private
Taria material belong in this public repository.
