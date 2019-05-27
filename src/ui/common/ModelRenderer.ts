import { Size } from '../../game/common/Size';

export interface ModelRenderer<T> {
  updateSize: (size: Size) => void;
  createSprites: (app: T) => void;
  render(): void;
}
