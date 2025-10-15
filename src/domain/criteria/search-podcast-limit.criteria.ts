export default class SearchPodcastLimitCriteria {
	readonly #value: number;

	constructor(value: number) {
		if (value === undefined) {
			throw new Error('Limit cannot be empty');
		}

		if (value <= 0) {
			throw new Error('Limit must be greater than zero');
		}

		if (value > 100) {
			throw new Error('Limit must be less than or equal to 100');
		}

		this.#value = value;
	}

	get value(): number {
		return this.#value;
	}
}
