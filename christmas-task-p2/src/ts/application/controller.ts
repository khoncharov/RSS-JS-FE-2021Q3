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
      .byShape(settings.shapeFilter)
      .byColor(settings.colorFilter)
      .bySize(settings.sizeFilter)
      .favoriteOnly(settings.isFavoriteOnly, settings.favoriteDecor)
      .byCount(settings.countFilter)
      .byYear(settings.yearFilter)
      .sort(settings.sortType)
      .getResult();
    return result;
  }

  playAudioHandle(isMuted: boolean): void {
    const audio = <HTMLAudioElement>document.querySelector('audio');
    audio.volume = <number>this.settings.sound.volume;
    if (isMuted) {
      this.settings.sound = { isMuted: false };
      audio.play();
    } else {
      this.settings.sound = {
        isMuted: true,
        currentTime: audio.currentTime,
      };
      audio.pause();
    }
    audio.currentTime = <number>this.settings.sound.currentTime;
  }

  pauseAudio(): void {
    const audio = <HTMLAudioElement>document.querySelector('audio');
    audio.pause();
    this.settings.sound = {
      currentTime: audio.currentTime,
    };
  }

  playAudio(isMuted: boolean): void {
    const audio = <HTMLAudioElement>document.querySelector('audio');
    audio.volume = <number>this.settings.sound.volume;
    audio.currentTime = <number>this.settings.sound.currentTime;
    if (!isMuted) {
      audio.play();
    }
  }

  getAreaCoords(): Array<number> {
    const treeContainer = <HTMLDivElement>document.querySelector('.tree-view__tree');
    const w = treeContainer.clientWidth;
    const h = treeContainer.clientHeight;
    // Tree triangle coords
    const top1 = [w / 2 - 10, 0];
    const top2 = [w / 2 + 10, 0];
    const H = h - 90;
    const k = H * Math.tan(22 * (Math.PI / 180));
    const right = [Math.round(w / 2 + k), H];
    const left = [Math.round(w / 2 - k), H];
    return [...top1, ...top2, ...right, ...left];
  }

  moveAt(item: HTMLElement, pageX: number, pageY: number): void {
    item.style.left = pageX - item.offsetWidth / 2 + 'px';
    item.style.top = pageY - item.offsetHeight / 2 + 'px';
  }
}
