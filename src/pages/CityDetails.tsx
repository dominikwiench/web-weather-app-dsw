import React, { useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockForecast, mockCities } from '../data/mockData';
import {
	WiStrongWind,
	WiHumidity,
	WiBarometer,
	WiRaindrop,
	WiCloudy,
} from 'react-icons/wi';
import { BiArrowBack } from 'react-icons/bi';

import { useAppSelector } from '../store/hooks';
import { convertTemp } from '../utils/tempConverter';

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

	// pobranie stanu z redux
	const unit = useAppSelector((state) => state.weather.unit);

	const cityName =
		mockCities.find((c) => c.id === Number(id))?.name || 'Nieznane miasto';

	const [viewMode, dispatch] = useReducer(viewReducer, 'today');

	const current = mockForecast.current;
	const daily = mockForecast.daily;

	return (
		<div className="container mx-auto p-4 max-w-4xl">
			<button
				onClick={() => navigate('/')}
				className="flex items-center gap-2 text-slate-600 mb-6 hover:text-blue-600 transition"
			>
				<BiArrowBack /> Powrót
			</button>

			<div className="bg-white rounded-3xl shadow-xl overflow-hidden">
				<div className="bg-blue-600 p-8 text-white text-center">
					<h1 className="text-4xl font-bold mb-2">{cityName}</h1>
					<p className="text-blue-100 text-lg capitalize">
						{current.condition}
					</p>
					<div className="text-6xl font-bold my-4">
						{Math.round(convertTemp(current.temp, unit))}°{unit}
					</div>
				</div>

				<div className="flex border-b border-slate-100">
					<button
						onClick={() => dispatch({ type: 'SHOW_TODAY' })}
						className={`flex-1 p-4 font-semibold transition ${
							viewMode === 'today'
								? 'text-blue-600 border-b-2 border-blue-600'
								: 'text-slate-400 hover:text-slate-600'
						}`}
					>
						Szczegóły dzisiaj
					</button>
					<button
						onClick={() => dispatch({ type: 'SHOW_FORECAST' })}
						className={`flex-1 p-4 font-semibold transition ${
							viewMode === 'forecast'
								? 'text-blue-600 border-b-2 border-blue-600'
								: 'text-slate-400 hover:text-slate-600'
						}`}
					>
						Prognoza 5-dniowa
					</button>
				</div>

				<div className="p-8">
					{viewMode === 'today' ? (
						<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
							<DetailItem
								icon={<WiStrongWind size={40} />}
								label="Wiatr"
								value={`${current.windSpeed} km/h ${current.windDir}`}
							/>
							<DetailItem
								icon={<WiHumidity size={40} />}
								label="Wilgotność"
								value={`${current.humidity}%`}
							/>
							<DetailItem
								icon={<WiBarometer size={40} />}
								label="Ciśnienie"
								value={`${current.pressure} hPa`}
							/>
							<DetailItem
								icon={<WiRaindrop size={40} />}
								label="Opady"
								value={`${current.precipitation} mm`}
							/>
							<DetailItem
								icon={<WiCloudy size={40} />}
								label="Zachmurzenie"
								value={`${current.clouds}%`}
							/>
							<DetailItem
								icon={<WiRaindrop size={40} className="text-blue-400" />}
								label="Szansa opadów"
								value="30%" //to-do: zmienic na rzeczywista wartosc z API
							/>
						</div>
					) : (
						<div className="space-y-4">
							{daily.map((day, index) => (
								<div
									key={index}
									className="flex justify-between items-center p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition"
								>
									<span className="font-bold w-16">{day.date}</span>
									<div className="flex items-center gap-2 flex-1 justify-center">
										<span className="text-sm text-slate-500">
											{day.condition}
										</span>
									</div>
									<span className="font-bold text-lg">
										{Math.round(convertTemp(day.temp, unit))}°{unit}
									</span>
								</div>
							))}
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
