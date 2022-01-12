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

export interface ISound {
  volume?: number;
  isMuted?: boolean;
  currentTime?: number;
}

export type TFavoriteDecor = Set<number>;

export enum SortType {
  NoSort,
  ByNameAscending,
  ByNameDescending,
  ByYearAscending,
  ByYearDescending,
}

export enum Shape {
  Ball = 'ball',
  Bell = 'bell',
  Cone = 'cone',
  Flake = 'flake',
  Figure = 'figure',
}

export enum Color {
  White = 'white',
  Yellow = 'yellow',
  Red = 'red',
  Blue = 'blue',
  Green = 'green',
}

export enum Size {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum Feature {
  Unknown = 'unknown',
}
