/**
 * Модуль 'Cookie-баннер': [data-cookie] показывается, пока нет согласия;
 * «Даю согласие» сохраняет его в localStorage и cookie на год.
 */
const KEY = 'cookieAccepted';

const isAccepted = () => {
	try {
		if (localStorage.getItem(KEY) === '1') {
			return true;
		}
	} catch (e) {
		// хранилище недоступно — проверяем cookie
	}

	return document.cookie.split('; ').includes(`${KEY}=1`);
};

const accept = () => {
	try {
		localStorage.setItem(KEY, '1');
	} catch (e) {
		// хранилище недоступно — хватит cookie
	}

	document.cookie = `${KEY}=1; max-age=31536000; path=/; SameSite=Lax`;
};

const init = () => {
	const banner = document.querySelector('[data-cookie]');

	if (!banner || isAccepted()) {
		return;
	}

	banner.hidden = false;

	banner.querySelector('[data-cookie-accept]').addEventListener('click', () => {
		accept();
		banner.hidden = true;
	});
};

export default {
	init,
};
