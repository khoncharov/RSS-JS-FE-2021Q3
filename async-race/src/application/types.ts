export interface ICar {
  id: number;
  name: string;
  color: string;
}

export type TCarsList = ICar[];

export enum EngineMode {
  Started = 'started',
  Stop = 'stop',
  Drive = 'drive',
}

export interface IWinner extends ICar {
  winsCount: number;
  bestTime: number;
}

export type TWinnersList = IWinner[];
