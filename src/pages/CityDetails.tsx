import { useEffect, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	WiStrongWind,
	WiHumidity,
	WiBarometer,
	WiRaindrop,
	WiCloudy,
	WiSandstorm,
	WiDaySunny,
	WiNightClear,
	WiDayCloudy,
	WiRain,
	WiThunderstorm,
	WiSnow,
	WiFog,
} from 'react-icons/wi';
import { BiArrowBack, BiLoaderAlt } from 'react-icons/bi';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import { convertTemp } from '../utils/tempConverter';
import { fetchForecast } from '../store/weatherSlice';

// kod ikony z API na React Icon component
const getWeatherIcon = (code: string, size: number = 40) => {
	const iconProps = { size, className: 'shrink-0' };

	switch (code) {
		case '01d':
			return <WiDaySunny {...iconProps} className="text-yellow-400" />;
		case '01n':
			return <WiNightClear {...iconProps} className="text-yellow-200" />;
		case '02d':
		case '02n':
			return <WiDayCloudy {...iconProps} className="text-gray-200" />;
		case '03d':
		case '03n':
		case '04d':
		case '04n':
			return <WiCloudy {...iconProps} className="text-gray-300" />;
		case '09d':
		case '09n':
		case '10d':
		case '10n':
			return <WiRain {...iconProps} className="text-blue-300" />;
		case '11d':
		case '11n':
			return <WiThunderstorm {...iconProps} className="text-purple-400" />;
		case '13d':
		case '13n':
			return <WiSnow {...iconProps} className="text-gray-400" />;
		case '50d':
		case '50n':
			return <WiFog {...iconProps} className="text-gray-400" />;
		default:
			return <WiDayCloudy {...iconProps} className="text-yellow-400" />;
	}
};

const getWindDirection = (deg: number): string => {
	const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
	return directions[index];
};

type ViewState = 'today' | 'forecast';
type ViewAction = { type: 'SHOW_TODAY' } | { type: 'SHOW_FORECAST' };

const viewReducer = (state: ViewState, action: ViewAction): ViewState => {
	switch (action.type) {
		case 'SHOW_TODAY':
			return 'today';
		case 'SHOW_FORECAST':
			return 'forecast';
		default:
			return state;
	}
};

const CityDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	// pobranie stanu z redux
	const { currentCityDetails, status, unit, error } = useAppSelector(
		(state) => state.weather
	);

	const [viewMode, dispatchView] = useReducer(viewReducer, 'today');

	// pobierz dane danego miasta przy wejściu na stronę
	useEffect(() => {
		if (id) {
			dispatch(fetchForecast(id));
		}
	}, [dispatch, id]);

	if (status === 'loading' || !currentCityDetails) {
		return (
			<div className="flex justify-center items-center h-screen bg-blue-50">
				<BiLoaderAlt className="animate-spin text-blue-500" size={60} />
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto p-8 text-center">
				<h2 className="text-2xl text-red-600 mb-4">Wystąpił błąd</h2>
				<p>{error}</p>
				<button
					onClick={() => navigate('/')}
					className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
				>
					Wróć do strony głównej
				</button>
			</div>
		);
	}

	const current = currentCityDetails.current;
	const forecastNow = currentCityDetails.list[0];
	const precipChance = Math.round((forecastNow.pop || 0) * 100);
	const rainVol =
		(current.rain && current.rain['1h']) ||
		(forecastNow.rain && forecastNow.rain['3h']) ||
		0;
	const daily = currentCityDetails.list.filter((item) =>
		item.dt_txt.includes('12:00:00')
	);

	return (
		<div className="container mx-auto p-4 max-w-4xl min-h-screen">
			<button
				onClick={() => navigate('/')}
				className="flex items-center gap-2 text-slate-600 mb-6 hover:text-blue-600 transition"
			>
				<BiArrowBack /> Powrót
			</button>

			<div className="bg-white rounded-3xl shadow-xl overflow-hidden">
				<div className="bg-blue-600 p-8 text-white text-center flex flex-col items-center">
					<h1 className="text-4xl font-bold mb-2">{currentCityDetails.name}</h1>

					<div className="flex flex-col items-center justify-center my-2">
						<div className="mb-2">
							{getWeatherIcon(current.weather[0].icon, 80)}
						</div>
						<p className="text-blue-100 text-lg capitalize font-medium">
							{current.weather[0].description}
						</p>
					</div>

					<div className="text-6xl font-bold mb-4">
						{Math.round(convertTemp(current.main.temp, unit))}°{unit}
					</div>
					<p className="text-sm opacity-80">
						Odczuwalna: {Math.round(convertTemp(current.main.feels_like, unit))}
						°{unit}
					</p>
				</div>

				<div className="flex border-b border-slate-100">
					<button
						onClick={() => dispatchView({ type: 'SHOW_TODAY' })}
						className={`flex-1 p-4 font-semibold transition ${
							viewMode === 'today'
								? 'text-blue-600 border-b-2 border-blue-600'
								: 'text-slate-400 hover:text-slate-600'
						}`}
					>
						Szczegóły dzisiaj
					</button>
					<button
						onClick={() => dispatchView({ type: 'SHOW_FORECAST' })}
						className={`flex-1 p-4 font-semibold transition ${
							viewMode === 'forecast'
								? 'text-blue-600 border-b-2 border-blue-600'
								: 'text-slate-400 hover:text-slate-600'
						}`}
					>
						Prognoza 5-dniowa
					</button>
				</div>

				<div className="p-4 sm:p-8">
					{viewMode === 'today' ? (
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
							<DetailItem
								icon={<WiStrongWind size={40} />}
								label="Wiatr"
								value={`${current.wind.speed} m/s ${getWindDirection(
									current.wind.deg
								)}`}
							/>
							<DetailItem
								icon={<WiHumidity size={40} />}
								label="Wilgotność"
								value={`${current.main.humidity}%`}
							/>
							<DetailItem
								icon={<WiBarometer size={40} />}
								label="Ciśnienie"
								value={`${current.main.pressure} hPa`}
							/>
							<DetailItem
								icon={<WiRaindrop size={40} />}
								label="Opady (3h)"
								value={`${rainVol} mm/m²`}
							/>
							<DetailItem
								icon={<WiCloudy size={40} />}
								label="Zachmurzenie"
								value={`${current.clouds.all}%`}
							/>
							<DetailItem
								icon={<WiSandstorm size={40} className="text-blue-400" />}
								label="Szansa na opady"
								value={`${precipChance}%`}
							/>
						</div>
					) : (
						<div className="space-y-4">
							{daily.length > 0 ? (
								daily.map((day, index) => (
									<div
										key={index}
										className="flex justify-between items-center p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition"
									>
										<span className="font-bold w-24 text-slate-600 text-sm sm:text-base">
											{new Date(day.dt * 1000).toLocaleDateString('pl-PL', {
												weekday: 'short',
												day: 'numeric',
												month: 'numeric',
											})}
										</span>

										<div className="flex items-center gap-2 flex-1 justify-center">
											<div className="text-slate-400">
												{getWeatherIcon(day.weather[0].icon, 30)}
											</div>
											<span className="text-sm text-slate-500 capitalize text-center">
												{day.weather[0].description}
											</span>
										</div>

										<span className="font-bold text-lg text-slate-700 min-w-12 text-right">
											{Math.round(convertTemp(day.main.temp, unit))}°{unit}
										</span>
									</div>
								))
							) : (
								<p className="text-center text-slate-400">
									Brak danych prognozy pogody.
								</p>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

const DetailItem = ({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
}) => (
	<div className="flex flex-col items-center text-center p-4 bg-slate-50 rounded-xl">
		<div className="text-blue-500 mb-2">{icon}</div>
		<span className="text-slate-400 text-sm mb-1">{label}</span>
		<span className="text-slate-700 font-bold">{value}</span>
	</div>
);

export default CityDetails;
