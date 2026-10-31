import lottie from "lottie-web";
import {gsap, Power1 } from "gsap";
import AOS from 'aos';
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from 'split-type'


gsap.registerPlugin(ScrollTrigger);

const bodymovies = document.querySelectorAll(".bm");
const successAnimation = document.querySelector('.successBM');
const errrorAnimation = document.querySelector('.errorBM')
const ratingContainer = document.querySelector(".work__ratings");
const messageContainer = document.querySelector(".work__messages");

var messageCurrent = 0;
var current = 0;

bodymovies.forEach((element) => {
	lottie.loadAnimation({
		container: element,
		renderer: "svg",
		loop: true,
		autoplay: true,
		path: "data.json",
	});
});

lottie.loadAnimation({
	container: successAnimation,
	renderer: "svg",
	loop: true,
	autoplay: true,
	path: "success.json",
});

lottie.loadAnimation({
	container: errrorAnimation,
	renderer: "svg",
	loop: true,
	autoplay: true,
	path: "error.json",
});

const addRatings = () => {
	let lists = "";
	for (let index = 0; index < 100; index++) {
		lists += `
			<div class="work__rating ${
				index == 0 ? "is-active" : ""
			}"><svg width="155" height="81" viewbox="0 0 155 81" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect width="155" height="81" rx="20" fill="url(#linear-${index + 1})"></rect>
			<rect x="44.4174" y="36.1121" width="91.6937" height="2.29234" rx="1.14617" fill="#0DAFDC"></rect>
			<rect x="44.4174" y="45.2817" width="91.6937" height="2.29234" rx="1.14617" fill="#0DAFDC"></rect>
			<rect x="44.4174" y="54.4509" width="91.6937" height="2.29234" rx="1.14617" fill="#0DAFDC"></rect>
			<rect x="44.4174" y="63.6201" width="60.365" height="2.29234" rx="1.14617" fill="#0DAFDC"></rect>
			<path d="M51.7736 13.3762L53.8491 17.8758L58.7698 18.4593L55.1318 21.8236L56.0975 26.6838L51.7736 24.2635L47.4497 26.6838L48.4154 21.8236L44.7774 18.4593L49.6981 17.8758L51.7736 13.3762Z" fill="#0DAFDC"></path>
			<path d="M66.4861 13.3763L68.5615 17.8759L73.4823 18.4593L69.8442 21.8237L70.81 26.6839L66.4861 24.2635L62.1622 26.6839L63.1279 21.8237L59.4899 18.4593L64.4106 17.8759L66.4861 13.3763Z" fill="#0DAFDC"></path>
			<path d="M81.1987 13.3763L83.2741 17.8759L88.1949 18.4593L84.5568 21.8237L85.5225 26.6839L81.1987 24.2635L76.8748 26.6839L77.8405 21.8237L74.2024 18.4593L79.1232 17.8759L81.1987 13.3763Z" fill="#0DAFDC"></path>
			<path d="M95.9111 13.3763L97.9865 17.8759L102.907 18.4593L99.2692 21.8237L100.235 26.6839L95.9111 24.2635L91.5872 26.6839L92.5529 21.8237L88.9148 18.4593L93.8356 17.8759L95.9111 13.3763Z" fill="#0DAFDC"></path>
			<path d="M110.624 13.3763L112.699 17.8759L117.62 18.4593L113.982 21.8237L114.947 26.6839L110.624 24.2635L106.3 26.6839L107.265 21.8237L103.627 18.4593L108.548 17.8759L110.624 13.3763Z" fill="#0DAFDC"></path>
			<defs>
					<lineargradient id="linear-${
						index + 1
					}" x1="21.8925" y1="11.9332" x2="69.1359" y2="101.722" gradientunits="userSpaceOnUse">
							<stop class="rating-stop-1" stop-color="#37D8ED"></stop>
							<stop class="rating-stop-1" offset="1" stop-color="#4DE6FA"></stop>
					</lineargradient>
			</defs>
			</svg>
			<div class="work__rating-number">${index + 1}.</div>
			</div>
		`;
	}
	ratingContainer.innerHTML = lists;
};

addRatings();

