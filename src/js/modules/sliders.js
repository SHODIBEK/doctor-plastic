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
	let destroyFrame = null;

	// Swiper с loop откладывает slideTo на requestAnimationFrame (slideToLoop). Если уничтожить слайдер
	// в том же кадре, отложенный вызов падает: «Cannot read properties of undefined (reading 'slidesPerGroupSkip')».
	// Поэтому destroy — через два кадра, а при обратном расширении окна он отменяется.
	const toggle = () => {
		if (laptopQuery.matches) {
			if (destroyFrame) {
				cancelAnimationFrame(destroyFrame);
				destroyFrame = null;
			}

			if (!swiper) {
				swiper = new window.Swiper(el, options);
			}
		} else if (swiper && !destroyFrame) {
			destroyFrame = requestAnimationFrame(() => {
				destroyFrame = requestAnimationFrame(() => {
					destroyFrame = null;
					swiper.destroy(true, true);
					swiper = null;
				});
			});
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

const DIPLOMA_SCALE = 1.4; // 200 → 280 по макету

/**
 * Доля «центральности» каждого слайда по точкам остановки Swiper: между двумя соседними
 * точками увеличение плавно перетекает с одного слайда на другой, остальные — 0
 * @param {object} swiper Экземпляр Swiper
 * @returns {number[]}
 */
const getCenterWeights = (swiper) => {
	const snaps = swiper.snapGrid;
	const position = Math.min(Math.max(-swiper.translate, snaps[0]), snaps[snaps.length - 1]);
	const weights = swiper.slides.map(() => 0);
	let index = snaps.findIndex((snap, i) => i === snaps.length - 1 || position < snaps[i + 1]);

	index = Math.max(index, 0);

	const next = Math.min(index + 1, snaps.length - 1);
	const fraction = next === index ? 0 : (position - snaps[index]) / (snaps[next] - snaps[index]);

	weights[index] = 1 - fraction;
	weights[next] = Math.max(weights[next], fraction);

	return weights;
};

/**
 * Увеличивает центральный диплом и раздвигает соседей, чтобы не перекрывались.
 * Вызывается на каждый setTranslate, поэтому эффект плавный и при перетаскивании
 * @param {object} swiper Экземпляр Swiper
 */
const scaleDiplomas = (swiper) => {
	const slides = [...swiper.slides];

	if (!laptopQuery.matches) {
		slides.forEach((slide) => {
			slide.style.transform = '';
		});

		return;
	}

	const weights = getCenterWeights(swiper);

	const items = slides.map((slide, i) => {
		const width = slide.offsetWidth;
		const scale = 1 + (DIPLOMA_SCALE - 1) * weights[i];

		return {
			slide,
			scale,
			center: slide.offsetLeft + width / 2,
			grow: width * (scale - 1),
		};
	});

	items.forEach((item) => {
		const shift = items.reduce((sum, other) => {
			if (other === item) {
				return sum;
			}

			return sum + Math.sign(item.center - other.center) * other.grow / 2;
		}, 0);

		item.slide.style.transform = `translateX(${shift}px) scale(${item.scale})`;
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
		speed: 600,
		breakpoints: {
			1024: {
				spaceBetween: 40,
				slidesOffsetAfter: 0,
				centeredSlides: true,
				initialSlide: 3,
			},
		},
		on: {
			init: scaleDiplomas,
			resize: scaleDiplomas,
			setTranslate: scaleDiplomas,
			setTransition(swiper, duration) {
				const ms = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : duration;

				swiper.slides.forEach((slide) => {
					slide.style.transitionDuration = `${ms}ms`;
				});
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
