/**
 * Русская локализация Fancybox (в @fancyapps/ui 5 её нет).
 * Подключается до любых Fancybox.bind/show — задаётся в Fancybox.defaults.
 */
import {Fancybox} from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';

const ru = {
	// Panzoom
	PANUP: 'Сдвинуть вверх',
	PANDOWN: 'Сдвинуть вниз',
	PANLEFT: 'Сдвинуть влево',
	PANRIGHT: 'Сдвинуть вправо',
	ZOOMIN: 'Увеличить',
	ZOOMOUT: 'Уменьшить',
	TOGGLEZOOM: 'Изменить масштаб',
	TOGGLE1TO1: 'Изменить масштаб',
	ITERATEZOOM: 'Изменить масштаб',
	ROTATECCW: 'Повернуть против часовой стрелки',
	ROTATECW: 'Повернуть по часовой стрелке',
	FLIPX: 'Отразить по горизонтали',
	FLIPY: 'Отразить по вертикали',
	FITX: 'Вписать по ширине',
	FITY: 'Вписать по высоте',
	RESET: 'Сбросить',
	TOGGLEFS: 'Полноэкранный режим',

	// Carousel
	GOTO: 'Перейти к слайду %d',

	// Fancybox
	CLOSE: 'Закрыть',
	NEXT: 'Следующий',
	PREV: 'Предыдущий',
	MODAL: 'Окно можно закрыть клавишей Esc',
	ERROR: 'Что-то пошло не так, попробуйте позже',
	IMAGE_ERROR: 'Изображение не найдено',
	ELEMENT_NOT_FOUND: 'HTML-элемент не найден',
	AJAX_NOT_FOUND: 'Ошибка загрузки: не найдено',
	AJAX_FORBIDDEN: 'Ошибка загрузки: доступ запрещён',
	IFRAME_ERROR: 'Ошибка загрузки страницы',
	TOGGLE_ZOOM: 'Изменить масштаб',
	TOGGLE_THUMBS: 'Показать/скрыть миниатюры',
	TOGGLE_SLIDESHOW: 'Слайд-шоу',
	TOGGLE_FULLSCREEN: 'Полноэкранный режим',
	DOWNLOAD: 'Скачать',
};

Fancybox.defaults.l10n = Object.assign({}, Fancybox.defaults.l10n, ru);

export default ru;
