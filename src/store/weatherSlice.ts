import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Unit } from '../types';

interface WeatherState {
	unit: Unit;
	favorites: number[];
}

const STORAGE_KEY = 'weather-app-config';

const loadState = (): WeatherState => {
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved) {
		return JSON.parse(saved);
	}
	return { unit: 'C', favorites: [] };
};

const initialState: WeatherState = loadState();

const weatherSlice = createSlice({
	name: 'weather',
	initialState,
	reducers: {
		setUnit: (state, action: PayloadAction<Unit>) => {
			state.unit = action.payload;
		},
		toggleFavorite: (state, action: PayloadAction<number>) => {
			const cityId = action.payload;
			if (state.favorites.includes(cityId)) {
				state.favorites = state.favorites.filter((id) => id !== cityId);
			} else {
				state.favorites.push(cityId);
			}
		},
	},
});

export const { setUnit, toggleFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;
