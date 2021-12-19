import {
  COUNT_FILTER_MAX,
  COUNT_FILTER_MIN,
  DEFAUL_VOLUME,
  YEAR_FILTER_MAX,
  YEAR_FILTER_MIN,
} from '../const';
import { Color, IOption, Shape, Size, SortType, TDecorId, TFavoriteDecor } from '../types';
import { AppView } from '../view/app-view';

export class AppSettings {
  private view = new AppView();
  private _options: IOption;
  private _favorite: TFavoriteDecor;

  public searchQuery: string;
  private _sortType: SortType;

  private _shapeFilter: Set<Shape>;
  private _colorFilter: Set<Color>;
  private _sizeFilter: Set<Size>;
  private _favoriteOnlyFilter: boolean;
  private _countFilter: [number, number];
  private _yearFilter: [number, number];

  constructor() {
    this._options = JSON.parse(<string>localStorage.getItem('options')) ?? {
      volume: DEFAUL_VOLUME,
      mute: true,
    };
    this._favorite = new Set(JSON.parse(<string>localStorage.getItem('favorite'))) ?? new Set();
    this.searchQuery = '';
    this._sortType = +JSON.parse(<string>localStorage.getItem('sort-type')) ?? SortType.noSort;

    this._shapeFilter =
      new Set(JSON.parse(<string>localStorage.getItem('shape-filter'))) ?? new Set();
    this._colorFilter =
      new Set(JSON.parse(<string>localStorage.getItem('color-filter'))) ?? new Set();
    this._sizeFilter =
      new Set(JSON.parse(<string>localStorage.getItem('size-filter'))) ?? new Set();
    this._favoriteOnlyFilter =
      JSON.parse(<string>localStorage.getItem('favorite-only-filter')) ?? false;
    this._countFilter = JSON.parse(<string>localStorage.getItem('count-filter')) ?? [
      COUNT_FILTER_MIN,
      COUNT_FILTER_MAX,
    ];
    this._yearFilter = JSON.parse(<string>localStorage.getItem('year-filter')) ?? [
      YEAR_FILTER_MIN,
      YEAR_FILTER_MAX,
    ];
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

  addToFavorite(value: TDecorId): void {
    this._favorite.add(value);
    this.view.addFavorite(value);
    localStorage.setItem('favorite', JSON.stringify(Array.from(this._favorite)));
  }

  removeFromFavorite(value: TDecorId): void {
    this._favorite.delete(value);
    this.view.removeFavorite(value);
    localStorage.setItem('favorite', JSON.stringify(Array.from(this._favorite)));
  }

  get sortType(): SortType {
    return this._sortType;
  }

  set sortType(value: SortType) {
    this._sortType = value;
    localStorage.setItem('sort-type', JSON.stringify(this._sortType));
  }

  resetLocalStorage() {
    localStorage.clear();

    this._options = {
      volume: DEFAUL_VOLUME,
      mute: true,
    };
    this._favorite = new Set();
    this._sortType = SortType.noSort;

    this._shapeFilter = new Set();
    this._colorFilter = new Set();
    this._sizeFilter = new Set();
    this._favoriteOnlyFilter = false;
    this._countFilter = [COUNT_FILTER_MIN, COUNT_FILTER_MAX];
    this._yearFilter = [YEAR_FILTER_MIN, YEAR_FILTER_MAX];
  }

  // private _shapeFilter: Set<Shape>;

  // private _colorFilter: Set<Color>;
  // private _sizeFilter: Set<Size>;
  // private _favoriteOnlyFilter: boolean;
  // private _countFilter: [number, number];
  // private _yearFilter: [number, number];
}
