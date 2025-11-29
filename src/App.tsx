import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CityDetails from './pages/CityDetails';

function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col bg-blue-50">
				<Header />

				<main className="grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/city/:id" element={<CityDetails />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</main>

				<footer className="bg-slate-800 text-slate-400 p-6 text-center text-sm">
					<p>&copy; 2025 JakaPogoda.</p>
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
