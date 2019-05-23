import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';

export interface Range {
  from: Position;
  to: Position;
}

export interface Model {
  renderSize: Size;
  centerPoint: Position;
  scale: number;
  minScale: number;
  maxScale: number;
  renderCallback: () => void;
  render(): void;
}

export interface ModelRenderer {
  updateSize: (size: Size) => void;
  render(): void;
}
