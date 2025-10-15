export default class PodcastId {
	readonly #value: number;

	constructor(value: number) {
		if (value === undefined) {
			throw new Error('Podcast id cannot be empty');
		}

		this.#value = value;
	}

	get value(): number {
		return this.#value;
	}
}
