export default class EpisodeUrl {
	readonly #value: string;

	constructor(value: string) {
		if (!value || value.length === 0) {
			throw new Error('Episode url cannot be empty');
		}

		this.#value = value;
	}

	get value(): string {
		return this.#value;
	}
}
