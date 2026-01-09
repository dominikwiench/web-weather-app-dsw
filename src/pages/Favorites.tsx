import { Link } from 'react-router-dom';
import CityCard from '../components/CityCard';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleFavorite } from '../store/weatherSlice';
import { convertTemp } from '../utils/tempConverter';
import { BiArrowBack, BiStar } from 'react-icons/bi';

const Favorites: React.FC = () => {
	const dispatch = useAppDispatch();
	const { cityList, favorites, unit } = useAppSelector(
		(state) => state.weather
	);

	const favoriteCities = cityList.filter((city) => favorites.includes(city.id));

	return (
		<div className="container mx-auto p-4 md:p-8">
			<div className="flex items-center gap-4 mb-8">
				<Link to="/" className="text-slate-600 hover:text-blue-600 transition">
					<BiArrowBack size={24} />
				</Link>
				<h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
					<BiStar className="text-yellow-400" />
					Ulubione miasta
				</h1>
			</div>

			{favoriteCities.length === 0 ? (
				<div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
					<h2 className="text-2xl text-slate-400 font-semibold mb-2">
						Brak ulubionych miast
					</h2>
					<p className="text-slate-500 mb-6">
						Dodaj gwiazdkę przy mieście, aby zobaczyć je tutaj.
					</p>
					<Link
						to="/"
						className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
					>
						Wróć na stronę główną
					</Link>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{favoriteCities.map((city) => {
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
									iconCode={city.icon}
									isFavorite={true}
									onToggleFavorite={(e) => {
										e.preventDefault();
										dispatch(toggleFavorite(city.id));
									}}
								/>
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Favorites;
