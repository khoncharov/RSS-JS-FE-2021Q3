import { winnersList } from './winners-list';

class Winners {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.id = 'winners-section';
    node.className = 'hidden';

    node.append(winnersList.build());

    return node;
  }
}

export const winners = new Winners();
