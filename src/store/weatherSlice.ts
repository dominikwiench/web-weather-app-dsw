import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Unit } from '../types';

interface WeatherState {
	unit: Unit;
}

const initialState: WeatherState = {
	unit: 'C',
};

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		setUnit: (state, action: PayloadAction<Unit>) => {
			state.unit = action.payload;
		},
	},
});

export const { setUnit } = weatherSlice.actions;
export default weatherSlice.reducer;
