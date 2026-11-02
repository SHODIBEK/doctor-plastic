/**
 * Модуль "Градиент при переполнении": [data-overflow-fade] получает is-overflow,
 * когда первый дочерний элемент не помещается по ширине
 */
const update = (container) => {
	container.classList.toggle('is-overflow', container.firstElementChild.offsetWidth > container.clientWidth);
};

const init = () => {
	const containers = document.querySelectorAll('[data-overflow-fade]');

	if (!containers.length) {
		return;
	}

	const observer = new ResizeObserver((entries) => entries.forEach((entry) => update(entry.target)));

	containers.forEach((container) => {
		update(container);
		observer.observe(container);
	});
};

export default {
	init,
};
