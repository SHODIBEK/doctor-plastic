/**
 * Маска телефона +7 (___) ___-__-__ для всех input[type="tel"].
 * Неполный номер помечается через setCustomValidity — форма не отправится (нативная валидация).
 */
const PREFIX = '+7 ';
const MESSAGE = 'Введите номер телефона полностью';

const getDigits = (value) => {
	let digits = value.replace(/\D/g, '');

	if (digits[0] === '8' || digits[0] === '7') {
		digits = digits.slice(1);
	}

	return digits.slice(0, 10);
};

const format = (digits) => {
	if (!digits.length) {
		return '';
	}

	let result = `${PREFIX}(${digits.slice(0, 3)}`;

	if (digits.length >= 3) {
		result += ')';
	}

	if (digits.length > 3) {
		result += ` ${digits.slice(3, 6)}`;
	}

	if (digits.length > 6) {
		result += `-${digits.slice(6, 8)}`;
	}

	if (digits.length > 8) {
		result += `-${digits.slice(8, 10)}`;
	}

	return result;
};

const validate = (input) => {
	const digits = getDigits(input.value);
	const isIncomplete = digits.length > 0 && digits.length < 10;

	input.setCustomValidity(isIncomplete ? MESSAGE : '');
};

const onInput = (event) => {
	const input = event.target;
	const isDelete = event.inputType && event.inputType.startsWith('delete');
	const digits = getDigits(input.value);

	// При удалении не мешаем стирать скобку/дефис
	if (!isDelete) {
		input.value = format(digits);
	}

	validate(input);
};

const init = () => {
	document.querySelectorAll('input[type="tel"]').forEach((input) => {
		input.setAttribute('inputmode', 'tel');
		input.setAttribute('maxlength', '18');
		input.addEventListener('input', onInput);
		input.addEventListener('blur', () => {
			input.value = format(getDigits(input.value));
			validate(input);
		});
	});
};

export default {
	init,
};
