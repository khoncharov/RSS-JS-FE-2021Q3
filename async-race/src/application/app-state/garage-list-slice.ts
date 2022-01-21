import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CarsList } from '../types';

interface GarageListState {
  currentPage: number;
  totalCarsNumber: number;
  carsList: CarsList;
}

const initialState: GarageListState = {
  currentPage: 1,
  carsList: [
    { id: 22, name: 'MAZ', color: '#ff00ff' },
    { id: 24, name: 'ZAZ', color: '#0000ff' },
    { id: 25, name: 'PAZ', color: '#ff0000' },
  ],
  totalCarsNumber: 3, // ----------------------------------
};

const garageListSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    updateCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    updateTotalCarsNumber(state, action: PayloadAction<number>) {
      state.totalCarsNumber = action.payload;
    },
    updateCarsList(state, action: PayloadAction<CarsList>) {
      state.carsList = action.payload;
    },
  },
});

export const { updateCurrentPage, updateTotalCarsNumber, updateCarsList } = garageListSlice.actions;
export default garageListSlice.reducer;
