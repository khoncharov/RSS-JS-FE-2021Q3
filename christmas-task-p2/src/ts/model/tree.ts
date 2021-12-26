import { TDecorData } from '../types';

export class XmasTree {
  protected _background: number;
  protected _tree: number;
  protected _festoon: number;
  protected _decorations: TDecorData;

  constructor(decor: TDecorData) {
    this._background = 1;
    this._tree = 1;
    this._festoon = 1;
    this._decorations = decor;
  }

  get background(): number {
    return this._background;
  }

  set background(value: number) {
    this._background = value;
    const event = new Event('background-change');
  }
}
