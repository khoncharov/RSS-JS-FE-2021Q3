// class Filter {
//   private data: string;

//   shapefilter(['ball', 'bell']) {
//     this.data = 'do some with it'
//     return this;
//   };

//   filterData() {
//     const res = [];
//     res
//       .shapeFilter()
//       .colorFilter()
//       .sizeFilter()
//       .favoriteOnlyFilter() // получается что я каждый раз буду перебирать массив
//                             // кажется лучше опрелелить цепь условий, и отсортировать
//     return res;
//   }
// }

// {
//   ball: true,
//   bell: false,
//   cone: true,
// }

import { TDecorData } from '../types';

export class DataFilter {
  constructor(protected data: TDecorData) {}

  searchInList(query: string): DataFilter {
    console.log(query);
    return this;
  }
}
