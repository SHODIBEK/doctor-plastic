/**
 * Модуль "Мега-меню услуг": десктоп — по наведению/фокусу на «Услуги», мобильный — кнопкой раскрытия;
 * табы направлений и аккордеон групп на мобильном
 */

const CLOSE_DELAY = 250;

const init = () => {
	const item = document.querySelector('[data-mega]');

	if (!item) {
		return;
	}

	const menu = item.querySelector('[data-mega-menu]');
	const link = item.querySelector('.header__menu-link');
	const toggle = item.querySelector('[data-mega-toggle]');
	const tabs = Array.from(menu.querySelectorAll('[data-mega-tab]'));
	const panels = Array.from(menu.querySelectorAll('[data-mega-panel]'));
	const desktop = window.matchMedia('(min-width: 1299px)');
	let closeTimer = null;
	let pointerType = 'mouse';

	const isOpen = () => menu.classList.contains('is-open');

	const setOpen = (open) => {
		clearTimeout(closeTimer);
		item.classList.toggle('is-open', open);
		menu.classList.toggle('is-open', open);
		toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		toggle.setAttribute('aria-label', open ? 'Скрыть услуги' : 'Показать услуги');
	};

	const setTab = (tab, focus) => {
		const index = tabs.indexOf(tab);

		tabs.forEach((current, i) => {
			const active = i === index;

			current.classList.toggle('is-active', active);
			current.setAttribute('aria-selected', active ? 'true' : 'false');
			current.tabIndex = active ? 0 : -1;
			panels[i].classList.toggle('is-active', active);
			panels[i].hidden = !active;
		});

		if (focus) {
			tab.focus();
		}
	};

	// Десктоп: наведение с задержкой закрытия, чтобы курсор успел дойти до панели
	item.addEventListener('mouseenter', () => {
		if (desktop.matches) {
			setOpen(true);
		}
	});

	item.addEventListener('mouseleave', () => {
		if (desktop.matches) {
			closeTimer = setTimeout(() => setOpen(false), CLOSE_DELAY);
		}
	});

	item.addEventListener('focusin', () => {
		if (desktop.matches) {
			setOpen(true);
		}
	});

	item.addEventListener('focusout', (event) => {
		if (desktop.matches && !item.contains(event.relatedTarget)) {
			setOpen(false);
		}
	});

	// Тач на десктопной ширине (планшет в альбоме): первый тап открывает меню, второй — переход
	link.addEventListener('pointerdown', (event) => {
		pointerType = event.pointerType;
	});

	link.addEventListener('click', (event) => {
		if (desktop.matches && pointerType !== 'mouse' && !isOpen()) {
			event.preventDefault();
			setOpen(true);
		}
	});

	toggle.addEventListener('click', () => setOpen(!isOpen()));

	document.addEventListener('click', (event) => {
		if (desktop.matches && isOpen() && !item.contains(event.target)) {
			setOpen(false);
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && desktop.matches && isOpen()) {
			setOpen(false);
			link.focus();
		}
	});

	desktop.addEventListener('change', () => setOpen(false));

	// Табы: на десктопе переключаются и наведением, стрелки — по WAI-ARIA tabs
	tabs.forEach((tab) => {
		tab.addEventListener('click', () => setTab(tab));

		tab.addEventListener('mouseenter', () => {
			if (desktop.matches) {
				setTab(tab);
			}
		});

		tab.addEventListener('keydown', (event) => {
			const keys = {
				ArrowDown: 1,
				ArrowRight: 1,
				ArrowUp: -1,
				ArrowLeft: -1,
			};

			if (keys[event.key]) {
				event.preventDefault();
				setTab(tabs[(tabs.indexOf(tab) + keys[event.key] + tabs.length) % tabs.length], true);
			}
		});
	});

	// Аккордеон групп (виден только на мобильном)
	menu.querySelectorAll('[data-mega-group-toggle]').forEach((button) => {
		button.addEventListener('click', () => {
			const group = button.closest('[data-mega-group]');
			const open = !group.classList.contains('is-open');

			group.classList.toggle('is-open', open);
			button.setAttribute('aria-expanded', open ? 'true' : 'false');
		});
	});
};

export default {
	init,
};
