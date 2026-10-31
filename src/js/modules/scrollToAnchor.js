import helpers from "../helpers";
import header from "../components/header";

/**
 * Модуль "Плавный переход к якорю"
 */
const init = () => {
	helpers.$document.on("click.anchor", ".js-to-anchor", (e) => {
		e.preventDefault();
		e.stopPropagation();

		const id = $(e.currentTarget).attr("href");
		const speed = $(e.currentTarget).data("speed") || 1500;
		const offset = -helpers.$header.outerHeight(true);

		helpers.scrollTo($(id), speed, offset);

		if ($(window).width() < 1232) {
			header.closeMenu();
		}
	});

	$(window).on("scroll", function () {
		let scrollPosition = $(this).scrollTop();

		$("section").each(function () {
			let currentId = $(this).attr("id");
			let sectionOffset = $(this).offset().top - 100;

			if (scrollPosition >= sectionOffset) {
				$(".header__menu").find("a").removeClass("is-active");
				$(".header__menu")
					.find(`a[href="#${currentId}"]`)
					.addClass("is-active");
			}
		});
	});
};

const destroy = () => {
	helpers.$document.off(".anchor");
};

export default {
	init,
	destroy,
};
