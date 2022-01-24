import { changeEngineStatus, createWinner, getWinner, getWinnersList, updateWinner } from '../api';
import { updateRaceWinner } from '../app-state/race-slice';
import { raceCar } from '../components/car';
import { carItem } from '../components/car-item';
import { raceControl } from '../components/race-control';
import { winnersList } from '../components/winners-list';
import { store } from '../store';
import { EngineStatus, IWinner } from '../types';

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

async function addWinnerToDB(winner: Omit<IWinner, 'wins'>): Promise<void> {
  const winnerInfo = await getWinner(winner.id);
  if (winnerInfo && winnerInfo.status === 404) {
    await createWinner(winner.id, winner.time);
    await getWinnersList();
    winnersList.update();
  } else if (winnerInfo && winnerInfo.status === 200) {
    const { wins, time } = (await winnerInfo.json()) as IWinner;
    const newWinRate = wins + 1;
    const newBestTime = time > winner.time ? winner.time : time;
    await updateWinner(winner.id, newWinRate, newBestTime);
    await getWinnersList();
    winnersList.update();
  }
}

const isEngineFailure = (response: Response | void): boolean =>
  !!response && response.status === 500;

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

    const driveResult = await changeEngineStatus(id, EngineStatus.Drive);
    if (isEngineFailure(driveResult)) {
      raceCar.stop(id);
    } else if (driveResult && driveResult.status === 200) {
      if (store.getState().winner.car.id === -1) {
        const winner: Omit<IWinner, 'wins'> = { id, time: +duration.toFixed(2) };
        store.dispatch(updateRaceWinner(winner));
        carItem.showWinnerResult();
        await addWinnerToDB(winner);
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
