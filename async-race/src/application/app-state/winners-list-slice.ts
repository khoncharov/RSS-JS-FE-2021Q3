import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWinnersList } from '../types';

interface WinnersListState {
  currentPage: number;
  totalWinnersNumber: number;
  winnersList: TWinnersList;
}

const initialState: WinnersListState = {
  currentPage: 12,
  totalWinnersNumber: 11,
  winnersList: [
    { id: 1, winsCount: 5, bestTime: 1.11, name: 'Tesla S', color: '#00ff89' },
    { id: 2, winsCount: 3, bestTime: 3.14, name: 'Maz 500', color: '#ff8900' },
    { id: 3, winsCount: 1, bestTime: 4.51, name: 'Zaz 400', color: '#ffff89' },
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
    updateWinnersList(state, action: PayloadAction<TWinnersList>) {
      state.winnersList = action.payload;
    },
  },
});

export const { updateCurrentPage, updateTotalWinnersNumber } = winnersListSlice.actions;
export default winnersListSlice.reducer;
// ^^^ This way of exporting reducer doesn't provide autocomplite in vscode
