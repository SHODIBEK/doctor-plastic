/**
 * Модуль "Общие компоненты": collapse, очистка select, поле файла, табы категорий
 */

/**
 * Открыть/закрыть collapse
 * @param {HTMLElement} collapse Элемент [data-collapse]
 * @param {boolean} isOpen Открыть или закрыть
 */
const setCollapse = (collapse, isOpen) => {
	const button = collapse.querySelector('.collapse__btn');

	collapse.classList.toggle('is-open', isOpen);

	// У подкатегории (collapse--sub) круглой кнопки нет
	if (button) {
		button.classList.toggle('is-open', isOpen);
	}

	collapse.querySelector('[data-collapse-toggle]').setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	collapse.querySelector('.collapse__body').setAttribute('aria-hidden', isOpen ? 'false' : 'true');
};

/**
 * Закрыть collapse без анимации: нужно, чтобы сразу узнать, на сколько схлопнулась страница
 * @param {HTMLElement} collapse Элемент [data-collapse]
 */
const closeInstantly = (collapse) => {
	const body = collapse.querySelector('.collapse__body');

	body.style.transition = 'none';
	setCollapse(collapse, false);
	// eslint-disable-next-line no-unused-expressions
	body.offsetHeight;
	body.style.transition = '';
};

// Аккордеон: открыт только один collapse среди соседей (общий родитель).
// Если закрывается соседний пункт выше, страница подкручивается так, чтобы нажатый заголовок остался на месте
const initCollapse = () => {
	document.querySelectorAll('[data-collapse-toggle]').forEach((button) => {
		button.addEventListener('click', () => {
			const collapse = button.closest('[data-collapse]');
			const isOpen = !collapse.classList.contains('is-open');

			if (isOpen) {
				const headTop = button.getBoundingClientRect().top;
				let isShifted = false;

				Array.from(collapse.parentElement.children)
					.filter((item) => item !== collapse && item.matches('[data-collapse].is-open'))
					.forEach((item) => {
						// eslint-disable-next-line no-bitwise
						if (item.compareDocumentPosition(collapse) & Node.DOCUMENT_POSITION_FOLLOWING) {
							closeInstantly(item);
							isShifted = true;
						} else {
							setCollapse(item, false);
						}
					});

				if (isShifted) {
					window.scrollBy({
						top: button.getBoundingClientRect().top - headTop,
						behavior: 'instant',
					});
				}
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
