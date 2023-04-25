import { writable } from 'svelte/store';

export interface SnackBar {
	status: Status;
	message: string;
	icon: string;
	style: string;
}

export enum Status {
	ERROR = 'ERROR',
	SUCCESS = 'SUCCESS',
	PROMISE = 'PROMISE',
	IDLE = 'IDLE'
}

const createSnackBar = () => {
	const snackbar: SnackBar = {
		status: Status.IDLE,
		message: '',
		icon: '🤡',
		style: ''
	};
	const { subscribe, set, update } = writable(snackbar);
	const error = function (message: string, style = '') {
		update(() => {
			return {
				status: Status.ERROR,
				message,
				icon: '❌',
				style
			};
		});
	};
	const success = function (message: string, style = '') {
		update(() => {
			return {
				status: Status.SUCCESS,
				message,
				icon: '✅',
				style
			};
		});
	};
	const promise = function (message: string, style = '') {
		update(() => {
			return {
				status: Status.PROMISE,
				message,
				icon: '⏳',
				style
			};
		});
	};
	const reset = function () {
		update(() => {
			return {
				status: Status.IDLE,
				message: '',
				icon: '🤡',
				style: ''
			};
		});
	};
	return {
		subscribe,
		set,
		update,
		error,
		success,
		promise,
		reset
	};
};

export const snackbarHandler = (store: SnackBar) => {
	if (store.status === Status.ERROR || store.status === Status.SUCCESS) {
		setTimeout(() => {
			snackbar.reset();
		}, 4000);
	}
};

export const snackbar = createSnackBar();
