# Designarium

**A public gallery of GUI design concepts, dashboards and interface aesthetics.**

Designarium is an independent visual reference collection spanning actual Softwarium projects and unrelated application concepts. It collects the layouts, presentation styles, interaction ideas, and visual atmospheres worth keeping.

The first collection is **Ephemeris**: six distinct calendar and real-world event dashboard concepts, including macroeconomics, finance, diplomacy, sports, weekly scheduling, and a daily timeline.

Concept images are AI-generated visual studies, **not** working application screenshots and **not** verified historical or live data. The source imagery is preserved with image metadata for every concept.

## Website

The static gallery is published with GitHub Pages using the workflow at `.github/workflows/pages.yml`. If GitHub Pages has not been enabled for this repository, select **GitHub Actions** under repository **Settings → Pages → Build and deployment**.

## Development

No framework, package manager, runtime, paid service, or API key is required. Open `index.html` in a browser for a simple local preview, or serve the repository root through an HTTP static server.

Project and concept metadata live in `data/concepts.json`. Add image files under `assets/concepts/<project>/`; the gallery reads the catalog and auto-builds the navigation and search index.

## Relationship to other projects

- **Designarium** explores and catalogs visual concepts.
- **ViewWright** authors toolkit-independent GUI semantics and previews.
- **Applications** implement the interfaces.
- **ViewWitness** verifies actual rendered interface behavior.

Image generation does not replace executable UI implementation.