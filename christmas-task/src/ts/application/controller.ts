import { FAVORITE_DECOR_MAX_COUNT } from '../const';
import { AppSettings } from '../model/app-settings';
import { TDecorData } from '../types';
import { FilterDecorData } from './filter';

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

  filterDecorData(data: TDecorData, settings: AppSettings): TDecorData | [] {
    const filter = new FilterDecorData(data);
    const result = filter
      .byName(settings.searchQuery)
      .filterBy('shape', settings.shapeFilter)
      .filterBy('color', settings.colorFilter)
      .filterBy('size', settings.sizeFilter)
      .favoriteOnly(settings.isFavoriteOnly, settings.favoriteDecor)
      .byCount(settings.countFilter)
      .byYear(settings.yearFilter)
      .sort(settings.sortType)
      .getResult();
    return result;
  }
}
