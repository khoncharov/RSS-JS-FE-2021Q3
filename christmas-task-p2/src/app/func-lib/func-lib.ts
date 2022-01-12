import { Color, Feature, Shape, Size } from '../types/types';

export function translateFilterType(str: string): Shape | Color | Size | Feature {
  switch (str.toLowerCase().trim()) {
    case 'шар':
      return Shape.Ball;
    case 'колокольчик':
      return Shape.Bell;
    case 'шишка':
      return Shape.Cone;
    case 'снежинка':
      return Shape.Flake;
    case 'фигурка':
      return Shape.Figure;
    case 'белый':
      return Color.White;
    case 'желтый':
    case 'жёлтый':
      return Color.Yellow;
    case 'красный':
      return Color.Red;
    case 'синий':
      return Color.Blue;
    case 'зеленый':
    case 'зелёный':
      return Color.Green;
    case 'большой':
      return Size.Large;
    case 'средний':
      return Size.Medium;
    case 'малый':
      return Size.Small;
    default:
      return Feature.Unknown;
  }
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
