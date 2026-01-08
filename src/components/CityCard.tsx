import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import {
	WiDaySunny,
	WiCloudy,
	WiRain,
	WiThunderstorm,
	WiSnow,
	WiFog,
	WiDayCloudy,
	WiNightClear,
} from 'react-icons/wi';

interface CityCardProps {
	name: string;
	temp: number;
	condition: string;
	iconCode?: string;
	isFavorite: boolean;
	onToggleFavorite?: (e: React.MouseEvent) => void;
}

const getWeatherIcon = (condition: string) => {
	const iconProps = { size: 40, className: 'shrink-0' };

	switch (condition.toLowerCase()) {
		case '01d':
			return <WiDaySunny {...iconProps} className="text-yellow-500" />;
		case '01n':
			return <WiNightClear {...iconProps} className="text-slate-400" />;

		case '02d':
		case '02n':
			return <WiDayCloudy {...iconProps} className="text-yellow-400" />;

		case '03d':
		case '03n':
		case '04d':
		case '04n':
			return <WiCloudy {...iconProps} className="text-gray-400" />;

		case '09d':
		case '09n':
		case '10d':
		case '10n':
			return <WiRain {...iconProps} className="text-blue-400" />;
		case '11d':
		case '11n':
			return <WiThunderstorm {...iconProps} className="text-purple-500" />;
		case '13d':
		case '13n':
			return <WiSnow {...iconProps} className="text-blue-200" />;
		case '50d':
		case '50n':
			return <WiFog {...iconProps} className="text-gray-300" />;
		default:
			return <WiDayCloudy {...iconProps} className="text-yellow-500" />;
	}
};

const CityCard: React.FC<CityCardProps> = ({
	name,
	temp,
	condition,
	iconCode,
	isFavorite,
	onToggleFavorite,
}) => {
	return (
		<div className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 group overflow-hidden">
			<button
				onClick={onToggleFavorite}
				className="absolute top-0 right-0 p-3 z-10 text-2xl focus:outline-none hover:scale-110 transition-transform text-slate-300 hover:text-yellow-400"
				aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
			>
				{isFavorite ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
			</button>

			<div className="flex justify-between items-center p-4 pr-12 sm:p-6 sm:pr-14">
				<div className="flex flex-col min-w-0 mr-2">
					<h2
						className="text-lg sm:text-2xl font-bold text-slate-800 truncate"
						title={name}
					>
						{name}
					</h2>
					<span className="text-sm text-slate-500 font-medium capitalize truncate">
						{condition}
					</span>
				</div>

				<div className="flex items-center gap-2 sm:gap-4 shrink-0 whitespace-nowrap">
					<div className="hidden xs:block sm:block scale-90 sm:scale-100">
						{getWeatherIcon(iconCode || condition)}
					</div>
					<div className="block sm:hidden scale-75 -mr-2">
						{getWeatherIcon(iconCode || condition)}
					</div>

					<span className="text-3xl sm:text-4xl font-bold text-slate-700">
						{Math.round(temp)}°
					</span>
				</div>
			</div>
		</div>
	);
};

export default CityCard;
