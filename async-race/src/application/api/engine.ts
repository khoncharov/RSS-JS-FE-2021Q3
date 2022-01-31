import { APISource, EngineStatus } from '../types';
import { ORIGIN } from '../const';

export const changeEngineStatus = async (
  id: number,
  status: EngineStatus
): Promise<Response | void> => {
  const options = {
    method: 'PATCH',
  };
  try {
    const url = new URL(ORIGIN);
    url.pathname = APISource.Engine;
    url.search = `id=${id}&status=${status}`;
    const response = await fetch(url.href, options);
    return response;
  } catch (err) {
    console.log('Error getting winners list', err);
  }
};
