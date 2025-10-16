export default class EpisodeDuration {
	readonly #value: number;

	constructor(value: number) {
		// eslint-disable-next-line typescript/no-unnecessary-condition
		if (value === undefined || value === null) {
			throw new Error('Episode duration cannot be empty');
		}
		if (typeof value !== 'number' || Number.isNaN(value)) {
			throw new TypeError('Episode duration must be a number');
		}

		this.#value = value;
	}

	get value(): number {
		return this.#value;
	}
}
