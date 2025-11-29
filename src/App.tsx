import { useState } from 'react';
import Header from './components/Header';
import CityCard from './components/CityCard';
import { mockCities } from './data/mockData';
import type { City } from './types';

function App() {
	const [cities] = useState<City[]>(mockCities);

	return (
		<div className="min-h-screen flex flex-col bg-blue-50">
			<Header />

			<main className="grow container mx-auto p-4 md:p-8">
				<div className="mb-8 max-w-xl mx-auto">
					<input
						type="text"
						placeholder="Szukaj miasta..."
						className="w-full p-4 pl-6 rounded-full border-none shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg text-slate-600 placeholder-slate-400"
					/>
				</div>

				<section>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl font-bold text-slate-700">
							Dzisiejsza pogoda
						</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{cities.map((city) => (
							<CityCard
								key={city.id}
								name={city.name}
								temp={city.temp}
								condition={city.condition}
								isFavorite={city.isFavorite}
							/>
						))}
					</div>
				</section>
			</main>

			<footer className="bg-slate-800 text-slate-400 p-6 text-center text-sm">
				<p>&copy; 2025 JakaPogoda. Projekt powstał w React & TypeScript.</p>
			</footer>
		</div>
	);
}

export default App;
