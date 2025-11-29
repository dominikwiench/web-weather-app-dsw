import { useState } from 'react';
import { Link } from 'react-router-dom';
import CityCard from '../components/CityCard';
import { mockCities } from '../data/mockData';
import type { City } from '../types';

const Home: React.FC = () => {
	const [cities] = useState<City[]>(mockCities);
	const [searchTerm, setSearchTerm] = useState('');

	const filteredCities = cities.filter((city) =>
		city.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="container mx-auto p-4 md:p-8">
			<div className="mb-8 max-w-xl mx-auto">
				<input
					type="text"
					placeholder="Szukaj miasta..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="w-full p-4 pl-6 rounded-full border-none shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-slate-600 placeholder-slate-400"
				/>
			</div>

			<section>
				<h2 className="text-2xl font-bold text-slate-700 mb-6">
					Dzisiejsza pogoda
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
					{filteredCities.map((city) => (
						<Link to={`/city/${city.id}`} key={city.id} className="block">
							<CityCard
								name={city.name}
								temp={city.temp}
								condition={city.condition}
								isFavorite={city.isFavorite}
							/>
						</Link>
					))}
				</div>
			</section>
		</div>
	);
};

export default Home;
