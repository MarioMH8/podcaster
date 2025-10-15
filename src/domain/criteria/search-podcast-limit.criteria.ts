export default class SearchPodcastLimitCriteria {
	readonly #value: number;

	constructor(value: number) {
		// eslint-disable-next-line typescript/no-unnecessary-condition
		if (value === undefined || value === null) {
			throw new Error('Limit cannot be empty');
		}
		if (typeof value !== 'number' || Number.isNaN(value)) {
			throw new TypeError('Limit must be a number');
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
