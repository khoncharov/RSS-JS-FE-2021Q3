import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWinnersList } from '../types';

enum SortBy {
  Id = 'id',
  Wins = 'wins',
  Time = 'time',
}

enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

interface IWinnersListState {
  currentPage: number;
  totalWinnersNumber: number;
  winnersList: TWinnersList;
  sort: SortBy;
  order: SortOrder;
}

const initialState: IWinnersListState = {
  currentPage: 1,
  totalWinnersNumber: 1,
  sort: SortBy.Id,
  order: SortOrder.Asc,
  winnersList: [
    { id: 1, winsCount: 5, bestTime: 1.11 },
    { id: 2, winsCount: 3, bestTime: 3.14 },
    { id: 3, winsCount: 1, bestTime: 4.51 },
  ],
};

const winnersListSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    updateCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    updateTotalWinnersNumber(state, action: PayloadAction<number>) {
      state.totalWinnersNumber = action.payload;
    },
    updateSortType(state, action: PayloadAction<SortBy>) {
      state.sort = action.payload;
    },
    updateOrder(state, action: PayloadAction<SortOrder>) {
      state.order = action.payload;
    },

    updateWinnersList(state, action: PayloadAction<TWinnersList>) {
      state.winnersList = action.payload;
    },
  },
});

export const {
  updateCurrentPage,
  updateTotalWinnersNumber,
  updateSortType,
  updateOrder,
  updateWinnersList,
} = winnersListSlice.actions;
export default winnersListSlice.reducer;
// ^^^ This way of exporting reducer doesn't provide autocomplite in vscode
