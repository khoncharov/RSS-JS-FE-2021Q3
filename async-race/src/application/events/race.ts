import { changeEngineStatus } from '../api';
import { updateRaceWinner } from '../app-state/race-slice';
import { raceCar } from '../components/car';
import { carItem } from '../components/car-item';
import { raceControl } from '../components/race-control';
import { store } from '../store';
import { EngineStatus } from '../types';

interface IRaceParams {
  velocity: number;
  distance: number;
}

export async function startIndividualRaceHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const carId = +sender.id.split('-btn-')[1];

  const res = await changeEngineStatus(carId, EngineStatus.Started);

  if (res && res.status === 200) {
    const race = (await res.json()) as IRaceParams;
    const duration = race.distance / (race.velocity * 1000);

    raceCar.start(carId, duration);

    const driveRes = await changeEngineStatus(carId, EngineStatus.Drive);
    if (driveRes && driveRes.status === 500) {
      raceCar.stop(carId);
    }
  } else {
    sender.disabled = false;
  }
}

export async function resetIndividualRaceHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const carId = +sender.id.split('-btn-')[1];

  const res = await changeEngineStatus(carId, EngineStatus.Stopped);

  if (res && res.status === 200) {
    raceCar.reset(carId);
  } else {
    sender.disabled = false;
  }
}

export async function startRaceHandler(): Promise<void> {
  const raceCarsList = store.getState().garage.carsList;
  if (raceCarsList.length > 0) {
    raceControl.setRaceMode(true);

    await Promise.all(raceCarsList.map((car) => startCar(car.id)));
  }
}

export async function resetRaceHandler(): Promise<void> {
  raceControl.setRaceMode(false);

  const raceCarsList = store.getState().garage.carsList;
  raceCarsList.map((car) => resetCar(car.id));
}

async function startCar(id: number): Promise<void> {
  const res = await changeEngineStatus(id, EngineStatus.Started);

  if (res && res.status === 200) {
    const race = (await res.json()) as IRaceParams;
    const duration = 0.1 + race.distance / (race.velocity * 1000);
    raceCar.start(id, duration);

    const driveRes = await changeEngineStatus(id, EngineStatus.Drive);
    if (driveRes && driveRes.status === 500) {
      raceCar.stop(id);
    } else if (driveRes && driveRes.status === 200) {
      if (store.getState().winner.car.id === -1) {
        store.dispatch(updateRaceWinner({ id, time: +duration.toFixed(2) }));
        carItem.showWinnerResult();
      }
    }
  }
}

async function resetCar(id: number): Promise<void> {
  const res = await changeEngineStatus(id, EngineStatus.Stopped);

  if (res && res.status === 200) {
    raceCar.reset(id);
  }

  const winnerId = store.getState().winner.car.id;
  if (winnerId !== -1) {
    carItem.hideWinnerResult();
    store.dispatch(updateRaceWinner({ id: -1, time: -1 }));
  }
}
