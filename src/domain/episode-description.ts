export default class EpisodeDescription {
	readonly #value: string;

	constructor(value: string) {
		if (!value || value.length === 0) {
			throw new Error('Episode description cannot be empty');
		}

		this.#value = value;
	}

	get value(): string {
		return this.#value;
	}
}
