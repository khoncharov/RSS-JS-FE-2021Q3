import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './app-state/garage-list-slice';

export const store = configureStore({
  reducer: { garage: garageReducer },
});

// logging -----------------------------------------------------------------------------------
store.subscribe(() => console.log(store.getState()));
