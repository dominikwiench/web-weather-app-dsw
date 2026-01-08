import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';

const store = configureStore({
	reducer: {
		weather: weatherReducer,
	},
});

store.subscribe(() => {
	const state = store.getState().weather;
	const configToSave = {
		unit: state.unit,
		favorites: state.favorites,
		savedCityNames: state.savedCityNames,
	};
	localStorage.setItem('weather-app-settings', JSON.stringify(configToSave));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
