/**
 * Модуль "Слайдеры главной" (Swiper подключен глобально из resources/js)
 * Слайдеры работ и галереи на мобильных — нативный горизонтальный скролл, Swiper с 1024px
 */
const createSwiper = (el, options) => new window.Swiper(el, options);

const laptopQuery = window.matchMedia('(min-width: 1024px)');

/**
 * Создаёт Swiper только на ширине от 1024px и удаляет его ниже
 * @param {HTMLElement} el Контейнер слайдера
 * @param {object} options Настройки Swiper
 */
const initLaptopOnly = (el, options) => {
	let swiper = null;

	const toggle = () => {
		if (laptopQuery.matches && !swiper) {
			swiper = new window.Swiper(el, options);
		} else if (!laptopQuery.matches && swiper) {
			swiper.destroy(true, true);
			swiper = null;
		}
	};

	toggle();
	laptopQuery.addEventListener('change', toggle);
};

const initWorks = () => {
	const el = document.querySelector('[data-works-slider]');

	if (!el) {
		return;
	}

	const section = el.closest('.works');

	initLaptopOnly(el, {
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 55,
		loop: true,
		loopAdditionalSlides: 1,
		allowTouchMove: false,
		navigation: {
			prevEl: section.querySelector('[data-works-prev]'),
			nextEl: section.querySelector('[data-works-next]'),
		},
	});
};

const initCardSliders = () => {
	document.querySelectorAll('[data-card-slider]').forEach((slider) => {
		createSwiper(slider.querySelector('[data-card-slider-swiper]'), {
			slidesPerView: 'auto',
			spaceBetween: 10,
			slidesOffsetAfter: 15,
			navigation: {
				prevEl: slider.querySelector('[data-card-slider-prev]'),
				nextEl: slider.querySelector('[data-card-slider-next]'),
			},
			breakpoints: {
				768: {
					slidesOffsetAfter: 30,
				},
				1024: {
					spaceBetween: 24,
					slidesOffsetAfter: 0,
				},
			},
		});
	});
};

const initGallery = () => {
	const section = document.querySelector('[data-gallery]');

	if (!section) {
		return;
	}

	initLaptopOnly(section.querySelector('[data-gallery-swiper]'), {
		slidesPerView: 1,
		spaceBetween: 24,
		navigation: {
			prevEl: section.querySelector('[data-gallery-prev]'),
			nextEl: section.querySelector('[data-gallery-next]'),
		},
	});
};

const initDiplomas = () => {
	const el = document.querySelector('[data-diplomas-swiper]');

	if (!el) {
		return;
	}

	const section = el.closest('.diplomas');

	createSwiper(el, {
		slidesPerView: 'auto',
		spaceBetween: 10,
		slidesOffsetAfter: 15,
		navigation: {
			prevEl: section.querySelector('[data-diplomas-prev]'),
			nextEl: section.querySelector('[data-diplomas-next]'),
		},
		breakpoints: {
			1024: {
				spaceBetween: 40,
				slidesOffsetAfter: 0,
				centeredSlides: true,
				initialSlide: 3,
			},
		},
	});
};

const init = () => {
	if (!window.Swiper) {
		return;
	}

	initWorks();
	initCardSliders();
	initGallery();
	initDiplomas();
};

export default {
	init,
};
