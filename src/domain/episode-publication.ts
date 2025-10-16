export default class EpisodePublication {
	readonly #value: Date;

	constructor(value: Date) {
		// eslint-disable-next-line typescript/no-unnecessary-condition
		if (value === undefined || value === null) {
			throw new Error('Episode publication cannot be empty');
		}

		this.#value = value;
	}

	get value(): Date {
		return this.#value;
	}
}
