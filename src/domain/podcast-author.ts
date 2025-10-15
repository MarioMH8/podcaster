export default class PodcastAuthor {
	readonly #value: string;

	constructor(value: string) {
		if (!value || value.length === 0) {
			throw new Error('Podcast author cannot be empty');
		}

		this.#value = value;
	}

	get value(): string {
		return this.#value;
	}
}
