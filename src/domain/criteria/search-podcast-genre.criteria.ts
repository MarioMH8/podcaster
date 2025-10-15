export default class SearchPodcastGenreCriteria {
	readonly #value: number;

	constructor(value: number) {
		// eslint-disable-next-line typescript/no-unnecessary-condition
		if (value === undefined || value === null) {
			throw new Error('Genre cannot be empty');
		}
		if (typeof value !== 'number' || Number.isNaN(value)) {
			throw new TypeError('Genre must be a number');
		}

		this.#value = value;
	}

	get value(): number {
		return this.#value;
	}
}