const addMesagges = () => {
	let lists = "";
	for (let index = 0; index < 100; index++) {
		lists += `
		<div class="work__message ${index == 0 ? "is-active" : ""}">
			<div class="work__message-white"><img class="work__message-icon" src="./images/icons/message.svg" alt=""></div><img class="work__message-icon" src="./images/icons/message-white.svg" alt="">
		</div>
		`;
	}
	messageContainer.innerHTML = lists;
};

addMesagges();

const workIcon = $(".work__icon");
const workHand = $("#hand-first");
const workContainer = $(".work__icons").offset().left;
const handLeft = workIcon.eq(1).offset().left;
const handRight = workIcon.eq(3).offset().left;

const workHandLeft = () => {
	gsap.to(workHand, {
		left: handRight - workContainer,
		duration: 1,
		onComplete() {
			setTimeout(() => {
				workHandRight();
			}, 1000);
			clickHand();
			workIcon.eq(3).addClass("is-active");
			workIcon.eq(1).removeClass("is-active");
		},
	});
};

workHandLeft();

const workHandRight = () => {
	gsap.to(workHand, {
		left: handLeft - workContainer,
		duration: 1,
		onComplete() {
			setTimeout(() => {
				workHandLeft();
			}, 1000);
			clickHand();
			workIcon.eq(1).addClass("is-active");
			workIcon.eq(3).removeClass("is-active");
		},
	});
};

const clickHand = () => {
	gsap.fromTo(
		workHand,
		{
			scale: 0.8,
			duration: 0.5,
		},
		{
			scale: 1,
			duration: 0.5,
		}
	);
};

const message = document.querySelectorAll(".work__message");
const windowWidth =
	messageContainer.offsetWidth / 2 - message[0].offsetWidth / 2;

gsap.set(messageContainer, { x: windowWidth });

const messageFill = () => {
	const children = message[messageCurrent].querySelector(
		".work__message-white"
	);

	gsap.to(children, {
		height: "100%",
		duration: 1.5,
		onComplete() {
			messageSlides();
			messageActive();
		},
	});
};
messageFill();

const messageSlides = () => {
	const container = messageContainer.getBoundingClientRect().left;
	const fullWidth =
		messageContainer.offsetWidth / 2 - message[0].offsetWidth / 2;
	const swipeWidth = -(container - message[messageCurrent].offsetWidth);
	const style = window.getComputedStyle(messageContainer);
	const matrix = new WebKitCSSMatrix(style.transform);
	const ratingStyle =
		message[messageCurrent].currentStyle ||
		window.getComputedStyle(message[0]);
	const ratingMargin = parseFloat(ratingStyle.marginRight);

	if (swipeWidth <= fullWidth) {
		gsap.to(messageContainer, {
			x:
				matrix.m41 -
				(message[messageCurrent].offsetWidth + ratingMargin),
			duration: 1.5,
			onComplete() {
				messageFill();
			},
		});
	} else {
		gsap.set(messageContainer, { x: windowWidth });
	}
};

const messageActive = () => {
	message[messageCurrent].classList.remove("is-active");
	messageCurrent =
		messageCurrent + 1 < message.length ? messageCurrent + 1 : 0;
	message[messageCurrent].classList.add("is-active");
};

const handSecond = document.querySelector("#hand-second");
const ratingItems = document.querySelectorAll(".work__rating");

const ratingCenter =
	document.body.clientWidth / 2 - ratingItems[0].offsetWidth / 2;
const ratingTop = ratingContainer.offsetTop + ratingItems[0].offsetHeight / 2;

const halfContainer =
	ratingContainer.offsetWidth / 2 - ratingItems[0].offsetWidth / 2;

gsap.set(ratingContainer, { x: halfContainer });
gsap.set(handSecond, { left: ratingCenter, top: ratingTop });

const ratingLeftHand = () => {
	gsap.to(handSecond, {
		translateX: -50,
		rotateZ: -20,
		duration: 1,
		onComplete() {
			ratingRightHand();
		},
	});
};

ratingLeftHand();

