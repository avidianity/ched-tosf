declare global {
	interface String {
		parseNumbers(): number;
	}

	interface Error {
		toJSON(): Object;
	}
}

export {};
