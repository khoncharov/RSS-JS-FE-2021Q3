import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCarsList } from '../types';

interface GarageListState {
  currentPage: number;
  totalCarsNumber: number;
  carsList: TCarsList;
}

const initialState: GarageListState = {
  currentPage: 1,
  carsList: [],
  totalCarsNumber: 0,
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
    updateCarsList(state, action: PayloadAction<TCarsList>) {
      state.carsList = action.payload;
    },
  },
});

export const { updateCurrentPage, updateTotalCarsNumber, updateCarsList } = garageListSlice.actions;
export default garageListSlice.reducer;
