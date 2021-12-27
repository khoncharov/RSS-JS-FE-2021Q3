import {
  COUNT_FILTER_MAX,
  COUNT_FILTER_MIN,
  DEFAUL_VOLUME,
  YEAR_FILTER_MAX,
  YEAR_FILTER_MIN,
} from '../const';
import { Color, ISound, Shape, Size, SortType, TFavoriteDecor } from '../types';
import { AppView } from '../view/app-view';

export class AppSettings {
  private view = new AppView();
  private _sound: ISound;
  private _isSnowing: boolean;
  private _minimized: Array<boolean>;
  private _favoriteItems: TFavoriteDecor;

  public searchQuery: string;
  private _sortType: SortType;

  private _shapeFilter: Set<Shape>;
  private _colorFilter: Set<Color>;
  private _sizeFilter: Set<Size>;
  private _isFavoriteOnly: boolean;
  private _countFilter: [number, number];
  private _yearFilter: [number, number];

  constructor() {
    this._sound = JSON.parse(<string>localStorage.getItem('sound')) ?? {
      volume: DEFAUL_VOLUME,
      isMuted: true,
      currentTime: 0,
    };
    this._isSnowing = JSON.parse(<string>localStorage.getItem('is-snowing')) ?? false;
    this._minimized = new Array(5).fill(false);
    this._favoriteItems =
      new Set(JSON.parse(<string>localStorage.getItem('favorite-items'))) ?? new Set();
    this.searchQuery = '';
    this._sortType = +JSON.parse(<string>localStorage.getItem('sort-type')) ?? SortType.noSort;

    this._shapeFilter =
      new Set(JSON.parse(<string>localStorage.getItem('shape-filter'))) ?? new Set();
    this._colorFilter =
      new Set(JSON.parse(<string>localStorage.getItem('color-filter'))) ?? new Set();
    this._sizeFilter =
      new Set(JSON.parse(<string>localStorage.getItem('size-filter'))) ?? new Set();
    this._isFavoriteOnly = JSON.parse(<string>localStorage.getItem('is-favorite-only')) ?? false;
    this._countFilter = JSON.parse(<string>localStorage.getItem('count-filter')) ?? [
      COUNT_FILTER_MIN,
      COUNT_FILTER_MAX,
    ];
    this._yearFilter = JSON.parse(<string>localStorage.getItem('year-filter')) ?? [
      YEAR_FILTER_MIN,
      YEAR_FILTER_MAX,
    ];
  }

  get sound(): ISound {
    return this._sound;
  }

  set sound(value: ISound) {
    this._sound = { ...this._sound, ...value };
    localStorage.setItem('sound', JSON.stringify(this._sound));
  }

  get isSnowing(): boolean {
    return this._isSnowing;
  }

  set isSnowing(value: boolean) {
    this._isSnowing = value;
    localStorage.setItem('is-snowing', JSON.stringify(this._isSnowing));
  }

  get minimized(): Array<boolean> {
    return this._minimized;
  }

  updateMinimized(btnId: number, value: boolean): void {
    this._minimized[btnId] = value;
  }

  get favoriteDecor(): TFavoriteDecor {
    return this._favoriteItems;
  }

  isFavorite(decorId: number): boolean {
    return this._favoriteItems.has(decorId);
  }

  addToFavorite(decorId: number): void {
    this._favoriteItems.add(decorId);
    this.view.addFavorite(decorId);
    localStorage.setItem('favorite-items', JSON.stringify(Array.from(this._favoriteItems)));
  }

  removeFromFavorite(decorId: number): void {
    this._favoriteItems.delete(decorId);
    this.view.removeFavorite(decorId);
    localStorage.setItem('favorite-items', JSON.stringify(Array.from(this._favoriteItems)));
  }

  get sortType(): SortType {
    return this._sortType;
  }

  set sortType(value: SortType) {
    this._sortType = value;
    localStorage.setItem('sort-type', JSON.stringify(this._sortType));
  }

  resetSettings() {
    localStorage.clear();

    this.searchQuery = '';

    this._favoriteItems = new Set();
    this._sortType = SortType.noSort;

    this._shapeFilter = new Set();
    this._colorFilter = new Set();
    this._sizeFilter = new Set();
    this._isFavoriteOnly = false;
    this._countFilter = [COUNT_FILTER_MIN, COUNT_FILTER_MAX];
    this._yearFilter = [YEAR_FILTER_MIN, YEAR_FILTER_MAX];
  }

  get shapeFilter(): Set<Shape> {
    return this._shapeFilter;
  }

  updateShapeFilter(shape: Shape): void {
    if (this._shapeFilter.has(shape)) {
      this._shapeFilter.delete(shape);
    } else {
      this._shapeFilter.add(shape);
    }
    this.view.updateShapeFilter(this.shapeFilter);
    localStorage.setItem('shape-filter', JSON.stringify(Array.from(this._shapeFilter)));
  }

  get colorFilter(): Set<Color> {
    return this._colorFilter;
  }

  updateColorFilter(color: Color): void {
    if (this._colorFilter.has(color)) {
      this._colorFilter.delete(color);
    } else {
      this._colorFilter.add(color);
    }
    this.view.updateColorFilter(this.colorFilter);
    localStorage.setItem('color-filter', JSON.stringify(Array.from(this._colorFilter)));
  }

  get sizeFilter(): Set<Size> {
    return this._sizeFilter;
  }

  updateSizeFilter(size: Size): void {
    if (this._sizeFilter.has(size)) {
      this._sizeFilter.delete(size);
    } else {
      this._sizeFilter.add(size);
    }
    this.view.updateSizeFilter(this.sizeFilter);
    localStorage.setItem('size-filter', JSON.stringify(Array.from(this._sizeFilter)));
  }

  get isFavoriteOnly(): boolean {
    return this._isFavoriteOnly;
  }

  updateFavoriteOnly(): void {
    if (this._isFavoriteOnly) {
      this._isFavoriteOnly = false;
    } else {
      this._isFavoriteOnly = true;
    }
    this.view.updateFavoriteOnlyFilter(this.isFavoriteOnly);
    localStorage.setItem('is-favorite-only', JSON.stringify(this._isFavoriteOnly));
  }

  get countFilter(): [number, number] {
    return this._countFilter;
  }

  updateCountFilter(countFilter: [number, number]): void {
    this._countFilter = countFilter;
    localStorage.setItem('count-filter', JSON.stringify(this._countFilter));
  }

  get yearFilter(): [number, number] {
    return this._yearFilter;
  }

  updateYearFilter(yearFilter: [number, number]): void {
    this._yearFilter = yearFilter;
    localStorage.setItem('year-filter', JSON.stringify(this._yearFilter));
  }

  resetFilters() {
    this._shapeFilter = new Set();
    this._colorFilter = new Set();
    this._sizeFilter = new Set();
    this._isFavoriteOnly = false;
    this._countFilter = [COUNT_FILTER_MIN, COUNT_FILTER_MAX];
    this._yearFilter = [YEAR_FILTER_MIN, YEAR_FILTER_MAX];
    localStorage.removeItem('shape-filter');
    localStorage.removeItem('color-filter');
    localStorage.removeItem('size-filter');
    localStorage.removeItem('is-favorite-only');
    localStorage.removeItem('count-filter');
    localStorage.removeItem('year-filter');
  }
}
