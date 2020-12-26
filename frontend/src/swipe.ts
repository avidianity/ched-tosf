export class Swipe {
	protected xDown = 0;
	protected yDown = 0;
	protected xDiff = 0;
	protected yDiff = 0;
	protected element: any;
	constructor(element: string | Element | null) {
		this.element = typeof element === 'string' ? document.querySelector(element) : element;

		this.element.addEventListener(
			'touchstart',
			(evt: any) => {
				this.xDown = evt.touches[0].clientX;
				this.yDown = evt.touches[0].clientY;
			},
			false
		);
	}

	onLeft(callback?: any) {
		this.onLeft = callback ? callback : this.onLeft;

		return this;
	}

	onRight(callback?: any) {
		this.onRight = callback ? callback : this.onRight;

		return this;
	}

	onUp(callback?: any) {
		this.onUp = callback ? callback : this.onUp;

		return this;
	}

	onDown(callback?: any) {
		this.onDown = callback ? callback : this.onDown;

		return this;
	}

	handleTouchMove(evt: any) {
		if (!this.xDown || !this.yDown) {
			return;
		}

		var xUp = evt.touches[0].clientX;
		var yUp = evt.touches[0].clientY;

		this.xDiff = this.xDown - xUp;
		this.yDiff = this.yDown - yUp;

		if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) {
			// Most significant.
			if (this.xDiff > 0) {
				(this as any).onLeft();
			} else {
				(this as any).onRight();
			}
		} else {
			if (this.yDiff > 0) {
				(this as any).onUp();
			} else {
				(this as any).onDown();
			}
		}

		// Reset values.
		this.xDown = 0;
		this.yDown = 0;
	}

	run() {
		this.element.addEventListener(
			'touchmove',
			(evt: any) => {
				this.handleTouchMove(evt);
			},
			false
		);
	}
}
