/**
 * Модуль "Общие компоненты": collapse, select, поле файла, табы категорий
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

// Select: открытие по кнопке, закрытие кликом вне поля и по Esc, текст поля, очистка и reset формы.
// Одиночный выбор (radio) закрывает список сразу, множественный (checkbox) — нет
const initSelects = () => {
	const selects = document.querySelectorAll('[data-select]');

	const setOpen = (field, isOpen) => {
		field.classList.toggle('is-open', isOpen);
		field.querySelector('[data-select-toggle]').setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	};

	selects.forEach((field) => {
		const isMultiple = field.dataset.select === 'multiple';
		const text = field.querySelector('[data-select-text]');
		const inputs = field.querySelectorAll('[data-select-input]');

		const update = () => {
			const checked = Array.from(inputs).filter((input) => input.checked);

			field.classList.toggle('is-active', checked.length > 0);

			if (!checked.length) {
				text.textContent = field.dataset.placeholder;
			} else if (isMultiple) {
				text.textContent = `Выбрано ${checked.length}`;
			} else {
				text.textContent = checked[0].closest('label').textContent.trim();
			}
		};

		field.querySelector('[data-select-toggle]').addEventListener('click', () => {
			const isOpen = !field.classList.contains('is-open');

			selects.forEach((item) => setOpen(item, false));
			setOpen(field, isOpen);
		});

		field.querySelector('[data-select-clear]').addEventListener('click', () => {
			inputs.forEach((input) => {
				input.checked = false;
			});
			update();
			inputs[0].dispatchEvent(new Event('change', {bubbles: true}));
		});

		inputs.forEach((input) => {
			input.addEventListener('change', () => {
				update();

				if (!isMultiple) {
					setOpen(field, false);
				}
			});
		});

		const form = field.closest('form');

		if (form) {
			form.addEventListener('reset', () => setTimeout(update));
		}
	});

	document.addEventListener('click', (event) => {
		selects.forEach((field) => {
			if (!field.contains(event.target)) {
				setOpen(field, false);
			}
		});
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			selects.forEach((field) => setOpen(field, false));
		}
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
	initSelects();
	initFileFields();
	initCategoryTabs();
};

export default {
	init,
};
