export default class PodcastId {
	readonly #value: number;

	constructor(value: number) {
		// eslint-disable-next-line typescript/no-unnecessary-condition
		if (value === undefined || value === null) {
			throw new Error('Podcast id cannot be empty');
		}
		if (typeof value !== 'number' || Number.isNaN(value)) {
			throw new TypeError('Podcast id must be a number');
		}

		this.#value = value;
	}

	get value(): number {
		return this.#value;
	}
}
