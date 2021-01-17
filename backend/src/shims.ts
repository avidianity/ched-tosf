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
		| 'Others';
}

// eslint-disable-next-line
Error.prototype.toJSON = function () {
	const alt = {} as any;

	const _this = this as any;
	Object.getOwnPropertyNames(_this).forEach(function (key) {
		alt[key] = _this[key];
	}, _this);

	if ('stack' in alt) {
		alt.stack = alt.stack
			.split(/\r?\n/)
			.map((string: string) => string.trim())
			.filter((_: any, i: number) => i !== 0);
	}

	return alt;
};

// eslint-disable-next-line
String.prototype.parseNumbers = function () {
	const parts = this.split('.');
	if (parts.length > 1) {
		const whole = (parts[0].match(/\d/g) || []).join('');
		const decimals = (parts[1].match(/\d/g) || []).join('');
		return Number(`${whole}.${decimals}`) || 0;
	}
	const match = this.match(/\d/g);
	if (!match) {
		return 0;
	}
	return Number(match.join('')) || 0;
};

export {};
