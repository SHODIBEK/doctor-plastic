/**
 * Модуль 'Промо-попап': #promo-popup в Fancybox.
 * Открывается сам через DELAY мс один раз за сессию, по ссылкам [data-promo-open] и по адресу с #promo-popup.
 */
import {Fancybox} from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';

const DELAY = 10000;
const STORAGE_KEY = 'promoPopupShown';

const options = {
	mainClass: 'promo-modal',
	closeButton: false,
	dragToClose: false,
	autoFocus: false,
	Hash: false,
	on: {
		// Если попап выше экрана, Fancybox прокручивает слайд — возвращаем к началу
		done: (fancybox, slide) => {
			slide.el.scrollTop = 0;
		},
	},
};

const open = () => {
	Fancybox.show([{src: '#promo-popup',
		type: 'inline'}], options);
};

const wasShown = () => {
	try {
		return sessionStorage.getItem(STORAGE_KEY) === '1';
	} catch (e) {
		return false;
	}
};

const markShown = () => {
	try {
		sessionStorage.setItem(STORAGE_KEY, '1');
	} catch (e) {
		// хранилище недоступно — попап просто покажется снова
	}
};

const init = () => {
	const popup = document.querySelector('#promo-popup');

	if (!popup) {
		return;
	}

	Fancybox.bind('[data-promo-open]', options);

	// Крестик и кнопка записи закрывают промо (запись откроется своим попапом)
	popup.addEventListener('click', (event) => {
		if (event.target.closest('[data-fancybox-close], [data-signup-open]')) {
			Fancybox.close();
		}
	});

	if (window.location.hash === '#promo-popup') {
		open();
		markShown();

		return;
	}

	if (!wasShown()) {
		setTimeout(() => {
			// Если открыт другой попап — не показываем и не помечаем: промо покажется на следующей странице
			if (!Fancybox.getInstance()) {
				open();
				markShown();
			}
		}, DELAY);
	}
};

export default {
	init,
};
