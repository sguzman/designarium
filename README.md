# Designarium

A public atlas of beautiful application interfaces — visual studies for both real
software projects and imagined products. Designarium is an aesthetic reference
gallery, **not** a UI component library or a collection of working app screenshots.

**[Explore the public gallery](https://sguzman.github.io/designarium/)**

## Collections

- **Ephemeris** — calendars, market events, diplomacy, sports, and temporal intelligence.
- **Starbyte** — game libraries, emulator interfaces, and preservation workspaces.
- **Chatarium** — local-first AI chat, tool transparency, and conversation observability.

The artwork lives in the [gallery](https://sguzman.github.io/designarium/),
not in this README. The searchable catalog, full-resolution images, descriptions,
and provenance are maintained in [`data/concepts.json`](data/concepts.json).

## Contributing concepts

See [CONTRIBUTING.md](CONTRIBUTING.md) for the gallery asset and metadata format.
Images are stored at `assets/concepts/<project>/<slug>.webp` and are not
replaced without preserving the selected design.

## Development

Static HTML/CSS/JS; no database, build framework, or paid services.

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000. GitHub Pages publishes `main` automatically.
Headless browser and image-integrity tests run in
[GitHub Actions](.github/workflows/qa.yml).

Stewardship rules: [AGENTS.md](AGENTS.md).

## Boundaries

All artworks are illustrative AI-generated design concepts. Depicted events,
scores, prices, tool traces, models, attachments, software features, and status
indicators are not verified live data or proof of implemented functionality.

Designarium explores visual direction; ViewWright formalizes GUIs;
applications implement them; ViewWitness verifies real renderings.
