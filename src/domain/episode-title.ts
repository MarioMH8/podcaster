export default class EpisodeTitle {
	readonly #value: string;

	constructor(value: string) {
		if (!value || value.length === 0) {
			throw new Error('Episode title cannot be empty');
		}

		this.#value = value;
	}

	get value(): string {
		return this.#value;
	}
}
