import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CityCard from '../components/CityCard';
import { useAppSelector } from '../store/hooks';
import { convertTemp } from '../utils/tempConverter';
import { useAppDispatch } from '../store/hooks';
import { fetchWeatherByCity, toggleFavorite } from '../store/weatherSlice';
import { BiSearch } from 'react-icons/bi';

const Home: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');

	// pobranie stanu z redux
	const dispatch = useAppDispatch();
	const { cityList, favorites, unit, error, savedCityNames } = useAppSelector(
		(state) => state.weather
	);

	// lista miast na start
	useEffect(() => {
		if (cityList.length === 0 && savedCityNames.length > 0) {
			savedCityNames.forEach((city) => {
				if (city) dispatch(fetchWeatherByCity(city));
			});
		}
	}, [dispatch, cityList.length, savedCityNames]);

	// wyszukiwanie miast
	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (searchTerm.trim()) {
			dispatch(fetchWeatherByCity(searchTerm));
			setSearchTerm('');
		}
	};

	return (
		<div className="container mx-auto p-4 md:p-8">
			<form onSubmit={handleSearch} className="mb-8 max-w-xl mx-auto relative">
				<input
					type="text"
					placeholder="Wpisz nazwę miasta..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full p-4 pl-6 pr-12 rounded-full border-none shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-slate-600 placeholder-slate-400"
				/>
				<button
					type="submit"
					className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700"
				>
					<BiSearch size={24} />
				</button>
			</form>

			{error && (
				<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center">
					Ups! {error}
				</div>
			)}

			<section>
				<h2 className="text-2xl font-bold text-slate-700 mb-6">
					Dzisiejsza pogoda
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{cityList.map((city) => {
						const isFav = favorites.includes(city.id);
						const displayTemp = convertTemp(city.temp, unit);

						return (
							<Link
								to={`/city/${city.id}`}
								key={city.id}
								className="block group"
							>
								<CityCard
									name={city.name}
									temp={displayTemp}
									condition={city.condition}
									isFavorite={isFav}
									onToggleFavorite={(e) => {
										e.preventDefault();
										dispatch(toggleFavorite(city.id));
									}}
								/>
							</Link>
						);
					})}
				</div>
			</section>
		</div>
	);
};

export default Home;
