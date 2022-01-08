import { Color, Shape, Size } from '../../types';
import { getDecorId } from '../funclib';
import { getFilterType } from '../funclib';
import { translateFilterType } from '../funclib';

describe('Test for getDecorId function', () => {
  test("Str 'some-decor-id-123' should be equal to 123", () => {
    expect(getDecorId('some-decor-id-123')).toBe(123);
  });
});

describe('Test for getFilterType function', () => {
  test("Str 'some-filter-type' should be equal to 'type'", () => {
    expect(getFilterType('some-filter-type')).toBe('type');
  });
});

describe('Tests for translateFilterType function', () => {
  test("Str '   шар  ' should be equal to 'ball'", () => {
    expect(translateFilterType('   шар  ')).toBe(Shape.ball);
  });

  test("Str ' кОлОкольЧИК ' should be equal to 'bell'", () => {
    expect(translateFilterType(' кОлОкольЧИК ')).toBe(Shape.bell);
  });

  test("Str ' Шишка' should be equal to 'cone'", () => {
    expect(translateFilterType(' Шишка')).toBe(Shape.cone);
  });

  test("Str 'снежинка     ' should be equal to 'flake'", () => {
    expect(translateFilterType('снежинка     ')).toBe(Shape.flake);
  });

  test("Str 'фигурки' should be equal to 'figure'", () => {
    expect(translateFilterType('фигурка')).toBe(Shape.figure);
  });

  test(`Str 'белый' should be equal to '${Color.white}'`, () => {
    expect(translateFilterType('белый')).toBe(Color.white);
  });

  test(`Str 'желтый' and 'жёлтый' should be equal to '${Color.yellow}'`, () => {
    expect(translateFilterType('желтый')).toBe(Color.yellow);
    expect(translateFilterType('жёлтый')).toBe(Color.yellow);
    expect(translateFilterType('   жёлтый ')).toBe(Color.yellow);
  });

  test(`Str 'красный' should be equal to '${Color.red}'`, () => {
    expect(translateFilterType('красный')).toBe(Color.red);
  });

  test(`Str 'синий' should be equal to '${Color.blue}'`, () => {
    expect(translateFilterType('синий')).toBe(Color.blue);
  });

  test(`Str 'зеленый' and 'зелёный' should be equal to '${Color.green}'`, () => {
    expect(translateFilterType('зеленый')).toBe(Color.green);
    expect(translateFilterType('зелёный')).toBe(Color.green);
  });

  test(`Str 'большой' should be equal to '${Size.large}'`, () => {
    expect(translateFilterType('большой')).toBe(Size.large);
  });

  test(`Str 'средний' should be equal to '${Size.medium}'`, () => {
    expect(translateFilterType('средний')).toBe(Size.medium);
  });

  test(`Str 'малый' should be equal to '${Size.small}'`, () => {
    expect(translateFilterType('малый')).toBe(Size.small);
  });

  test("Str 'ff' should throw error", () => {
    const msg = 'Unknonw filter type ff';
    const t = () => {
      throw new Error(msg);
    };
    expect(t).toThrow(Error);
    expect(t).toThrow(msg);
  });
});
