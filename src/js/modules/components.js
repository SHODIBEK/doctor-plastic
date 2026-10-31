/**
 * Модуль "Общие компоненты": collapse, очистка select, поле файла, табы категорий
 */

/**
 * Открыть/закрыть collapse
 * @param {HTMLElement} collapse Элемент [data-collapse]
 * @param {boolean} isOpen Открыть или закрыть
 */
const setCollapse = (collapse, isOpen) => {
	collapse.classList.toggle('is-open', isOpen);
	collapse.querySelector('.collapse__btn').classList.toggle('is-open', isOpen);
	collapse.querySelector('[data-collapse-toggle]').setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	collapse.querySelector('.collapse__body').setAttribute('aria-hidden', isOpen ? 'false' : 'true');
};

// Аккордеон: открыт только один collapse среди соседей (общий родитель)
const initCollapse = () => {
	document.querySelectorAll('[data-collapse-toggle]').forEach((button) => {
		button.addEventListener('click', () => {
			const collapse = button.closest('[data-collapse]');
			const isOpen = !collapse.classList.contains('is-open');

			if (isOpen) {
				Array.from(collapse.parentElement.children)
					.filter((item) => item !== collapse && item.matches('[data-collapse].is-open'))
					.forEach((item) => setCollapse(item, false));
			}

			setCollapse(collapse, isOpen);
		});
	});
};

const initSelectClear = () => {
	document.querySelectorAll('[data-select-clear]').forEach((button) => {
		button.addEventListener('click', (event) => {
			event.preventDefault();

			const select = button.closest('.select').querySelector('select');

			select.selectedIndex = 0;
			select.dispatchEvent(new Event('change', {bubbles: true}));
		});
	});
};

const initFileFields = () => {
	document.querySelectorAll('.file-field__input').forEach((input) => {
		const label = input.closest('.file-field').querySelector('[data-file-label]');
		const defaultText = label.textContent;

		input.addEventListener('change', () => {
			const count = input.files.length;

			label.textContent = count ? Array.from(input.files).map((file) => file.name).join(', ') : defaultText;
		});
	});
};

const initCategoryTabs = () => {
	document.querySelectorAll('[data-category-tabs]').forEach((group) => {
		const tabs = group.querySelectorAll('.category-tab');

		tabs.forEach((tab) => {
			tab.addEventListener('click', () => {
				tabs.forEach((item) => {
					item.classList.toggle('is-active', item === tab);
					item.setAttribute('aria-pressed', item === tab ? 'true' : 'false');
				});
			});
		});
	});
};

const init = () => {
	initCollapse();
	initSelectClear();
	initFileFields();
	initCategoryTabs();
};

export default {
	init,
};
