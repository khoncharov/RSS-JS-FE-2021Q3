import { c } from './const';
import { Car, CarsList } from './types';

export enum APISource {
  Garage = 'garage',
  Winners = 'winners',
  Engine = 'engine',
}

const ORIGIN = 'http://127.0.0.1:3000';

export const getCarsList = async (
  page: number,
  limit: number = c.CARS_PER_PAGE_LIMIT
): Promise<CarsList> => {
  const options = {
    method: 'GET',
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Garage;
    url.search = `_page=${page}&_limit=${limit}`;
    const response = await fetch(url.href, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error getting cars list', err);
    return [];
  }
};

export const getCar = async (id: number): Promise<Car | object> => {
  const options = {
    method: 'GET',
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Garage;
    url.search = `id=${id}`;
    const response = await fetch(url.href, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error getting car', err);
    return {};
  }
};

export const createCar = async (name: string, color: string): Promise<Car | object> => {
  const newCar = {
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
    const data = await response.json();
    return data;
  } catch (err) {
    console.log('Error creating new car', err);
    return {};
  }
};
