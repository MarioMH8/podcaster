export default class SearchPodcastGenreCriteria {
	readonly #value: number;

	constructor(value: number) {
		if (value === undefined) {
			throw new Error('Genre cannot be empty');
		}

		if (value <= 0) {
			throw new Error('Genre must be greater than zero');
		}

		if (value > 100) {
			throw new Error('Genre must be less than or equal to 100');
		}

		this.#value = value;
	}

	get value(): number {
		return this.#value;
	}
}
