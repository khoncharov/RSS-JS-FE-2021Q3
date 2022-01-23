import { updateCarsList, updateTotalCarsNumber } from './app-state/garage-list-slice';
import { updateTotalWinnersNumber, updateWinnersList } from './app-state/winners-list-slice';
import { c } from './const';
import { store } from './store';
import { ICar, TCarsList, TWinnersList } from './types';

enum APISource {
  Garage = 'garage',
  Winners = 'winners',
  Engine = 'engine',
}

type TCarProp = Omit<ICar, 'id'>;

const ORIGIN = 'http://127.0.0.1:3000';

/* Garage */

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
    const carsList = (await response.json()) as TCarsList;
    const totalCount = response.headers.get('X-Total-Count') as string;
    store.dispatch(updateCarsList(carsList));
    store.dispatch(updateTotalCarsNumber(+totalCount));
  } catch (err) {
    console.log('Error getting cars list', err);
  }
};

export const getCar = async (id: number): Promise<TCarsList> => {
  const options = {
    method: 'GET',
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Garage;
    url.search = `id=${id}`;
    const response = await fetch(url.href, options);
    const data = (await response.json()) as TCarsList;
    return data;
  } catch (err) {
    console.log('Error getting car', err);
    return [];
  }
};

export const createCar = async (name: string, color: string): Promise<TCarsList> => {
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
    const data = (await response.json()) as ICar;
    return [data];
  } catch (err) {
    console.log('Error creating new car', err);
    return [];
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

export const updateCar = async (id: number, name: string, color: string): Promise<TCarsList> => {
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
    const data = (await response.json()) as ICar;
    return [data];
  } catch (err) {
    console.log('Error updating car', err);
    return [];
  }
};

/* Winners */

export const getWinnersList = async (): Promise<void> => {
  const options = {
    method: 'GET',
  };
  try {
    const { currentPage, sort, order } = store.getState().winners;
    const url = new URL(ORIGIN);
    url.pathname = APISource.Winners;
    url.search = `_page=${currentPage}&_limit=${c.WINNERS_PER_PAGE_LIMIT}&_sort=${sort}&_order=${order}`;
    const response = await fetch(url.href, options);
    const data = (await response.json()) as Omit<TWinnersList, 'name' | 'color'>;
    const totalCount = response.headers.get('X-Total-Count') as string;
    console.log(data);

    store.dispatch(updateWinnersList(data));
    store.dispatch(updateTotalWinnersNumber(+totalCount));
  } catch (err) {
    console.log('Error getting winners list', err);
  }
};

// export const getWinner = async (id: number): Promise<TCarsList> => {
//   const options = {
//     method: 'GET',
//   };
//   try {
//     const url = new URL(ORIGIN);
//     url.pathname = APISource.Garage;
//     url.search = `id=${id}`;
//     const response = await fetch(url.href, options);
//     const data = (await response.json()) as TCarsList;
//     return data;
//   } catch (err) {
//     console.log('Error getting car', err);
//     return [];
//   }
// };

// export const createWinner = async (name: string, color: string): Promise<TCarsList> => {
//   const newCar: TCarProp = {
//     name,
//     color,
//   };
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newCar),
//   };
//   try {
//     const url = new URL(ORIGIN);
//     url.pathname = APISource.Garage;
//     const response = await fetch(url.href, options);
//     const data = (await response.json()) as ICar;
//     return [data];
//   } catch (err) {
//     console.log('Error creating new car', err);
//     return [];
//   }
// };

// export const deleteWinner = async (id: number): Promise<void> => {
//   const options = {
//     method: 'DELETE',
//   };
//   try {
//     const url = new URL(ORIGIN);
//     url.pathname = APISource.Garage + `\\${id}`;
//     await fetch(url.href, options);
//   } catch (err) {
//     console.log('Error deleting car', err);
//   }
// };

// export const updateWinner = async (id: number, name: string, color: string): Promise<TCarsList> => {
//   const updatedCar: TCarProp = {
//     name,
//     color,
//   };
//   const options = {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(updatedCar),
//   };
//   try {
//     const url = new URL(ORIGIN);
//     url.pathname = APISource.Garage + `\\${id}`;
//     const response = await fetch(url.href, options);
//     const data = (await response.json()) as ICar;
//     return [data];
//   } catch (err) {
//     console.log('Error updating car', err);
//     return [];
//   }
// };
