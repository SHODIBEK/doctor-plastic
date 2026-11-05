/**
 * Модуль 'Форма отзыва' ([data-feedback]): 3 шага — выбор врача/клиники, оценка, площадка.
 * Данные пункта лежат в [data-feedback-item] (JSON: id, name, position, photo, photo2x, logo, links).
 * Шаги пишутся в history, «Назад» в браузере возвращает на предыдущий шаг.
 */
const init = () => {
	const root = document.querySelector('[data-feedback]');

	if (!root) {
		return;
	}

	const steps = root.querySelectorAll('[data-feedback-step]');
	const target = root.querySelector('[data-feedback-target]');
	const photoWrap = root.querySelector('[data-feedback-photo-wrap]');
	const photo = root.querySelector('[data-feedback-photo]');
	const name = root.querySelector('[data-feedback-name]');
	const position = root.querySelector('[data-feedback-position]');
	const links = root.querySelectorAll('[data-feedback-link]');
	const ratings = root.querySelectorAll('[data-feedback-rating]');

	const show = (step) => {
		steps.forEach((item) => {
			item.hidden = item.dataset.feedbackStep !== step;
		});
		root.scrollIntoView({block: 'start'});
	};

	const go = (step) => {
		window.history.pushState({feedbackStep: step}, '');
		show(step);
	};

	const fill = (data) => {
		target.value = data.id;
		photoWrap.classList.toggle('is-logo', Boolean(data.logo));
		photo.src = data.photo;
		photo.srcset = data.photo2x ? `${data.photo2x} 2x` : '';
		photo.alt = data.name;
		name.textContent = data.name;
		position.textContent = data.position;
		const hrefs = data.links || {};

		links.forEach((link) => {
			link.href = hrefs[link.dataset.feedbackLink] || '#';
		});
		ratings.forEach((input) => {
			input.checked = false;
		});
	};

	root.addEventListener('click', (event) => {
		const button = event.target.closest('[data-feedback-choose]');

		if (!button) {
			return;
		}

		fill(JSON.parse(button.closest('[data-feedback-item]').dataset.feedbackItem));
		go('rating');
	});

	ratings.forEach((input) => {
		input.addEventListener('change', () => go('platform'));
	});

	window.history.replaceState({feedbackStep: 'choice'}, '');
	window.addEventListener('popstate', (event) => {
		const state = event.state || {};

		show(state.feedbackStep || 'choice');
	});
};

export default {
	init,
};
