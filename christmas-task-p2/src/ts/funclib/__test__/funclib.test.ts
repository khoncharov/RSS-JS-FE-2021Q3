import { Color, Feature, Size } from '../../types';
import { getDecorId } from '../funclib';
import { getFilterType } from '../funclib';
import { translateFilterType } from '../funclib';

describe('Test get decor id function', () => {
  test("Str 'some-decor-id-123' should be equal to 123", () => {
    expect(getDecorId('some-decor-id-123')).toBe(123);
  });
});

describe('Test get id number function', () => {
  test("Str 'some-id-123' should be equal to 123", () => {
    expect(getDecorId('some-decor-id-123')).toBe(123);
  });
});

describe('Test get filter type function', () => {
  test("Str 'some-filter-type' should be equal to 'type'", () => {
    expect(getFilterType('some-filter-type')).toBe('type');
  });
});

describe('Test translate filter type function', () => {
  test("Str '   шар  ' should be equal to 'Ball'", () => {
    expect(translateFilterType('   шар  ')).toBe('Ball');
  });

  test("Str ' кОлОкольЧИК ' should be equal to 'Bell'", () => {
    expect(translateFilterType(' кОлОкольЧИК ')).toBe('Bell');
  });

  test("Str ' Шишка' should be equal to 'Cone'", () => {
    expect(translateFilterType(' Шишка')).toBe('Cone');
  });

  test("Str 'снежинка     ' should be equal to 'Flake'", () => {
    expect(translateFilterType('снежинка     ')).toBe('Flake');
  });

  test("Str 'фигурки' should be equal to 'Figure'", () => {
    expect(translateFilterType('фигурка')).toBe('Figure');
  });

  test(`Str 'белый' should be equal to '${Color.White}'`, () => {
    expect(translateFilterType('белый')).toBe(Color.White);
  });

  test(`Str 'желтый' and 'жёлтый' should be equal to '${Color.Yellow}'`, () => {
    expect(translateFilterType('желтый')).toBe(Color.Yellow);
    expect(translateFilterType('жёлтый')).toBe(Color.Yellow);
    expect(translateFilterType('   жёлтый ')).toBe(Color.Yellow);
  });

  test(`Str 'красный' should be equal to '${Color.Red}'`, () => {
    expect(translateFilterType('красный')).toBe(Color.Red);
  });

  test(`Str 'синий' should be equal to '${Color.Blue}'`, () => {
    expect(translateFilterType('синий')).toBe(Color.Blue);
  });

  test(`Str 'зеленый' and 'зелёный' should be equal to '${Color.Green}'`, () => {
    expect(translateFilterType('зеленый')).toBe(Color.Green);
    expect(translateFilterType('зелёный')).toBe(Color.Green);
  });

  test(`Str 'большой' should be equal to '${Size.Large}'`, () => {
    expect(translateFilterType('большой')).toBe(Size.Large);
  });

  test(`Str 'средний' should be equal to '${Size.Medium}'`, () => {
    expect(translateFilterType('средний')).toBe(Size.Medium);
  });

  test(`Str 'малый' should be equal to '${Size.Small}'`, () => {
    expect(translateFilterType('малый')).toBe(Size.Small);
  });

  test(`Str 'деревянный' should be equal to '${Feature.Unknown}'`, () => {
    expect(translateFilterType('деревянный')).toBe(Feature.Unknown);
  });
});
