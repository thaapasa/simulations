# Simulations

A hobby project for interactive math and physics simulations, built with
React, TypeScript, and PixiJS/Canvas. Just for fun.

The project is deployed to [simulaatiot.pomeranssi.fi](https://simulaatiot.pomeranssi.fi/).

## Simulations

- [**Langton's Ant**](https://en.wikipedia.org/wiki/Langton%27s_ant) — A cellular automaton where an ant moves on an infinite grid, flipping tile colors and turning. Simple rules produce surprisingly complex emergent patterns.
- [**Conway's Game of Life**](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) — The classic zero-player game where cells live, die, or are born based on their neighbors.
- [**Mandelbrot Set**](https://en.wikipedia.org/wiki/Mandelbrot_set) — Interactive fractal explorer with progressive rendering, adjustable resolution, and customizable color palettes.
- [**Julia Set**](https://en.wikipedia.org/wiki/Julia_set) — Explore Julia sets for any point — navigate to one from the Mandelbrot view to see its corresponding Julia fractal.

All simulations support pan (drag) and zoom (scroll/pinch), including touch on mobile.

## Development

```sh
yarn dev        # Start dev server
yarn build      # Production build (outputs to dist/)
yarn test       # Run tests (Vitest)
yarn build:dist # Rebuild the committed site/ bundle
```

The [`site/`](site) directory holds a prebuilt, committed copy of the production SPA so the project can be served directly from the repository without a build step. Run `yarn build:dist` to refresh it after changes.

## Tech Stack

- [React](https://react.dev/) 19 + [TypeScript](https://www.typescriptlang.org/) 5
- [Vite](https://vite.dev/) for building
- [PixiJS](https://pixijs.io/) 8 for tile-based rendering (Langton's Ant, Game of Life)
- Canvas 2D for pixel-based rendering (fractals)
- [MobX](https://mobx.js.org/) 6 for reactive state management
- [Vitest](https://vitest.dev/) for testing

## Credits

See [CREDITS.md](CREDITS.md) for icon credits.
