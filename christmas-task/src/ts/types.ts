/* Decor data */

export type TDecorId = number;
export type TDecorName = string;
export type TDecorCount = number;
export type TDecorYear = number;
export type TDecorShape = string;
export type TDecorColor = string;
export type TDecorSize = string;

export interface IDecorItem {
  id: TDecorId;
  name: TDecorName;
  count: TDecorCount;
  year: TDecorYear;
  shape: TDecorShape;
  color: TDecorColor;
  size: TDecorSize;
}

export type TDecorData = IDecorItem[];

/* Raw decor data */

export interface IRawDecorItem {
  id: string;
  name: string;
  count: string;
  year: string;
  shape: string;
  color: string;
  size: string;
}

export type TRawDecorData = {
  items: IRawDecorItem[];
};

/* Settings types */

export interface IOption {
  volume?: string;
  mute?: boolean;
}

export type TFavoriteDecor = Set<TDecorId>;

/* Filter types */

export enum SortType {
  noSort,
  byNameAscending,
  byNameDescending,
  byYearAscending,
  byYearDescending,
}

export enum Shape {
  ball = 'ball',
  bell = 'bell',
  cone = 'cone',
  flake = 'flake',
  figure = 'figure',
}

export enum Color {
  white = 'white',
  yellow = 'yellow',
  red = 'red',
  blue = 'blue',
  green = 'green',
}

export enum Size {
  large = 'large',
  medium = 'medium',
  small = 'small',
}
