import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWinner } from '../types';

interface RaceWinner {
  car: Omit<IWinner, 'wins'>;
}

const initialState: RaceWinner = {
  car: { id: -1, time: -1 },
};

const raceSlice = createSlice({
  name: 'winner',
  initialState,
  reducers: {
    updateRaceWinner(state, action: PayloadAction<Omit<IWinner, 'wins'>>) {
      state.car = action.payload;
    },
  },
});

export const { updateRaceWinner } = raceSlice.actions;
export default raceSlice.reducer;
