import { raceCar } from '../components/car';
import { store } from '../store';

export async function startIndividualRaceHandler(sender: HTMLButtonElement): Promise<void> {
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
}

export async function stopIndividualRaceHandler(sender: HTMLButtonElement): Promise<void> {
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
}

export async function startRaceHandler(sender: HTMLButtonElement): Promise<void> {
  console.log('RACE start', sender.id);
  const raceCarsList = store.getState().garage.carsList;
  for (const car of raceCarsList) {
    raceCar.start(car.id, +(Math.random() * 5).toPrecision(2));
  }
}

export async function stopRaceHandler(sender: HTMLButtonElement): Promise<void> {
  console.log('RACE stop', sender.id);
}
