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

  const key = sender.id.split('-btn')[0];

  switch (key) {
    case 'new-car-submit':
      createCarHandler(sender);
      break;
    case 'update-car-submit':
      updateCarHandler(sender);
      break;
    case 'generate-new-cars':
      genarateCarsHandler(sender);
      break;
    case 'delete':
      console.log('> del');

      deleteCarHandler(sender);
      break;
    case 'select':
      selectCarHandler(sender);
      break;
    case 'garage-prev':
      getPrevGaragePageHandler(sender);
      break;
    case 'garage-next':
      getNextGaragePageHandler(sender);
      break;
    case 'start-engine':
      startIndividualRaceHandler(sender);
      break;
    case 'stop-engine':
      resetIndividualRaceHandler(sender);
      break;
    case 'start-race':
      startRaceHandler();
      break;
    case 'reset-race':
      resetRaceHandler();
      break;
    case 'winners-prev':
      getPrevWinnersTabHandler(sender);
      break;
    case 'winners-next':
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
