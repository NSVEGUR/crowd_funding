import { elasticOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export const elasticScale = function (
	node: Element,
	{ delay = 100, duration = 600, easing = elasticOut } = {}
): TransitionConfig {
	return {
		delay,
		duration,
		css: (t) => {
			const eased = easing(0.7 * t);
			return `
				scale: ${eased};
				transform-origin: top right;
			`;
		}
	};
};
