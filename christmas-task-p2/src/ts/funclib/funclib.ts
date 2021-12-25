import { Color, Shape, Size } from '../types';

export function translateFilterType(str: string): Shape | Color | Size | Error {
  switch (str.toLowerCase().trim()) {
    case 'шар':
      return Shape.ball;
    case 'колокольчик':
      return Shape.bell;
    case 'шишка':
      return Shape.cone;
    case 'снежинка':
      return Shape.flake;
    case 'фигурка':
      return Shape.figure;
    case 'белый':
      return Color.white;
    case 'желтый':
    case 'жёлтый':
      return Color.yellow;
    case 'красный':
      return Color.red;
    case 'синий':
      return Color.blue;
    case 'зеленый':
    case 'зелёный':
      return Color.green;
    case 'большой':
      return Size.large;
    case 'средний':
      return Size.medium;
    case 'малый':
      return Size.small;
  }
  throw new Error(`Unknonw filter type ${str}`);
}

export function getDecorId(cardId: string): number {
  return +cardId.split('-')[3];
}

export function getIdNum(idString: string): number {
  return +idString.split('-')[2];
}

export function getFilterType(id: string): string {
  return id.split('-')[2];
}
