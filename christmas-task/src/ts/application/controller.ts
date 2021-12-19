import { FAVORITE_DECOR_MAX_COUNT } from '../const';
import { AppSettings } from '../model/app-settings';

export class AppController {
  protected settings = new AppSettings();

  updateFavoriteDecor(decorId: number): void {
    if (this.settings.isFavorite(decorId)) {
      this.settings.removeFromFavorite = decorId;
    } else {
      const favoriteDecorCount = this.settings.favoriteDecor.size;
      if (favoriteDecorCount >= FAVORITE_DECOR_MAX_COUNT) {
        alert('Извините, все слоты заполнены');
      } else {
        this.settings.addToFavorite = decorId;
      }
    }
  }

  getDecorId(cardId: string): number {
    return +cardId.split('-')[3];
  }

  filterHandler(): void {
    throw new Error('Method not implemented.');
  }
}
