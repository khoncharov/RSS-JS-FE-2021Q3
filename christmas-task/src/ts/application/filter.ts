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
    if (sortType === SortType.byNameAscending) {
      this.sortByLetter(1);
    } else if (sortType === SortType.byNameDescending) {
      this.sortByLetter(-1);
    } else if (sortType === SortType.byYearAscending) {
      this.sortByNumber(1);
    } else if (sortType === SortType.byYearDescending) {
      this.sortByNumber(-1);
    }
    return this;
  }

  sortByLetter = (orderSign: 1 | -1) => {
    this.result.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1 * orderSign;
      }
      if (nameA > nameB) {
        return 1 * orderSign;
      }
      return 0;
    });
  };

  sortByNumber = (orderSign: 1 | -1): void => {
    this.result.sort((a, b) => (a.year - b.year) * orderSign);
  };

  getResult(): TDecorData | [] {
    return this.result;
  }
}
