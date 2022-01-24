import { getWinnersList } from '../api';
import {
  SortBy,
  SortOrder,
  updateCurrentTab,
  updateOrder,
  updateSortType,
} from '../app-state/winners-list-slice';
import { winnersList } from '../components/winners-list';
import { c } from '../const';
import { store } from '../store';

export async function getPrevWinnersTabHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const page = store.getState().winners.currentTab;
  if (page > 1) {
    store.dispatch(updateCurrentTab(page - 1));
    await getWinnersList();
    winnersList.update();
  }
  sender.disabled = false;
}

export async function getNextWinnersTabHandler(sender: HTMLButtonElement): Promise<void> {
  sender.disabled = true;
  const page = store.getState().winners.currentTab;
  const pageCount = Math.ceil(
    store.getState().winners.totalWinnersNumber / c.WINNERS_PER_PAGE_LIMIT
  );
  if (page < pageCount) {
    store.dispatch(updateCurrentTab(page + 1));
    await getWinnersList();
    winnersList.update();
  }
  sender.disabled = false;
}

export async function sortTableBy(newSortType: SortBy): Promise<void> {
  const currentSort = store.getState().winners.sort;
  const currentOrder = store.getState().winners.order;
  if (currentSort === newSortType) {
    if (currentOrder === SortOrder.Asc) {
      store.dispatch(updateOrder(SortOrder.Desc));
    } else {
      store.dispatch(updateOrder(SortOrder.Asc));
    }
  } else {
    store.dispatch(updateSortType(newSortType));
    store.dispatch(updateOrder(SortOrder.Asc));
  }
  await getWinnersList();
  winnersList.update();
}
