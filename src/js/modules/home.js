/**
 * Модуль "Интерактив главной": меню, сравнение до/после, сторис-отзывы, FAQ, прайс, фильтры работ
 */

const initHeader = () => {
	const header = document.querySelector('[data-header]');
	const burger = header && header.querySelector('[data-header-burger]');

	if (!burger) {
		return;
	}

	const setMenu = (isOpen) => {
		header.classList.toggle('is-open', isOpen);
		document.documentElement.classList.toggle('is-lock-scroll', isOpen);
		burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
		burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Меню');
	};

	burger.addEventListener('click', () => setMenu(!header.classList.contains('is-open')));

	header.querySelectorAll('.header__menu-link').forEach((link) => {
		link.addEventListener('click', () => setMenu(false));
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && header.classList.contains('is-open')) {
			setMenu(false);
		}
	});

	// На десктопе меню всегда в строку — закрываем мобильное при расширении окна
	window.matchMedia('(min-width: 1299px)').addEventListener('change', (event) => {
		if (event.matches) {
			setMenu(false);
		}
	});
};

const initCompare = () => {
	document.querySelectorAll('[data-compare]').forEach((card) => {
		const handle = card.querySelector('[data-compare-handle]');
		const media = card.querySelector('.result-card__media');

		const setPosition = (clientX) => {
			const rect = media.getBoundingClientRect();
			const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) * 100;

			card.style.setProperty('--pos', `${percent}%`);
		};

		handle.addEventListener('pointerdown', (event) => {
			event.preventDefault();
			handle.setPointerCapture(event.pointerId);

			const onMove = (moveEvent) => setPosition(moveEvent.clientX);
			const onUp = () => {
				handle.removeEventListener('pointermove', onMove);
				handle.removeEventListener('pointerup', onUp);
			};

			handle.addEventListener('pointermove', onMove);
			handle.addEventListener('pointerup', onUp);
		});
	});
};

const initTestimonials = () => {
	document.querySelectorAll('[data-testimonials]').forEach((section) => {
		const tabs = section.querySelectorAll('[data-testimonials-tab]');
		const panels = section.querySelectorAll('[data-testimonials-panel]');

		tabs.forEach((tab) => {
			tab.addEventListener('click', () => {
				const index = tab.dataset.testimonialsTab;

				tabs.forEach((item) => {
					const isActive = item === tab;

					item.classList.toggle('is-active', isActive);
					item.setAttribute('aria-selected', isActive ? 'true' : 'false');
				});

				panels.forEach((panel) => {
					panel.classList.toggle('is-active', panel.dataset.testimonialsPanel === index);
				});
			});
		});
	});
};

const setFaqItem = (item, isOpen) => {
	const button = item.querySelector('[data-faq-toggle]');

	item.classList.toggle('is-open', isOpen);
	button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
	document.getElementById(button.getAttribute('aria-controls')).setAttribute('aria-hidden', isOpen ? 'false' : 'true');
};

// Аккордеон: открыт только один вопрос в списке
const initFaq = () => {
	document.querySelectorAll('[data-faq-toggle]').forEach((button) => {
		button.addEventListener('click', () => {
			const item = button.closest('[data-faq-item]');
			const isOpen = !item.classList.contains('is-open');

			if (isOpen) {
				item.closest('[data-faq]').querySelectorAll('[data-faq-item].is-open').forEach((openItem) => setFaqItem(openItem, false));
			}

			setFaqItem(item, isOpen);
		});
	});
};

const initPrices = () => {
	document.querySelectorAll('[data-prices-expand]').forEach((button) => {
		button.addEventListener('click', () => {
			button.closest('[data-prices-body]').classList.toggle('is-open');
		});
	});
};

const initWorksFilters = () => {
	const form = document.querySelector('[data-works-filters]');

	if (!form) {
		return;
	}

	const selects = form.querySelectorAll('select');

	selects.forEach((select) => {
		select.addEventListener('change', () => {
			select.closest('.select').classList.toggle('is-active', select.selectedIndex > 0 || select.name === 'type');
		});
	});

	form.addEventListener('reset', () => {
		setTimeout(() => {
			selects.forEach((select) => {
				select.closest('.select').classList.toggle('is-active', select.name === 'type');
			});
		});
	});
};

const init = () => {
	initHeader();
	initCompare();
	initTestimonials();
	initFaq();
	initPrices();
	initWorksFilters();
};

export default {
	init,
};
