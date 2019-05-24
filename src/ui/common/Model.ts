import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { BoundValue } from '../../util/BoundValue';

export interface Range {
  from: Position;
  to: Position;
}

export interface Model {
  renderSize: Size;
  centerPoint: Position;
  scale: BoundValue;
  speed: BoundValue;

  renderCallback: () => void;
  render(): void;
}
