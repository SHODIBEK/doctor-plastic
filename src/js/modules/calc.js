/**
 * Модуль "Калькулятор рассрочки" — аннуитетный платёж, ставка в data-calc-rate (в месяц)
 */
const formatNumber = (value) => Math.round(value).toLocaleString('ru-RU').replace(/\s/g, ' ');

const parseNumber = (value) => Number(String(value).replace(/\D/g, '')) || 0;

const initCalc = (form) => {
	const rate = Number(form.dataset.calcRate) || 0;
	const monthlyField = form.querySelector('[data-calc-monthly]');
	const totalField = form.querySelector('[data-calc-total]');

	const sliders = {};
	const inputs = {};

	form.querySelectorAll('[data-calc-slider]').forEach((slider) => {
		sliders[slider.dataset.calcSlider] = slider;
	});
	form.querySelectorAll('[data-calc-input]').forEach((input) => {
		inputs[input.dataset.calcInput] = input;
	});

	const updateProgress = (slider) => {
		const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;

		slider.style.setProperty('--progress', `${percent}%`);
	};

	const calculate = () => {
		const amount = Number(sliders.amount.value);
		const term = Number(sliders.term.value);
		const monthly = rate ? amount * rate / (1 - Math.pow(1 + rate, -term)) : amount / term;

		monthlyField.value = formatNumber(monthly);
		totalField.value = formatNumber(monthly * term);
	};

	Object.keys(sliders).forEach((name) => {
		const slider = sliders[name];
		const input = inputs[name];

		updateProgress(slider);
		input.value = formatNumber(slider.value);

		slider.addEventListener('input', () => {
			input.value = formatNumber(slider.value);
			updateProgress(slider);
			calculate();
		});

		input.addEventListener('change', () => {
			const value = Math.min(Math.max(parseNumber(input.value), Number(slider.min)), Number(slider.max));

			slider.value = value;
			input.value = formatNumber(value);
			updateProgress(slider);
			calculate();
		});
	});

	calculate();
};

const init = () => {
	document.querySelectorAll('[data-calc]').forEach(initCalc);
};

export default {
	init,
};
