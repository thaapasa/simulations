import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { BoundValue } from '../../util/BoundValue';

export interface Model {
  renderSize: Size;
  centerPoint: Position;
  dragPoint: Position;
  scale: BoundValue;
  speed: BoundValue;
  stopCalculation?: () => void;

  renderCallback: () => void;
  render(): void;
  repaint(): void;
}
