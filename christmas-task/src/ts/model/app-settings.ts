import { DEFAUL_VOLUME } from '../const';
import { IOption } from '../types';
import { TDecorId } from '../types';
import { TFavoriteDecor } from '../types';
import { AppView } from '../view/app-view';

enum SortType {
  byNameAscending,
  byNameDescending,
  byYearAscending,
  byYearDescending,
}

interface IFiltersState {
  shapeFilter: []; // set ?? 'ball' | 'bell' | 'cone' | 'flake' | 'figure'
  colorFilter: []; // set ?? 'white' | 'yellow' | 'red' | 'blue' | 'green'
  sizeFilter: []; // set ?? 'large' | 'medium' | 'small'
  favoriteOnly: boolean; // true | false
  countFilter: []; // tuple ?? [number, number]
  yearFilter: []; // [number, number]
}

export class AppSettings {
  private view = new AppView();
  private _options: IOption;
  private _favorite: TFavoriteDecor;
  private _sortState: SortType;
  private _filtersState: IFiltersState;

  constructor() {
    this._options = JSON.parse(<string>localStorage.getItem('options')) ?? {
      volume: DEFAUL_VOLUME,
      mute: true,
    };
    this._favorite = new Set(JSON.parse(<string>localStorage.getItem('favorite'))) ?? new Set();
    this._sortState = JSON.parse(<string>localStorage.getItem('sort-state')) ?? '0';
    this._filtersState = JSON.parse(<string>localStorage.getItem('filters-state')) ?? {
      shapeFilter: new Set(),
      colorFilter: new Set(),
      sizeFilter: new Set(),
      favoriteOnly: false,
      countFilter: [0, 15],
      yearFilter: [1940, 2020],
    };
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
    this.view.addFavorite(value);
    localStorage.setItem('favorite', JSON.stringify(Array.from(this._favorite)));
  }

  set removeFromFavorite(value: TDecorId) {
    this._favorite.delete(value);
    this.view.removeFavorite(value);
    localStorage.setItem('favorite', JSON.stringify(Array.from(this._favorite)));
  }

  get sortState(): SortType {
    return this._sortState;
  }

  set sortState(value: SortType) {
    this._sortState = value;
    localStorage.setItem('sort-state', JSON.stringify(this._sortState));
  }

  resetLocalStorage() {
    localStorage.clear();

    this._options = {
      volume: DEFAUL_VOLUME,
      mute: true,
    };
    this._favorite = new Set();
    this._sortState = SortType.byNameAscending;
    // this._filtersState = {
    //   shapeFilter: new Set(),
    //   colorFilter: new Set(),
    //   sizeFilter: new Set(),
    //   favoriteOnly: false,
    //   countFilter: [0, 15],
    //   yearFilter: [1940, 2020],
    // };
  }
}
