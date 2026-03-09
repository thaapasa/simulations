# Copilot Instructions

## Commands

- **Dev server**: `yarn dev`
- **Build**: `yarn build` (uses Vite)
- **Test all**: `yarn test` (Vitest)
- **Test single file**: `yarn vitest run src/util/Colors.test.ts`
- **Type check**: `npx tsc --noEmit`
- **Deploy**: `yarn deploy` (runs `script/deploy.sh`)

## Architecture

Interactive math/physics simulations (Langton's Ant, Game of Life, Mandelbrot/Julia fractals) built with React 19, TypeScript, Vite, MobX, and PixiJS/Canvas.

### Simulation structure

Each simulation follows a **Model → Renderer → View** pattern across three layers:

- **`src/game/{sim}/`** — Pure simulation logic (no UI, no React). Grid state, stepping, fractal math.
- **`src/ui/{sim}/`** — Model class (MobX state), Renderer class (drawing), and React UI component.
- **`src/ui/common/`** — Shared infrastructure: view wrappers, gesture handling, playback controls.

### Data flow

```
UI Component creates Model + Renderer
  → PixiSimulationView/CanvasSimulationView manages lifecycle
  → model.renderCallback = renderer.render
  → ModelMover handles drag/zoom/pinch gestures
  → User interaction updates model (centerPoint, scale, dragPoint)
  → model.render() triggers renderer.render() via callback
```

### Two rendering backends

- **PixiJS** (tile-based sims: Langton's Ant, Game of Life) — `PixiSimulationView` + `PixiRendererSupport` manages async PIXI app init, sprite loading via `Assets.load()`
- **Canvas 2D** (fractals) — `CanvasSimulationView` + direct pixel manipulation via `ImageData`

### Key interfaces

- **`Model`** (`src/ui/common/Model.ts`) — All simulations implement this: `renderSize`, `centerPoint`, `dragPoint`, `scale`, `speed`, `render()`, `repaint()`
- **`ModelRenderer<T>`** (`src/ui/common/ModelRenderer.ts`) — Renderers implement: `render()`, `updateSize()`, `createSprites()`, optional `destroy()`
- **`ModeHandler`** — Playback state machine (pause/step/play/fast/skip) shared by grid-based sims
- **`BoundValue`** — Observable min/max/step value with optional converter, used for all sliders

## Conventions

### MobX

- Uses **legacy decorator syntax** (`@observable`, `@computed`, `@action`) via Babel plugins configured in `vite.config.ts`
- Every class using decorators **must** call `makeObservable(this)` in its constructor (MobX 6 requirement)
- React components use `observer()` from `mobx-react` as a wrapper function (not as a decorator)

### Adding a new simulation

1. Create pure game logic in `src/game/{sim}/`
2. Create a Model class in `src/ui/{sim}/` implementing the `Model` interface with MobX observables
3. Create a Renderer class implementing `ModelRenderer<Application>` (PIXI) or `ModelRenderer<void>` (Canvas)
4. Create a React component using `PixiSimulationView` or `CanvasSimulationView`
5. Add a route in `App.tsx`

### Gesture handling

`ModelMover` wraps simulation views and uses `@use-gesture/react` with a DOM `target` ref (not `bind()`) to ensure `preventDefault()` works for wheel/pinch. The container has `touch-action: none` for mobile support.

### UI language

UI labels are in Finnish (Nopeus=Speed, Askel=Step, Laskenta=Calculation, Resoluutio=Resolution).
