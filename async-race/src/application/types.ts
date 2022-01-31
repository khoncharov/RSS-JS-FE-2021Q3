export interface ICar {
  id: number;
  name: string;
  color: string;
}

export type TCarsList = ICar[];

export enum EngineStatus {
  Started = 'started',
  Stopped = 'stopped',
  Drive = 'drive',
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type TWinnersList = IWinner[];

export enum APISource {
  Garage = 'garage',
  Winners = 'winners',
  Engine = 'engine',
}
