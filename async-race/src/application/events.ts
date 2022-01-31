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
  resetIndividualRaceHandler,
  resetRaceHandler,
  startIndividualRaceHandler,
  startRaceHandler,
} from './events/race';
import { getNextWinnersTabHandler, getPrevWinnersTabHandler, sortTableBy } from './events/winners';

export function eventsHandler(e: Event): void {
  const sender = e.target as HTMLButtonElement;

  switch (sender.id) {
    case 'new-car-submit-btn':
      createCarHandler(sender);
      break;
    case 'update-car-submit-btn':
      updateCarHandler(sender);
      break;
    case 'generate-new-cars-btn':
      genarateCarsHandler(sender);
      break;
    case 'delete-btn':
      deleteCarHandler(sender);
      break;
    case 'select-btn':
      selectCarHandler(sender);
      break;
    case 'garage-prev-btn':
      getPrevGaragePageHandler(sender);
      break;
    case 'garage-next-btn':
      getNextGaragePageHandler(sender);
      break;
    case 'start-engine-btn':
      startIndividualRaceHandler(sender);
      break;
    case 'stop-engine-btn':
      resetIndividualRaceHandler(sender);
      break;
    case 'start-race-btn':
      startRaceHandler();
      break;
    case 'reset-race-btn':
      resetRaceHandler();
      break;
    case 'winners-prev-btn':
      getPrevWinnersTabHandler(sender);
      break;
    case 'winners-next-btn':
      getNextWinnersTabHandler(sender);
      break;
    case 'winner-id-col-tabhead':
      sortTableBy(SortBy.Id);
      break;
    case 'wins-col-tabhead':
      sortTableBy(SortBy.Wins);
      break;
    case 'time-col-tabhead':
      sortTableBy(SortBy.Time);
      break;
    default:
      break;
  }
}
