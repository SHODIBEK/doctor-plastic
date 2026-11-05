/**
 * Модуль 'Попап записи': ссылки [data-signup-open] открывают форму #signup-popup в Fancybox
 */
import {Fancybox} from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';

const init = () => {
	Fancybox.bind('[data-signup-open]', {
		mainClass: 'signup-modal',
		dragToClose: false,
		autoFocus: false,
		Hash: false,
	});
};

export default {
	init,
};
