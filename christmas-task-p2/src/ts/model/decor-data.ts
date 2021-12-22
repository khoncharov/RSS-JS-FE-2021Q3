import { TDecorData } from '../types';
import { TRawDecorData } from '../types';

export class DecorData {
  public items: TDecorData;

  constructor(rawData: TRawDecorData) {
    this.items = this.convertRawData(rawData);
  }

  convertRawData(rawData: TRawDecorData): TDecorData {
    const result: TDecorData = [];
    rawData.items.forEach((item) => {
      result.push({
        id: +item.id,
        name: item.name,
        count: +item.count,
        year: +item.year,
        shape: item.shape,
        color: item.color,
        size: item.size,
      });
    });
    return result;
  }
}
