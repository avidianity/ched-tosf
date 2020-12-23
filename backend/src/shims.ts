if (!('toJSON' in Error.prototype)) {
	Object.defineProperty(Error.prototype, 'toJSON', {
		value: function () {
			var alt = {} as any;

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
		},
		configurable: true,
		writable: true,
	});
}
