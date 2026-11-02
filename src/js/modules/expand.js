import lazyLoading from './lazyLoading';

/**
 * Модуль "Развернуть список": кнопка [data-expand-toggle] открывает ближайший [data-expand]
 * и сразу грузит lazy-картинки открытых элементов (пока они скрыты, lozad их не видит)
 */
const init = () => {
	document.querySelectorAll('[data-expand-toggle]').forEach((button) => {
		button.addEventListener('click', () => {
			const container = button.closest('[data-expand]');

			container.classList.add('is-open');
			container.querySelectorAll('.js-lazy:not([data-loaded])').forEach((img) => lazyLoading.trigger(img));
		});
	});
};

export default {
	init,
};
