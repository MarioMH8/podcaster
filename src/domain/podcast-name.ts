export default class PodcastName {
	readonly #value: string;

	constructor(value: string) {
		if (!value || value.length === 0) {
			throw new Error('Podcast name cannot be empty');
		}

		this.#value = value;
	}

	get value(): string {
		return this.#value;
	}
}
