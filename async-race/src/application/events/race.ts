import { changeEngineStatus } from '../api';
import { raceCar } from '../components/car';
import { store } from '../store';
import { EngineStatus } from '../types';

interface RaceParams {
  velocity: number;
  distance: number;
}

export async function startIndividualRaceHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const carId = +sender.id.split('-btn-')[1];

  const res = await changeEngineStatus(carId, EngineStatus.Started);
  console.log(res); // -----------------------------------------------------------

  if (res && res.status === 200) {
    const race = (await res.json()) as RaceParams;
    const duration = race.distance / (race.velocity * 1000);
    console.log('duration >', duration, ' => ', duration.toFixed(2)); // -----------------------------------------------------------

    raceCar.start(carId, duration);

    const driveRes = await changeEngineStatus(carId, EngineStatus.Drive);
    if (driveRes && driveRes.status === 500) {
      raceCar.stop(carId);
    } else if (driveRes && driveRes.status === 200) {
      console.log(await driveRes.json()); //--------------------------------------------------------------
    }
  } else {
    sender.disabled = false;
  }
}

export async function resetIndividualRaceHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const carId = +sender.id.split('-btn-')[1];

  const res = await changeEngineStatus(carId, EngineStatus.Stopped);
  console.log(res); // -----------------------------------------------------------

  if (res && res.status === 200) {
    console.log(await res.json()); // -----------------------------------------------------------

    raceCar.reset(carId);
  } else {
    sender.disabled = false;
  }
}

export async function startRaceHandler(sender: HTMLButtonElement): Promise<void> {
  console.log('RACE start', sender.id);
  const raceCarsList = store.getState().garage.carsList;
  for (const car of raceCarsList) {
    raceCar.start(car.id, +(Math.random() * 5).toPrecision(2));
  }
}

export async function resetRaceHandler(sender: HTMLButtonElement): Promise<void> {
  console.log('RACE stop', sender.id);
}
