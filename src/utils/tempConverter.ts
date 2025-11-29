import { type Unit } from '../types';

export const convertTemp = (temp: number, unit: Unit): number => {
	if (unit === 'F') return (temp * 9) / 5 + 32;
	if (unit === 'K') return temp + 273.15;
	return temp;
};
