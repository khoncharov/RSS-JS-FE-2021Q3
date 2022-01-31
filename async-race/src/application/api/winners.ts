import { updateTotalWinnersNumber, updateWinnersList } from '../app-state/winners-list-slice';
import { c, ORIGIN } from '../const';
import { store } from '../store';
import { APISource, IWinner, TWinnersList } from '../types';

export const getWinnersList = async (): Promise<void> => {
  const options = {
    method: 'GET',
  };
  try {
    const { currentTab, sort, order } = store.getState().winners;
    const url = new URL(ORIGIN);
    url.pathname = APISource.Winners;
    url.search = `_page=${currentTab}&_limit=${c.WINNERS_PER_PAGE_LIMIT}&_sort=${sort}&_order=${order}`;
    const response = await fetch(url.href, options);
    const data = (await response.json()) as Omit<TWinnersList, 'name' | 'color'>;
    const totalCount = response.headers.get('X-Total-Count') as string;

    store.dispatch(updateWinnersList(data));
    store.dispatch(updateTotalWinnersNumber(+totalCount));
  } catch (err) {
    console.log('Error getting winners list', err);
  }
};

export const getWinner = async (id: number): Promise<Response | void> => {
  const options = {
    method: 'GET',
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Winners + `\\${id}`;
    const response = await fetch(url.href, options);
    return response;
  } catch (err) {
    console.log('Error getting car', err);
  }
};

export const createWinner = async (id: number, time: number): Promise<TWinnersList | void> => {
  const newWinner: IWinner = {
    id,
    wins: 1,
    time,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newWinner),
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Winners;
    const response = await fetch(url.href, options);
    const data = (await response.json()) as IWinner;
    return [data];
  } catch (err) {
    console.log('Error creating new car', err);
  }
};

export const deleteWinner = async (id: number): Promise<void> => {
  const options = {
    method: 'DELETE',
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Winners + `\\${id}`;
    await fetch(url.href, options);
  } catch (err) {
    console.log('Error deleting car', err);
  }
};

export const updateWinner = async (
  id: number,
  wins: number,
  time: number
): Promise<TWinnersList | void> => {
  const updatedWinner: Omit<IWinner, 'id'> = {
    wins,
    time,
  };
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedWinner),
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Winners + `\\${id}`;
    const response = await fetch(url.href, options);
    const data = (await response.json()) as IWinner;
    return [data];
  } catch (err) {
    console.log('Error updating winner', err);
  }
};
