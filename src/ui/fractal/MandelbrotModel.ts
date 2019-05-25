import { noop } from '@babel/types';
import { observable } from 'mobx';
import { Position } from '../../game/common/Position';
import { Size } from '../../game/common/Size';
import { BoundValue } from '../../util/BoundValue';
import { Model } from '../common/Model';

export class MandelbrotModel implements Model {
  @observable
  renderSize: Size = { width: 1, height: 1 };

  @observable
  scale: BoundValue = { min: 0.3, max: 1.5, value: 1, step: 0.05 };

  @observable
  speed: BoundValue = { min: 1, max: 1, value: 1, step: 1 };

  @observable
  centerPoint: Position = { x: 0, y: 0 };

  renderCallback: () => void = noop;

  render() {
    this.renderCallback();
  }
}
