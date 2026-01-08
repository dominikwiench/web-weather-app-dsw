import {
	createSlice,
	type PayloadAction,
	createAsyncThunk,
} from '@reduxjs/toolkit';
import type { Unit, WeatherData } from '../types';
import axiosClient from '../api/axiosClient';

export const fetchWeatherByCity = createAsyncThunk(
	'weather/fetchByCity',
	async (city: string, { rejectWithValue }) => {
		try {
			const response = await axiosClient.get('/weather', {
				params: { q: city },
			});
			const data = response.data;
			return {
				id: data.id,
				name: data.name,
				temp: data.main.temp,
				condition: data.weather[0].description,
				icon: data.weather[0].icon,
			} as WeatherData;
		} catch (error: any) {
			return rejectWithValue(
				error.response?.data?.message || 'Błąd pobierania danych'
			);
		}
	}
);

interface WeatherState {
	unit: Unit;
	favorites: number[];
	cityList: WeatherData[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const loadState = () => {
	const saved = localStorage.getItem('weather-app-settings');
	if (saved) {
		const parsed = JSON.parse(saved);
		return {
			unit: parsed.unit || 'C',
			favorites: parsed.favorites || [],
		};
	}
	return { unit: 'C', favorites: [] };
};

const settings = loadState();

const initialState: WeatherState = {
	unit: settings.unit as Unit,
	favorites: settings.favorites,
	cityList: [],
	status: 'idle',
	error: null,
};

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
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeatherByCity.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchWeatherByCity.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const exists = state.cityList.find((c) => c.id === action.payload.id);
				if (!exists) {
					state.cityList.push(action.payload);
				}
			})
			.addCase(fetchWeatherByCity.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload as string;
			});
	},
});

export const { setUnit, toggleFavorite } = weatherSlice.actions;
export default weatherSlice.reducer;
