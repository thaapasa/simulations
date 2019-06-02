import { Size } from '../../game/common/Size';

export interface ModelRenderer<T> {
  updateSize: (size: Size) => void;
  createSprites: (app: T, size: Size) => void;
  render(): void;
}
