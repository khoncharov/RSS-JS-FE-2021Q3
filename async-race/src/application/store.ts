import { configureStore } from '@reduxjs/toolkit';
import garageReducer, { updateCurrentPage } from './app-state/garage-list-slice';

export const store = configureStore({
  reducer: { garage: garageReducer },
});

store.subscribe(() => console.log(store.getState()));
