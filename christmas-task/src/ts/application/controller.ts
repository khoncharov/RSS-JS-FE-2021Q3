import { FAVORITE_DECOR_MAX_COUNT } from '../const';
import { AppSettings } from '../model/app-settings';
import { Color, Shape, Size, SortType, TDecorData } from '../types';

export class AppController {
  protected settings = new AppSettings();

  updateFavoriteDecor(decorId: number): void {
    if (this.settings.isFavorite(decorId)) {
      this.settings.removeFromFavorite(decorId);
    } else {
      const favoriteDecorCount = this.settings.favoriteDecor.size;
      if (favoriteDecorCount >= FAVORITE_DECOR_MAX_COUNT) {
        alert('Извините, все слоты заполнены');
      } else {
        this.settings.addToFavorite(decorId);
      }
    }
  }

  getDecorId(cardId: string): number {
    return +cardId.split('-')[3];
  }

  getFilterType(id: string): string {
    return id.split('-')[2];
  }

  filterDecorData(data: TDecorData): TDecorData | [] {
    let result: TDecorData | [] = [...data];
    /* Search */
    if (this.settings.searchQuery) {
      result = result.filter((item) => {
        const query = this.settings.searchQuery.toLowerCase();
        const decorName = item.name.toLowerCase();
        return decorName.includes(query);
      });
    }
    /* Filter */
    if (this.settings.shapeFilter.size !== 0) {
      result = result.filter((item) => {
        const shapeFilter = this.settings.shapeFilter;
        return shapeFilter.has(this.translateFilterType(item.shape) as Shape);
      });
    }
    if (this.settings.colorFilter.size !== 0) {
      result = result.filter((item) => {
        const colorFilter = this.settings.colorFilter;
        return colorFilter.has(this.translateFilterType(item.color) as Color);
      });
    }
    if (this.settings.sizeFilter.size !== 0) {
      result = result.filter((item) => {
        const sizeFilter = this.settings.sizeFilter;
        return sizeFilter.has(this.translateFilterType(item.size) as Size);
      });
    }
    /* Sort */
    switch (this.settings.sortType) {
      case SortType.byNameAscending:
        result.sort((a, b) => {
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
        result.sort((a, b) => {
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
        result.sort((a, b) => {
          return a.year - b.year;
        });
        break;
      case SortType.byYearDescending:
        result.sort((a, b) => {
          return b.year - a.year;
        });
        break;
    }
    return result;
  }

  translateFilterType(str: string): Shape | Color | Size | Error {
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
}
