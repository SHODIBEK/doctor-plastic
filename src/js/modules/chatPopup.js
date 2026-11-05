/**
 * Модуль 'Попап Telegram-чата': #chat-popup в Fancybox.
 * Открывается сам через DELAY мс один раз за сессию (если не открыт другой попап),
 * по ссылкам [data-chat-open] и по адресу с #chat-popup.
 */
import {Fancybox} from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';

const DELAY = 40000;
const STORAGE_KEY = 'chatPopupShown';

const options = {
	mainClass: 'chat-modal',
	closeButton: false,
	dragToClose: false,
	autoFocus: false,
	Hash: false,
};

const open = () => {
	Fancybox.show([{src: '#chat-popup',
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
	const popup = document.querySelector('#chat-popup');

	if (!popup) {
		return;
	}

	Fancybox.bind('[data-chat-open]', options);

	// Крестик закрывает попап, переход в чат — тоже (ссылка открывается в новой вкладке)
	popup.addEventListener('click', (event) => {
		if (event.target.closest('[data-fancybox-close], .chat-popup__btn')) {
			Fancybox.close();
		}
	});

	if (window.location.hash === '#chat-popup') {
		open();
		markShown();

		return;
	}

	if (!wasShown()) {
		setTimeout(() => {
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
