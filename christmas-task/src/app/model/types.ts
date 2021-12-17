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

export type TRawDecorData = IRawDecorItem[];

/* Settings types */

export interface IOption {
  volume?: string;
  mute?: boolean;
}

export type TFavoriteDecor = Set<TDecorId>;
