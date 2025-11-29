import React from 'react';
import { WiDaySunny } from 'react-icons/wi';

const Header: React.FC = () => {
	return (
		<header className="bg-blue-700 text-white p-4 shadow-lg sticky top-0 z-50">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center gap-2">
					<WiDaySunny size={40} className="text-yellow-400 animate-pulse" />
					<h1 className="text-2xl font-bold tracking-wider">JakaPogoda?</h1>
				</div>

				<nav className="flex gap-8 text-md">
					<button className="hover:text-blue-200 font-semibold transition-colors">
						Pogoda
					</button>
					<button className="hover:text-blue-200 font-semibold transition-colors">
						Ulubione miasta
					</button>
				</nav>

				<div className="bg-blue-700 px-3 py-1 rounded text-sm font-mono cursor-pointer hover:bg-blue-800 transition">
					°C | °F | °K
				</div>
			</div>
		</header>
	);
};

export default Header;
