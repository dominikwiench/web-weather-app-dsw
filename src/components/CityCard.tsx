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
} from 'react-icons/wi';

interface CityCardProps {
	name: string;
	temp: number;
	condition: string;
	isFavorite: boolean;
}

const getWeatherIcon = (condition: string) => {
	switch (condition.toLowerCase()) {
		case 'słonecznie':
			return <WiDaySunny size={50} className="text-yellow-500" />;
		case 'pochmurnie':
			return <WiCloudy size={50} className="text-gray-400" />;
		case 'deszczowo':
			return <WiRain size={50} className="text-blue-400" />;
		case 'burzowo':
			return <WiThunderstorm size={50} className="text-purple-500" />;
		case 'śnieżnie':
			return <WiSnow size={50} className="text-blue-200" />;
		case 'mgła':
			return <WiFog size={50} className="text-gray-300" />;
		default:
			return <WiDayCloudy size={50} className="text-yellow-500" />;
	}
};

const CityCard: React.FC<CityCardProps> = ({
	name,
	temp,
	condition,
	isFavorite,
}) => {
	return (
		<div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-200 flex justify-between items-center border border-slate-100">
			<div className="flex flex-col">
				<h2 className="text-2xl font-bold text-slate-800">{name}</h2>
				<div className="flex items-center gap-2 mt-1 text-slate-500 font-medium">
					{condition}
				</div>
			</div>

			<div className="flex items-center gap-6">
				<div>{getWeatherIcon(condition)}</div>

				<div className="text-right min-w-20">
					<span className="text-4xl font-bold text-slate-700">
						{Math.round(temp)}°
					</span>
				</div>

				<button
					className="text-yellow-400 text-2xl hover:scale-125 transition-transform p-2 focus:outline-none"
					aria-label={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
				>
					{isFavorite ? (
						<FaStar />
					) : (
						<FaRegStar className="text-slate-300 hover:text-yellow-400" />
					)}
				</button>
			</div>
		</div>
	);
};

export default CityCard;