const ratingRightHand = () => {
	gsap.to(handSecond, {
		translateX: 50,
		rotateZ: 20,
		duration: 1,
		onComplete() {
			ratingLeftHand();
			slideRatings();
			bubbleActive();
		},
	});
};

const slideRatings = () => {
	const container = ratingContainer.getBoundingClientRect().left;
	const fullWidth =
		ratingContainer.offsetWidth / 2 - ratingItems[0].offsetWidth / 2;
	const swipeWidth = -(container - ratingItems[current].offsetWidth);
	const style = window.getComputedStyle(ratingContainer);
	const matrix = new WebKitCSSMatrix(style.transform);
	const ratingStyle =
		ratingItems[current].currentStyle ||
		window.getComputedStyle(ratingItems[0]);
	const ratingMargin = parseFloat(ratingStyle.marginRight);

	if (swipeWidth <= fullWidth) {
		gsap.to(ratingContainer, {
			x: matrix.m41 - (ratingItems[current].offsetWidth + ratingMargin),
			duration: 1,
		});
	} else {
		gsap.set(ratingContainer, { x: halfContainer });
	}
};

const bubbleActive = () => {
	ratingItems[current].classList.remove("is-active");
	current = current + 1 < ratingItems.length ? current + 1 : 0;
	ratingItems[current].classList.add("is-active");
};

AOS.init({
	once: true,
});

const heroSubtitle = $('.hero__subtitle');
const heroTitle = $('.text-animation');
let mySplitText,
splitText2;


heroSubtitle.hide()

const titleStartAnim = () => {
	mySplitText = new SplitType(heroTitle, { type: "chars" });

	gsap.from(mySplitText.chars, {
		opacity: 0,
		y: 80,
		duration: 0.8,
		stagger: 0.01,
		delay: 1,
		onComplete() {
			setTimeout(() => {
				titleCompleteAnim()
			}, 3000);
		}
	});
}

const titleCompleteAnim = () => {
	mySplitText = new SplitType(heroTitle, { type: "chars" });

	gsap.to(mySplitText.chars, {
		opacity: 0,
		y: -50,
		duration: 0.8,
		stagger: 0.01,
		delay: 1,
		onComplete() {
			heroTitle.hide();
			heroSubtitle.fadeIn()
			subtitleStartAnim()
			mySplitText.revert()
		}
	});
}

const subtitleStartAnim = () => {
	splitText2  = new SplitType(heroSubtitle, { type: "chars", tagName: 'span' });
	gsap.from(
		splitText2.chars,
		{ 
			opacity: 0,
			y: 80,
			duration: 0.8,
			stagger: 0.01,
			delay: 1,
			onComplete() {
				setTimeout(() => {
					subtitleCompleteAnim()
				}, 3000);
			}
		}
	)
}

const subtitleCompleteAnim = () => {
	splitText2  = new SplitType(heroSubtitle, { type: "chars", tagName: 'span' });

	gsap.to(splitText2.chars, {
		opacity: 0,
		y: -50,
		duration: 0.8,
		stagger: 0.01,
		delay: 1,
		onComplete() {
			heroSubtitle.hide();
			heroTitle.fadeIn()
			titleStartAnim()
			splitText2.revert()
		}
	})
}

titleStartAnim()

const icon1 = document.querySelector('.advantages__icon-1');
const icon2 = document.querySelector('.advantages__icon-2');
const icon3 = document.querySelector('.advantages__icon-3');
var tl2 = gsap.timeline({repeat: -1, paused: true});

tl2.to(icon1, {
	yoyo: 1,
	repeat: 4,
	keyframes: {
		x: [0, 20, 0],
	},
	duration: 1,
}).to(icon2, {
	yoyo: 1,
	repeat: 4,
	keyframes: {
		x: [0, 20, 0],
	},
	duration: 1,
}).to(icon3, {
	yoyo: 1,
	repeat: 4,
	keyframes: {
		x: [0, 20, 0],
	},
	duration: 1,
})

ScrollTrigger.create({
  trigger: "#advantage",
  start: "-=300",
  end: "bottom bottom",
  onEnter: () => tl2.play(),
	onEnterBack: () => tl2.play(),
	onLeave: () => tl2.pause(),
	onLeaveBack: () => tl2.pause()
});