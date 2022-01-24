import { SortBy } from './app-state/winners-list-slice';
import {
  createCarHandler,
  deleteCarHandler,
  genarateCarsHandler,
  getNextGaragePageHandler,
  getPrevGaragePageHandler,
  selectCarHandler,
  updateCarHandler,
} from './events/garage';
import {
  startIndividualRaceHandler,
  startRaceHandler,
  stopIndividualRaceHandler,
  stopRaceHandler,
} from './events/race';
import { getNextWinnersTabHandler, getPrevWinnersTabHandler, sortTableBy } from './events/winners';
import { utils } from './utils/utils';

export function eventsHandler(e: Event): void {
  const sender = e.target as HTMLButtonElement;

  if (utils.isBtnOfType('new-car-submit', sender.id)) {
    createCarHandler(sender);
  } else if (utils.isBtnOfType('update-car-submit', sender.id)) {
    updateCarHandler(sender);
  } else if (utils.isBtnOfType('generate-new-cars', sender.id)) {
    genarateCarsHandler(sender);
  } else if (utils.isBtnOfType('delete', sender.id)) {
    deleteCarHandler(sender);
  } else if (utils.isBtnOfType('select', sender.id)) {
    selectCarHandler(sender);
  } else if (utils.isBtnOfType('garage-prev', sender.id)) {
    getPrevGaragePageHandler(sender);
  } else if (utils.isBtnOfType('garage-next', sender.id)) {
    getNextGaragePageHandler(sender);
  } else if (utils.isBtnOfType('start-engine', sender.id)) {
    startIndividualRaceHandler(sender);
  } else if (utils.isBtnOfType('stop-engine', sender.id)) {
    stopIndividualRaceHandler(sender);
  } else if (utils.isBtnOfType('start-race', sender.id)) {
    startRaceHandler(sender);
  } else if (utils.isBtnOfType('reset-race', sender.id)) {
    stopRaceHandler(sender);
  } else if (utils.isBtnOfType('winners-prev', sender.id)) {
    getPrevWinnersTabHandler(sender);
  } else if (utils.isBtnOfType('winners-next', sender.id)) {
    getNextWinnersTabHandler(sender);
  } else if (sender.id === 'winner-id-col-tabhead') {
    sortTableBy(SortBy.Id);
  } else if (sender.id === 'wins-col-tabhead') {
    sortTableBy(SortBy.Wins);
  } else if (sender.id === 'time-col-tabhead') {
    sortTableBy(SortBy.Time);
  }
}
