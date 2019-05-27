import { Size, sizeEquals } from '../../game/common/Size';
import { ModelRenderer } from '../common/ModelRenderer';
import { MandelbrotModel } from './MandelbrotModel';

export class MandelbrotRenderer implements ModelRenderer<void> {
  private model: MandelbrotModel;
  private canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(
    model: MandelbrotModel,
    canvasRef: React.RefObject<HTMLCanvasElement>
  ) {
    this.model = model;
    this.canvasRef = canvasRef;
  }

  destroy = () => {
    // Noop
  };

  updateSize = (newSize: Size) => {
    if (!sizeEquals(newSize, this.model.renderSize)) {
      this.model.renderSize = newSize;
      this.render();
    }
  };

  render = () => {
    if (!this.canvasRef.current) {
      console.log('Skip canvas render');
      return;
    }
    const size = this.model.renderSize;
    console.log('Canvas render', size);
    const context = this.canvasRef.current.getContext('2d');
    if (!context) {
      return;
    }
    context.fillStyle = '#ffaac0';
    context.fillRect(0, 0, size.width, size.height);
  };

  createSprites = (_: void) => {
    // Fliib
  };
}
