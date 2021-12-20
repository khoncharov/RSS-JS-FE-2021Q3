import { FAVORITE_DECOR_MAX_COUNT } from '../const';
import { AppSettings } from '../model/app-settings';
import { Shape, SortType, TDecorData } from '../types';

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

  getShape(id: string): Shape {
    return id.split('-')[2] as Shape;
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
}
