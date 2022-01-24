import { SortBy } from './app-state/winners-list-slice';
import { raceCar } from './components/car';
import {
  createCarHandler,
  deleteCarHandler,
  genarateCarsHandler,
  getNextGaragePageHandler,
  getPrevGaragePageHandler,
  selectCarHandler,
  updateCarHandler,
} from './events/garage';
import { getNextWinnersTabHandler, getPrevWinnersTabHandler, sortTableBy } from './events/winners';
import { store } from './store';
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
    console.log('Individual RACE start', sender.id);
    // -----------------------------------------------------------------------------------
    // const res = await changeEngineStatus(1, EngineStatus.Started);
    // console.log(res instanceof Response);
    // if (res instanceof Response && res.status === 200) {
    //   console.log('data >', await res.json());
    // } else if (res instanceof Response && res.status === 500) {
    //   console.log('data >', await res.json());
    // }
    const carId = +sender.id.split('-btn-')[1];
    raceCar.start(carId, 5);
  } else if (utils.isBtnOfType('stop-engine', sender.id)) {
    console.log('Individual RACE stop', sender.id);
    // -----------------------------------------------------------------------------------
    // const res = await changeEngineStatus(1, EngineStatus.Drive);
    // if (res instanceof Response && res.status === 200) {
    //   console.log('data >', await res.json());
    // } else if (res instanceof Response && res.status === 500) {
    //   console.log('data>', res);
    //   console.log('data 500 >', await res.json());
    // }
    const carId = +sender.id.split('-btn-')[1];
    raceCar.stop(carId);
  } else if (utils.isBtnOfType('start-race', sender.id)) {
    console.log('RACE start', sender.id);
    const raceCarsList = store.getState().garage.carsList;
    for (const car of raceCarsList) {
      raceCar.start(car.id, +(Math.random() * 5).toPrecision(2));
    }
  } else if (utils.isBtnOfType('reset-race', sender.id)) {
    console.log('RACE stop', sender.id);
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
