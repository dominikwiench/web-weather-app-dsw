export type Unit = 'C' | 'F' | 'K';

export interface City {
	id: number;
	name: string;
	temp: number;
	condition: string;
	isFavorite: boolean;
}

export interface WeatherDetails {
	temp: number;
	condition: string;
	humidity: number;
	windSpeed: number;
	windDir: string;
	pressure: number;
	precipitation: number;
	clouds: number;
	iconCode: string;
}

export interface DailyForecast {
	date: string;
	temp: number;
	condition: string;
	iconCode: string;
}

export interface FullForecast {
	current: WeatherDetails;
	daily: DailyForecast[];
}

export interface WeatherData {
	id: number;
	name: string;
	temp: number;
	condition: string;
	icon: string;
}

export interface WeatherError {
	message: string;
}

export interface ForecastItem {
	dt: number;
	dt_txt: string;
	main: {
		temp: number;
		feels_like: number;
		pressure: number;
		humidity: number;
	};
	weather: {
		description: string;
		icon: string;
	}[];
	clouds: {
		all: number;
	};
	wind: {
		speed: number;
		deg: number;
	};
	pop: number;
	rain?: {
		'3h': number;
	};
}

export interface CityDetailsData {
	name: string;
	current: ForecastItem;
	list: ForecastItem[];
}
