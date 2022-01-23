import { ICar } from '../types';
import { carsBrands } from './cars-brands';
import { carsModels } from './cars-models';

type NewCar = Omit<ICar, 'id'>;
type NewCarsList = NewCar[];

const randomIndex = (arr: Array<string>): number => Math.floor(Math.random() * arr.length);

function shuffle<T>(arr: Array<T>): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const randomColor = (): string => {
  const colorParams = [
    'ff',
    '00',
    ('0' + Math.floor(Math.random() * (parseInt('ff', 16) + 1)).toString(16)).slice(-2),
  ];
  shuffle<string>(colorParams);
  return `#${colorParams.join('')}`;
};

export const utils = {
  getRandomCars(totalCarsNumber: number): NewCarsList {
    const result: NewCarsList = [];
    for (let i = 0; i < totalCarsNumber; i += 1) {
      result.push({
        name: `${carsBrands[randomIndex(carsBrands)]} ${carsModels[randomIndex(carsModels)]}`,
        color: randomColor(),
      });
    }

    return result;
  },

  isBtnOfType(type: string, idStr: string): boolean {
    const btnType = `${idStr.split('-btn')[0]}`;
    return btnType === type;
  },
};
