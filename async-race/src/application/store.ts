import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './app-state/garage-list-slice';
import winnersReducer from './app-state/winners-list-slice';
import winnerReducer from './app-state/race-slice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
    winner: winnerReducer,
  },
});
