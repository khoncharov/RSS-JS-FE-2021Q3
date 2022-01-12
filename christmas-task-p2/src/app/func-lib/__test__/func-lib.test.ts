import { getDecorId } from '../func-lib';
import { getFilterType } from '../func-lib';
import { translateFilterType } from '../func-lib';

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
  test("Str '   шар  ' should be equal to 'ball'", () => {
    expect(translateFilterType('   шар  ')).toBe('ball');
  });

  test("Str ' кОлОкольЧИК ' should be equal to 'bell'", () => {
    expect(translateFilterType(' кОлОкольЧИК ')).toBe('bell');
  });

  test("Str ' Шишка' should be equal to 'cone'", () => {
    expect(translateFilterType(' Шишка')).toBe('cone');
  });

  test("Str 'снежинка     ' should be equal to 'flake'", () => {
    expect(translateFilterType('снежинка     ')).toBe('flake');
  });

  test("Str 'фигурки' should be equal to 'figure'", () => {
    expect(translateFilterType('фигурка')).toBe('figure');
  });

  test(`Str 'белый' should be equal to 'white'`, () => {
    expect(translateFilterType('белый')).toBe('white');
  });

  test(`Str 'желтый' and 'жёлтый' should be equal to 'yellow'`, () => {
    expect(translateFilterType('желтый')).toBe('yellow');
    expect(translateFilterType('жёлтый')).toBe('yellow');
    expect(translateFilterType('   жёлтый ')).toBe('yellow');
  });

  test(`Str 'красный' should be equal to 'red'`, () => {
    expect(translateFilterType('красный')).toBe('red');
  });

  test(`Str 'синий' should be equal to 'blue'`, () => {
    expect(translateFilterType('синий')).toBe('blue');
  });

  test(`Str 'зеленый' and 'зелёный' should be equal to 'Green'`, () => {
    expect(translateFilterType('зеленый')).toBe('green');
    expect(translateFilterType('зелёный')).toBe('green');
  });

  test(`Str 'большой' should be equal to 'large'`, () => {
    expect(translateFilterType('большой')).toBe('large');
  });

  test(`Str 'средний' should be equal to 'medium'`, () => {
    expect(translateFilterType('средний')).toBe('medium');
  });

  test(`Str 'малый' should be equal to 'small'`, () => {
    expect(translateFilterType('малый')).toBe('small');
  });

  test(`Str 'деревянный' should be equal to 'unknown'`, () => {
    expect(translateFilterType('деревянный')).toBe('unknown');
  });
});
