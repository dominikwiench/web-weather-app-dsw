import type { City, FullForecast } from '../types';

export const mockCities: City[] = [
	{
		id: 1,
		name: 'Warszawa',
		temp: 18,
		condition: 'Słonecznie',
		isFavorite: true,
	},
	{
		id: 2,
		name: 'Kraków',
		temp: 15,
		condition: 'Pochmurnie',
		isFavorite: false,
	},
	{
		id: 3,
		name: 'Wrocław',
		temp: 20,
		condition: 'Deszczowo',
		isFavorite: false,
	},
	{
		id: 4,
		name: 'Gdańsk',
		temp: 12,
		condition: 'Burzowo',
		isFavorite: true,
	},
	{
		id: 5,
		name: 'Poznań',
		temp: 17,
		condition: 'Śnieżnie',
		isFavorite: false,
	},
];

export const mockForecast: FullForecast = {
	current: {
		temp: 18,
		condition: 'słonecznie',
		humidity: 45,
		windSpeed: 15,
		windDir: 'NW',
		pressure: 1015,
		precipitation: 0,
		clouds: 10,
		iconCode: '01d',
	},
	daily: [
		{ date: 'Pon', temp: 19, condition: 'słonecznie', iconCode: '01d' },
		{ date: 'Wt', temp: 21, condition: 'pochmurnie', iconCode: '02d' },
		{ date: 'Śr', temp: 17, condition: 'deszczowo', iconCode: '09d' },
		{ date: 'Czw', temp: 16, condition: 'deszczowo', iconCode: '10d' },
		{ date: 'Pt', temp: 22, condition: 'słonecznie', iconCode: '01d' },
	],
};
