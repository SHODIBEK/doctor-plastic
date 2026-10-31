<div align="center">

# Доктор Пластик

**Вёрстка сайта клиники пластической хирургии по макету Figma: pixel perfect, адаптив, под WordPress**

![Pug](https://img.shields.io/badge/Pug-A86454?style=flat-square&logo=pug&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=sass&logoColor=white)
![Gulp](https://img.shields.io/badge/Gulp_4-CF4647?style=flat-square&logo=gulp&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=black)
![Swiper](https://img.shields.io/badge/Swiper_11-6332F6?style=flat-square&logo=swiper&logoColor=white)
![Node](https://img.shields.io/badge/Node-24-339933?style=flat-square&logo=nodedotjs&logoColor=white)

[Документация сборки](https://github.com/ninelines-team/ninelines-docs)

</div>

---

## Содержание

- [Быстрый старт](#быстрый-старт)
- [Страницы](#страницы)
- [Структура проекта](#структура-проекта)
- [Как добавить страницу](#как-добавить-страницу)
- [Соглашения](#соглашения)
- [Компоненты](#компоненты)
- [Перенос на WordPress](#перенос-на-wordpress)

## Быстрый старт

```bash
npm install
npm start          # dev-сервер с live reload
```

Адрес dev-сервера browser-sync выводит в консоль (`Local: http://localhost:3000`, если порт занят — следующий свободный). Чтобы открыть сайт с телефона, подставьте IP компьютера в той же Wi-Fi сети: `http://192.168.x.x:<порт>/`.

| Команда | Что делает |
| --- | --- |
| `npm start` | dev-сборка, watch и browser-sync |
| `npm run build` | продакшен-сборка с минификацией в `build/` |
| `npx gulp build` | сборка без минификации (для проверки) |
| `npx gulp lint` | pug-lint, stylelint, eslint |

> Нужен **Node 24**. Используется `sass` (dart-sass), `node-sass` не подключать.
> `build/` — результат сборки, руками не править (он в `.gitignore`).

## Страницы

| Страница | Файл | Описание |
| --- | --- | --- |
| Список страниц | `index.html` | служебная, ссылки на все готовые страницы |
| Главная | `home.html` | герой, услуги, работы до/после, отзывы, врачи, цены и калькулятор рассрочки, запись, преимущества, видео, галерея, FAQ, отзывы, дипломы |
| UI-кит | `ui-kit.html` | цвета, типографика, кнопки, формы, навигация, карточки, иконки |

Брейкпоинты макета: мобильный **360**, планшет **768**, ноутбук **1024**, десктоп **1299+**, макет десктопа — **1920**.

## Структура проекта

```text
src/
├── index.pug                 список готовых страниц
├── home.pug                  главная
├── ui-kit.pug                UI-кит
├── pug/
│   ├── base.pug              <head>, мета, подключение css/js
│   ├── layout.pug            header + main + footer
│   ├── data.pug              массив pages для index
│   ├── mixins/
│   │   ├── ui.pug            +picture, +btn, +btnRound, +verified
│   │   └── components.pug    карточки, формы, навигация, collapse…
│   ├── components/           header.pug, footer.pug
│   └── sections/             секции страниц (hero, works, faq…)
├── scss/
│   ├── main.scss             точка входа, все partials подключаются здесь
│   ├── _variables.scss       брейкпоинты и токены :root (--dp-color-*)
│   ├── components/           один блок — один файл
│   ├── sections/             стили секций
│   └── pages/                служебные страницы (index, ui-kit)
├── js/
│   ├── main.js               точка входа
│   └── modules/              sliders, home, calc, components…
├── images/
│   ├── content/              контентные картинки (webp @1x / @2x)
│   ├── icons/                отдельные svg (логотип, иконки набора)
│   └── sprites/svg/          собираются в sprites.svg → +svg('name')
└── resources/                копируется в build как есть (шрифты, swiper)
```

## Как добавить страницу

1. Создайте `src/<name>.pug`:

   ```pug
   extends pug/layout

   append vars
   	- title = 'Название'

   block main
   	include pug/sections/<section>
   ```

2. Добавьте её в `src/pug/data.pug` — иначе её не будет на `index.html`:

   ```js
   { file: '<name>.html', title: 'Название', desc: 'Короткое описание', tag: 'page' }
   ```

3. Стили секции положите в `src/scss/sections/_<block>.scss` и подключите в `main.scss`.

## Соглашения

**БЭМ.** `block`, `block__element`, `block--modifier`. Элемент элемента не пишем. В SCSS вкладываемся только через `&__` / `&--`, по тегам не стилизуем. Состояния — `is-active`, `is-open`, `is-hidden`. JS-хуки — `data-*`, они не стилизуются.

**Адаптив.** Mobile-first, миксины `tablet` (≥768), `laptop` (≥1024), `desktop` (≥1299), `desktop-xl` (≥1600).

**Токены.** Цвета из Figma заведены в `:root` (`--dp-color-action-primary`, `--dp-color-surface-canvas`…), в блоках используются через `var()`.

**Картинки.** Webp в двух плотностях (`name.webp` и `name@2x.webp`), выводятся миксином `+picture('folder/name', alt, w, h)` с ленивой загрузкой (lozad).

**Иконки.** Одноцветные — в спрайте, цвет задаётся через `color` (`currentColor`). Двухцветные — отдельными svg в `images/icons/set/`.

**Переводы строк — LF** (закреплено в `.gitattributes`, этого требует pug-lint).

> **Осторожно с `stylelint --fix`.** Автофикс переставляет `@include laptop {}` ниже модификаторов и удаляет `-webkit-`-префиксы. Если модификатор переопределяет медиа-значения базового класса, пишите его с удвоенным классом `&#{&}--mod`. Для `-webkit-box` и `-webkit-background-clip` ставьте `// stylelint-disable-next-line`.

## Компоненты

Все компоненты собраны на странице **`ui-kit.html`**. Основные миксины:

| Миксин | Что выводит |
| --- | --- |
| `+btn(text, { href })` | кнопка с «вырезами»; модификаторы `--full`, `--gray`, `--small` |
| `+btnRound(dir)` | круглая кнопка-стрелка: `prev`, `next`, `link`, `down`, `up` |
| `+select({ name, options, clearable })` | селект, опционально с очисткой |
| `+fileField`, `+checkbox`, `+radio`, `+switcher`, `+dropList` | элементы форм |
| `+collapse({ title, open })` | плавный аккордеон, открыт только один |
| `+breadcrumbs(items)`, `+pagination(data)`, `+categoryTab(data)` | навигация |
| `+serviceCard`, `+serviceRow`, `+resultCard`, `+doctorCard`, `+reviewCard` | карточки главной |
| `+articleCard`, `+newsCard`, `+doctorTeaser`, `+priceLine` | прочие карточки |

Интерактив: слайдеры на Swiper 11 (`modules/sliders.js`), сравнение до/после, сторис-отзывы, FAQ, мобильное меню (`modules/home.js`), калькулятор рассрочки (`modules/calc.js`), видео и галерея — Fancybox.

## Перенос на WordPress

- Шапка, подвал и секции независимы — режутся на `header.php`, `footer.php` и `template-parts/`.
- Повторяющийся контент выводится через `each` по данным в начале каждого pug-файла — там будут циклы WP.
- Меню — `ul > li > a`, совместимо с `wp_nav_menu`, активный пункт — `current-menu-item`.
- Пути к ресурсам относительные (`./images/...`) — заменить на `get_template_directory_uri()`.
- Формы — обычные `<form>` с `name` у полей, готовы к Contact Form 7 / AJAX. Поиск в мобильном меню отправляет `?s=` — стандартный поиск WP.
- jQuery подключается из CDN (в WP он уже есть).
