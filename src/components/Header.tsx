import React from 'react';
import { WiDaySunny } from 'react-icons/wi';
import type { Unit } from '../types';
import { setUnit } from '../store/weatherSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
	const dispatch = useAppDispatch();
	const currentUnit = useAppSelector((state) => state.weather.unit);

	return (
		<header className="bg-blue-700 text-white p-4 shadow-lg sticky top-0 z-50">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center gap-2">
					<WiDaySunny size={40} className="text-yellow-400 animate-pulse" />
					<h1 className="text-2xl font-bold tracking-wider">JakaPogoda?</h1>
				</div>

				<nav className="flex gap-8 text-md">
					<Link
						to="/"
						className="hover:text-blue-200 font-semibold transition-colors"
					>
						Pogoda
					</Link>
					<Link
						to="/favorites"
						className="hover:text-blue-200 font-semibold transition-colors flex items-center gap-1"
					>
						Ulubione miasta
					</Link>
				</nav>

				<div className="flex bg-blue-800 rounded-lg overflow-hidden border border-blue-500">
					{(['C', 'F', 'K'] as Unit[]).map((unit) => (
						<button
							key={unit}
							onClick={() => dispatch(setUnit(unit))}
							className={`px-3 py-1 text-sm font-bold transition-colors ${
								currentUnit === unit
									? 'bg-yellow-400 text-blue-900'
									: 'text-blue-200 hover:bg-blue-700'
							}`}
						>
							°{unit}
						</button>
					))}
				</div>
			</div>
		</header>
	);
};

export default Header;
