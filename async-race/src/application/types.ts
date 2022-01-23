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

export interface IWinner {
  id: number;
  winsCount: number;
  bestTime: number;
}

export type TWinnersList = IWinner[];
