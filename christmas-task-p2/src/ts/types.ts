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
  Ball = 'Ball',
  Bell = 'Bell',
  Cone = 'Cone',
  Flake = 'Flake',
  Figure = 'Figure',
}

export enum Color {
  White = 'White',
  Yellow = 'Yellow',
  Red = 'Red',
  Blue = 'Blue',
  Green = 'Green',
}

export enum Size {
  Large = 'Large',
  Medium = 'Medium',
  Small = 'Small',
}

export enum Feature {
  Unknown = 'Unknown',
}
