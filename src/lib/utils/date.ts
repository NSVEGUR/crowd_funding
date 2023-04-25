export const timestampToDate = function (timestamp: number | string) {
	const date = new Date(timestamp);
	return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export const getDaysLeft = function (timestamp: number | string) {
	const date = new Date(timestamp);
	const curDate = new Date();
	const diffTime = date.getTime() - curDate.getTime();
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
	return diffDays >= 0 ? diffDays : 0;
};

export const timestampToTimeAndDate = function (timestamp: number | string) {
	const date = new Date(timestamp);
	return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}, at ${date.getHours()}:${date.getMinutes()}`;
};
