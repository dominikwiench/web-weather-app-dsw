import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';

const store = configureStore({
	reducer: {
		weather: weatherReducer,
	},
});

store.subscribe(() => {
	const state = store.getState().weather;
	localStorage.setItem('weather-app-config', JSON.stringify(state));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
