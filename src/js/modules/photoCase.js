import lazyLoading from './lazyLoading';

/**
 * Кейс «до/после»: вкладки [data-photo-case-tab] переключают ракурс [data-photo-case-panel]
 * и сразу грузят lazy-картинки открытого ракурса (пока он скрыт, lozad их не видит)
 */
const init = () => {
	document.querySelectorAll('[data-photo-case]').forEach((photoCase) => {
		const tabs = photoCase.querySelectorAll('[data-photo-case-tab]');
		const panels = photoCase.querySelectorAll('[data-photo-case-panel]');

		tabs.forEach((tab) => {
			tab.addEventListener('click', () => {
				const index = tab.dataset.photoCaseTab;

				tabs.forEach((item) => {
					const isActive = item === tab;

					item.classList.toggle('is-active', isActive);
					item.setAttribute('aria-pressed', String(isActive));
				});

				panels.forEach((panel) => {
					panel.hidden = panel.dataset.photoCasePanel !== index;

					if (!panel.hidden) {
						panel.querySelectorAll('.js-lazy:not([data-loaded])').forEach((img) => lazyLoading.trigger(img));
					}
				});
			});
		});
	});
};

export default {
	init,
};
