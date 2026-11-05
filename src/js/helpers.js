/**
* Определение поддержки hover: на <html> ставится has-hover или no-hover.
* От классов зависят миксины hover/active в scss/mixins/_helpers.scss.
*/
const html = document.documentElement;

const getScrollbarWidth = () => window.innerWidth - html.clientWidth;

const hasHoverSupport = () => {
	if (getScrollbarWidth()) {
		// На тач-устройствах ширина скроллбара обычно 0
		return true;
	}

	if (window.innerWidth < 1024) {
		return false;
	}

	if (window.matchMedia('(any-hover: hover)').matches || window.matchMedia('(hover: hover)').matches) {
		return true;
	}

	if (window.matchMedia('(hover: none)').matches) {
		return false;
	}

	return !('ontouchstart' in window);
};

const setHoverClass = () => {
	const hover = hasHoverSupport();

	html.classList.toggle('has-hover', hover);
	html.classList.toggle('no-hover', !hover);
};

let winWidth = window.innerWidth;

setHoverClass();

window.addEventListener('resize', () => {
	setTimeout(() => {
		if (winWidth !== window.innerWidth) {
			setHoverClass();
			winWidth = window.innerWidth;
		}
	}, 300);
});
