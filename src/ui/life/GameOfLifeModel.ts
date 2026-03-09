import { action, computed, makeObservable, observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { GameOfLife } from '../../game/gameoflife/GameOfLife';
import {
  BrushPattern,
  getBrushCells,
  PATTERNS,
} from '../../game/gameoflife/Patterns';
import { BoundValue } from '../../util/BoundValue';
import { noop, timeout } from '../../util/Util';
import { GameMode, ModeHandler } from '../common/ModeHandler';
import { Model } from '../common/Model';
import { TileCalculator } from '../common/TileCalculator';

const baseStepDelay = 100;

export class GameOfLifeModel implements Model {
  @observable
  scale = new BoundValue(1, 0.3, 1.5, 0.05);

  @observable
  speed = new BoundValue(1, 0.5, 5, 0.1);

  @observable
  dragPoint: Position = { x: 0, y: 0 };

  @observable
  renderSize: Size = { width: 1, height: 1 };

  @observable
  selectedBrushIndex = 0;

  @observable
  brushRotation = 0;

  @observable
  hoverTile: Position | null = null;

  set centerPoint(pos: Position) {
    this.tileCalc.centerInPx = pos;
  }

  @computed
  get centerPoint(): Position {
    return this.tileCalc.centerInPx;
  }

  @computed
  get stepDelay(): number {
    return baseStepDelay / this.speed.value;
  }

  @computed
  get selectedBrush(): BrushPattern {
    return PATTERNS[this.selectedBrushIndex];
  }

  @computed
  get brushCells(): Position[] {
    return getBrushCells(this.selectedBrush, this.brushRotation);
  }

  @computed
  get canPaint(): boolean {
    return this.control.mode === 'pause';
  }

  grid = new GameOfLife(false);
  control = new ModeHandler(this);
  tileCalc = new TileCalculator(this);

  renderCallback: () => void = noop;

  constructor() {
    makeObservable(this);
    this.render();
  }

  @computed
  get mode(): GameMode {
    return this.control.visibleMode;
  }

  repaint = () => this.render();

  stepNoAnimation = () => {
    this.grid.step();
  };

  stepAnimated = async () => {
    this.grid.step();
    this.render();
    await timeout(this.stepDelay);
  };

  @action
  render = () => {
    this.renderCallback();
  };

  animateStep = async () => {
    this.render();
    await timeout(this.stepDelay);
  };

  @action
  selectBrush = (index: number) => {
    this.selectedBrushIndex = index;
    this.brushRotation = 0;
  };

  @action
  rotateBrush = () => {
    this.brushRotation = (this.brushRotation + 1) % 4;
    this.render();
  };

  @action
  setHoverTile = (tile: Position | null) => {
    // Skip if tile hasn't changed
    if (
      this.hoverTile?.x === tile?.x &&
      this.hoverTile?.y === tile?.y
    ) {
      return;
    }
    this.hoverTile = tile;
    this.render();
  };

  @action
  clearGrid = () => {
    this.grid.clear();
    this.control.frame = 0;
    this.render();
  };

  /** Convert screen pixel position to grid tile coordinates */
  screenToTile(screenX: number, screenY: number): Position {
    const calc = this.tileCalc;
    const tileSize = calc.tileSize;
    const tileRange = calc.tileRange;
    const gridOffset = calc.gridOffset;
    return {
      x: Math.round(
        (screenX - gridOffset.x) / tileSize + tileRange.from.x
      ),
      y: Math.round(
        (this.renderSize.height - screenY - gridOffset.y) / tileSize +
          tileRange.from.y
      ),
    };
  }

  @action
  placeBrush = (tileX: number, tileY: number) => {
    if (!this.canPaint) return;
    const cells = this.brushCells;
    if (cells.length === 1 && cells[0].x === 0 && cells[0].y === 0) {
      // Single cell: toggle
      this.grid.toggle(tileX, tileY);
    } else {
      // Pattern: set all cells to alive
      for (const cell of cells) {
        this.grid.set(tileX + cell.x, tileY + cell.y, true);
      }
    }
    this.render();
  };
}
