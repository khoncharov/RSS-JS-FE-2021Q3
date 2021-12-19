import {
  COUNT_FILTER_MAX,
  COUNT_FILTER_MIN,
  DEFAUL_VOLUME,
  YEAR_FILTER_MAX,
  YEAR_FILTER_MIN,
} from '../const';
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

enum Shape {
  ball = 'ball',
  bell = 'bell',
  cone = 'cone',
  flake = 'flake',
  figure = 'figure',
}

enum Color {
  white = 'white',
  yellow = 'yellow',
  red = 'red',
  blue = 'blue',
  green = 'green',
}

enum Size {
  large = 'large',
  medium = 'medium',
  small = 'small',
}

interface IFiltersState {
  shapeFilter: Set<Shape>;
  colorFilter: Set<Color>;
  sizeFilter: Set<Size>;
  favoriteOnly: boolean;
  countFilter: [number, number];
  yearFilter: [number, number];
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
    this._sortState =
      JSON.parse(<string>localStorage.getItem('sort-state')) ?? SortType.byNameAscending.toString();
    this._filtersState = JSON.parse(<string>localStorage.getItem('filters-state')) ?? {
      shapeFilter: new Set(),
      colorFilter: new Set(),
      sizeFilter: new Set(),
      favoriteOnly: false,
      countFilter: [COUNT_FILTER_MIN, COUNT_FILTER_MAX],
      yearFilter: [YEAR_FILTER_MIN, YEAR_FILTER_MAX],
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
    this._filtersState = {
      shapeFilter: new Set(),
      colorFilter: new Set(),
      sizeFilter: new Set(),
      favoriteOnly: false,
      countFilter: [COUNT_FILTER_MIN, COUNT_FILTER_MAX],
      yearFilter: [YEAR_FILTER_MIN, YEAR_FILTER_MAX],
    };
  }
}
