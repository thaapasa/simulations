import { observable } from 'mobx';
import { identity } from './Util';

export class BoundValue {
  min: number;
  max: number;
  step: number;
  converter: (n: number) => number;

  @observable
  value: number;

  constructor(
    value: number,
    min: number,
    max: number,
    step: number,
    converter: (n: number) => number = identity
  ) {
    this.value = value;
    this.min = min;
    this.max = max;
    this.step = step;
    this.converter = converter;
  }

  get converted(): number {
    return this.converter(this.value);
  }
}
