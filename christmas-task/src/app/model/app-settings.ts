import { IOption } from './types';
import { TDecorId } from './types';
import { TFavoriteDecor } from './types';

export class AppSettings {
  private _options: IOption;
  private _favorite: TFavoriteDecor;

  constructor() {
    this._options = JSON.parse(<string>localStorage.getItem('options')) ?? {
      volume: '0',
      mute: true,
    };
    this._favorite = new Set(JSON.parse(<string>localStorage.getItem('favorite'))) ?? new Set();
  }

  get options(): IOption {
    return this._options;
  }

  set option(value: IOption) {
    this._options = { ...this._options, ...value };
    localStorage.setItem('options', JSON.stringify(this._options));
  }

  get favoriteDecor(): TFavoriteDecor {
    return this._favorite;
  }

  isFavorite(value: TDecorId): boolean {
    return this._favorite.has(value);
  }

  set addToFavorite(value: TDecorId) {
    this._favorite.add(value);
    localStorage.setItem('favorite', JSON.stringify(Array.from(this._favorite)));
  }
}
