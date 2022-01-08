import { Color, IDecorItem, Shape, Size, SortType, TDecorData, TFavoriteDecor } from '../types';
import { translateFilterType } from '../funclib/funclib';

type TPropFilter = Shape | Color | Size;

export class FilterDecorData {
  private result: TDecorData | [];

  constructor(data: TDecorData) {
    this.result = [...data];
  }

  byName(searchQuery: string): FilterDecorData {
    if (searchQuery) {
      this.result = this.result.filter((item) => {
        const query = searchQuery.toLowerCase();
        const decorName = item.name.toLowerCase();
        return decorName.includes(query);
      });
    }
    return this;
  }

  filterBy(
    property: keyof Pick<IDecorItem, 'shape' | 'color' | 'size'>,
    dataFilter: Set<TPropFilter>
  ): FilterDecorData {
    if (dataFilter.size) {
      this.result = this.result.filter((item) => {
        return dataFilter.has(translateFilterType(item[property]) as TPropFilter);
      });
    }
    return this;
  }

  favoriteOnly(isFavoriteOnly: boolean, favoriteDecor: TFavoriteDecor): FilterDecorData {
    if (isFavoriteOnly) {
      this.result = this.result.filter((item) => {
        if (favoriteDecor.has(item.id)) {
          return item;
        }
      });
    }
    return this;
  }

  filterByRange(
    property: keyof Pick<IDecorItem, 'count' | 'year'>,
    range: [number, number]
  ): FilterDecorData {
    this.result = this.result.filter((item) => {
      const [minValue, maxValue] = range;
      return item[property] >= minValue && item[property] <= maxValue;
    });
    return this;
  }

  sort(sortType: SortType) {
    switch (sortType) {
      case SortType.byNameAscending:
        this.result.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        break;
      case SortType.byNameDescending:
        this.result.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        });
        break;
      case SortType.byYearAscending:
        this.result.sort((a, b) => {
          return a.year - b.year;
        });
        break;
      case SortType.byYearDescending:
        this.result.sort((a, b) => {
          return b.year - a.year;
        });
        break;
    }
    return this;
  }

  getResult(): TDecorData | [] {
    return this.result;
  }
}
