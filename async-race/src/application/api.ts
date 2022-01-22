import { updateCarsList, updateTotalCarsNumber } from './app-state/garage-list-slice';
import { c } from './const';
import { store } from './store';
import { Car, CarsList } from './types';

enum APISource {
  Garage = 'garage',
  Winners = 'winners',
  Engine = 'engine',
}

type TCarProp = Omit<Car, 'id'>;

const ORIGIN = 'http://127.0.0.1:3000';

export const getCarsList = async (): Promise<void> => {
  const options = {
    method: 'GET',
  };
  try {
    const currentPage = store.getState().garage.currentPage;
    const url = new URL(ORIGIN);
    url.pathname = APISource.Garage;
    url.search = `_page=${currentPage}&_limit=${c.CARS_PER_PAGE_LIMIT}`;
    const response = await fetch(url.href, options);
    const carsList = (await response.json()) as CarsList;
    const totalCount = response.headers.get('X-Total-Count') as string;
    store.dispatch(updateCarsList(carsList));
    store.dispatch(updateTotalCarsNumber(+totalCount));
  } catch (err) {
    console.log('Error getting cars list', err);
  }
};

export const getCar = async (id: number): Promise<CarsList> => {
  const options = {
    method: 'GET',
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Garage;
    url.search = `id=${id}`;
    const response = await fetch(url.href, options);
    const data = (await response.json()) as CarsList;
    return data;
  } catch (err) {
    console.log('Error getting car', err);
    return [];
  }
};

export const createCar = async (name: string, color: string): Promise<Car | object> => {
  const newCar: TCarProp = {
    name,
    color,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCar),
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Garage;
    const response = await fetch(url.href, options);
    const data = (await response.json()) as Car;
    return data;
  } catch (err) {
    console.log('Error creating new car', err);
    return {};
  }
};

export const deleteCar = async (id: number): Promise<void> => {
  const options = {
    method: 'DELETE',
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Garage + `\\${id}`;
    await fetch(url.href, options);
  } catch (err) {
    console.log('Error deleting car', err);
  }
};

export const updateCar = async (id: number, name: string, color: string): Promise<CarsList> => {
  const updatedCar: TCarProp = {
    name,
    color,
  };
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCar),
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Garage + `\\${id}`;
    const response = await fetch(url.href, options);
    const data = (await response.json()) as Car;
    return [data];
  } catch (err) {
    console.log('Error updating car', err);
    return [];
  }
};
