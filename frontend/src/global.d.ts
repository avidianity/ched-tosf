declare global {
	interface String {
		parseNumbers(): number;
	}

	interface Error {
		toJSON(): Object;
	}

	type FeeTypes =
		| 'Tuition Fees'
		| 'Athletic Fee'
		| 'Computer Fee'
		| 'Cultural Fee'
		| 'Development Fee'
		| 'Guidance Fee'
		| 'Handbook Fee'
		| 'Laboratory Fee'
		| 'Library Fee'
		| 'Medical & Dental Fee'
		| 'Registration Fee'
		| 'Admission Fee'
		| 'Entrance Fee'
		| 'Assessment Fee'
		| 'Others';
}

export {};
