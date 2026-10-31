/* eslint-disable func-names */
import "./vendor";
import "./helpers";
import { ieFix } from "./vendor/ie-fix";
import { vhFix } from "./vendor/vh-fix";
import { Fancybox } from "@fancyapps/ui/dist/fancybox/fancybox.esm.js";
import { actualYear } from "./modules/actualYear";
import lazyLoading from "./modules/lazyLoading";
import sliders from "./modules/sliders";
import home from "./modules/home";
import calc from "./modules/calc";
import components from "./modules/components";

ieFix();
vhFix();
actualYear();
lazyLoading.init();
sliders.init();
home.init();
calc.init();
components.init();
Fancybox.bind("[data-fancybox]");
