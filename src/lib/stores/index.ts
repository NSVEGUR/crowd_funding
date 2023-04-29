import { writable } from 'svelte/store';
import type { Campaign } from '@prisma/client';

export interface SearchData extends Campaign {
	user: {
		email: string;
	};
	searchTerms: string;
}

export const createSearchStore = (data: SearchData[]) => {
	const { subscribe, set, update } = writable({
		data: data,
		filtered: data,
		search: ''
	});

	return {
		subscribe,
		set,
		update
	};
};

export const searchHandler = (store: {
	data: SearchData[];
	filtered: SearchData[];
	search: string;
}) => {
	const searchTerm = store.search.toLowerCase() || '';
	store.filtered = store.data.filter((item) => {
		return item.searchTerms.toLowerCase().includes(searchTerm);
	});
};

export const toggleNav = writable(false);
export const toggleMenu = writable(false);
export const search = writable('');
