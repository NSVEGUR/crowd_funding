export const getNewLabel = function (index: number) {
	const labels = [
		'#ECE0DB',
		'#FAEDCC',
		'#DEECDC',
		'#FAE3DE',
		'#D6E4EE',
		'#F5DFCC',
		'#E6DEED',
		'#F1E1E9',
		'#E3E2E0'
	];
	index = index % labels.length;
	return labels[index];
};
