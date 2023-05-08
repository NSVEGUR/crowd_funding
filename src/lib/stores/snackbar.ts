import { writable } from 'svelte/store';

export interface SnackBar {
	status: Status;
	message: string;
	icon: string;
	style: string;
	time: number;
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
		style: '',
		time: 4000
	};
	const { subscribe, set, update } = writable(snackbar);
	const error = function (message: string, style = '', time = 4000) {
		update(() => {
			return {
				status: Status.ERROR,
				message,
				icon: '❌',
				style,
				time
			};
		});
	};
	const success = function (message: string, style = '', time = 4000) {
		update(() => {
			return {
				status: Status.SUCCESS,
				message,
				icon: '✅',
				style,
				time
			};
		});
	};
	const promise = function (message: string, style = '', time = 4000) {
		update(() => {
			return {
				status: Status.PROMISE,
				message,
				icon: '⏳',
				style,
				time
			};
		});
	};
	const reset = function () {
		update(() => {
			return {
				status: Status.IDLE,
				message: '',
				icon: '🤡',
				style: '',
				time: 4000
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
		}, store.time);
	}
};

export const snackbar = createSnackBar();
