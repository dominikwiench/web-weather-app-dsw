import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = import.meta.env.VITE_API_URL;

if (!apiKey) {
	console.error('brak klucza API w .env');
}

const axiosClient = axios.create({
	baseURL: baseURL,
	params: {
		appid: apiKey,
		units: 'metric',
		lang: 'pl',
	},
});

export default axiosClient;
