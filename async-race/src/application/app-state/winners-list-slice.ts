import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWinnersList } from '../types';

export enum SortBy {
  Id = 'id',
  Wins = 'wins',
  Time = 'time',
}

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC',
}

interface IWinnersListState {
  currentTab: number;
  totalWinnersNumber: number;
  winnersList: TWinnersList;
  sort: SortBy;
  order: SortOrder;
}

const initialState: IWinnersListState = {
  currentTab: 1,
  totalWinnersNumber: 1,
  sort: SortBy.Id,
  order: SortOrder.Asc,
  winnersList: [],
};

const winnersListSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    updateCurrentTab(state, action: PayloadAction<number>) {
      state.currentTab = action.payload;
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
  updateCurrentTab,
  updateTotalWinnersNumber,
  updateSortType,
  updateOrder,
  updateWinnersList,
} = winnersListSlice.actions;
export default winnersListSlice.reducer;
// ^^^ This way of exporting reducer doesn't provide autocomplite in vscode
