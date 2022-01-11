/* Decor data */

export interface IDecorItem {
  id: number;
  name: string;
  count: number;
  year: number;
  shape: string;
  color: string;
  size: string;
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

export interface ISound {
  volume?: number;
  isMuted?: boolean;
  currentTime?: number;
}

export type TFavoriteDecor = Set<number>;

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

export enum Feature {
  unknown = 'unknown',
}
