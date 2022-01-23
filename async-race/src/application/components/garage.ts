import { editor } from './editor';
import { raceControl } from './race-control';
import { garageList } from './garage-list';

class Garage {
  build(): HTMLElement {
    const node = document.createElement('section');
    node.id = 'garage-section';

    node.append(editor.build(), raceControl.build(), garageList.build());

    return node;
  }
}

export const garage = new Garage();
