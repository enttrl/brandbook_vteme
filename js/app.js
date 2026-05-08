const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const burger = $("#burger"),
  sidebar = $("#sidebar");
burger.addEventListener("click", () => {
  const open = sidebar.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
$$(".toc a").forEach((a) =>
  a.addEventListener("click", () => sidebar.classList.remove("open")),
);
const progress = $("#progressBar");
addEventListener("scroll", () => {
  const h = document.documentElement;
  progress.style.width =
    (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + "%";
});
const sections = $$("section[id]"),
  nav = $$(".toc a");
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        nav.forEach((a) =>
          a.classList.toggle(
            "active",
            a.getAttribute("href") === "#" + e.target.id,
          ),
        );
      }
    });
  },
  { threshold: 0.55 },
);
sections.forEach((s) => io.observe(s));
$$("[data-tabs]").forEach((tabs) => {
  const btns = $$("[role=tab]", tabs),
    panels = $$(".tab-panel", tabs);
  btns.forEach((btn, i) =>
    btn.addEventListener("click", () => {
      btns.forEach((b) => b.setAttribute("aria-selected", "false"));
      panels.forEach((p) => (p.hidden = true));
      btn.setAttribute("aria-selected", "true");
      panels[i].hidden = false;
    }),
  );
});

$$(".grid-toggle").forEach((btn) =>
  btn.addEventListener("click", () => {
    const stage = btn.previousElementSibling;
    const shown = stage.classList.toggle("show-grid");
    btn.textContent = shown ? "Скрыть сетку" : "Показать сетку";
  }),
);

const copyStatus = $("#copyStatus");
$$(".swatch").forEach((s) =>
  s.addEventListener("click", async () => {
    const hex = s.dataset.hex;
    try {
      await navigator.clipboard.writeText(hex);
      copyStatus.textContent = `Скопировано: ${hex}`;
    } catch {
      copyStatus.textContent = `Код цвета: ${hex}`;
    }
  }),
);
$("#themeToggle").addEventListener("click", () =>
  document.body.classList.toggle("dark"),
);

const carriers = [
  {
    name: "Клубная карта",
    type: "Внешний носитель",
    img: "assets/images/1 Клубная карта.png",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Клубная карта – это фирменный носитель, который используется для идентификации клиента фитнес-центра и предоставляет доступ к услугам клуба.",
    text1: "Дизайн карты выполнен в фирменном стиле бренда. На лицевой стороне размещены номер карты, контактная информация и фирменный графический элемент - пиктограмма. На оборотной стороне расположен логотип.",
    text2: "Цвет носителя: фирменный чёрный. Использование других цветовых вариантов не допускается.",
    text3: "Шрифтовое оформление: гарнитура – Inter, размер – 16 pt для номера, 10pt для адреса и веб-адреса, начертание – Bold и Medium.",
    size: "Размер клубной карты: 86 мм × 54 мм.",
  },
  {
    name: "Визитная карточка",
    type: "Внешний носитель",
    img: "assets/images/2 Визитная карточка.jpg",
    layout: "assets/images/2 Визитная карточка макет.jpg",
    desc: "Визитная карточка – это элемент фирменного стиля, предназначенный для представления сотрудника компании и быстрого обмена контактной информацией.",
    text1: "Дизайн визитки выполнен в современном минималистичном стиле. На лицевой стороне размещен логотип компании. На оборотной стороне расположены имя и фамилия сотрудника, должность, адрес, электронная почта и контактные телефоны.",
    text2: "Цвет носителя: фирменный белый для оборотной стороны и черный для лицевой. Для выделения акцентов используется фирменный оранжевый цвет. Использование других цветовых вариантов не допускается.",
    text3: "Шрифтовое оформление: имя и фамилия сотрудника – шрифт Onder, размер – 14 pt. Должность и контактная информация – шрифт Inter, размер – 10 pt",
    size: "Размер визитки: 90 мм × 50 мм.",
  },
  {
    name: "Браслеты клиентов клуба",
    type: "Внутренний носитель",
    img: "assets/images/3 Браслеты клиентов клуба.jpg",
    layout: "assets/images/3 Браслеты клиентов клуба макет.jpg",
    desc: "Браслет клиента клуба – это фирменный аксессуар, используемый для идентификации посетителей фитнес-центра и предоставления доступа к услугам клуба.",
    text1: "Дизайн браслета выполнен в фирменном стиле бренда с использованием логотипа и графических элементов. На поверхности браслета размещён логотип без подстрочника, а также пиктограмма.",
    text2: "Браслеты представлены в трёх фирменных цветах: белом, оранжевом и чёрном. При использовании тёмного фона логотип и графические элементы выполняются в белом цвете, при использовании светлого фона – в чёрном. Использование других цветовых вариантов не допускается.",
    size: "Размер браслета: 202 мм х 12 мм х 2мм.",
  },
  {
    name: "Блокнот",
    type: "Внешний носитель",
    img: "assets/images/4 Блокнот.jpg",
    layout: "assets/images/4 Блокнот макет.jpg",
    desc: "Блокнот – это фирменный носитель, предназначенный для ведения записей, планирования тренировок и повседневного использования.",
    text1: "Дизайн блокнота выполнен в минималистичном фирменном стиле фитнес-центра с акцентом на крупный графический элемент. На лицевой стороне размещены надпись «Notebook», пиктограмма и логотип компании.",
    text2: "Цвет носителя: белый. Основные фирменные цвета оформления – чёрный и оранжевый. Использование других цветовых вариантов не допускается.",
    text3: "Шрифтовое оформление: гарнитура надписи «NOTEBOOK» – Onder, размер надписи – 18 pt",
    size: "Размер блокнота: 148 мм × 210 мм.",
  },
  {
    name: "Ручки",
    type: "Внутренний носитель",
    img: "assets/images/5 Ручки.jpg",
    layout: "assets/images/5 Ручки макет.jpg",
    desc: "Фирменная ручка – это корпоративный носитель, предназначенный для повседневного использования и повышения узнаваемости бренда.",
    text1: "Дизайн ручки выполнен с использованием фирменного логотипа фитнес-центра. Дополнительным акцентом служит оранжевая кнопка механизма ручки.",
    text2: "Цвет носителя: белый. Основные фирменные цвета оформления – чёрный и оранжевый. Использование других цветовых вариантов не допускается.",
    size: "Размер носителя: длина ручки – 145 мм; диаметр корпуса – 15 мм.",
  },
  {
    name: "Стаканчики кофе",
    type: "Внешний носитель",
    img: "assets/images/6 Стаканчики кофе.jpg",
    layout: "assets/images/6 Стаканчики кофе макет.jpg",
    desc: "Стаканчик для кофе – это фирменный носитель, предназначенный для подачи горячих напитков в фитнес-центре.",
    text1: "На поверхности стаканчика размещены фирменный блок, обозначения объёма напитка и адрес сайта. Дополнительным акцентом служит крышка фирменного оранжевого цвета.",
    text2: "Стаканчики представлены в двух фирменных цветовых вариантах: белом и оранжевом. При использовании белого стакана логотип и текст выполняются в чёрном цвете, при использовании оранжевого – в белом. Использование других цветовых вариантов не допускается.",
    text3: "Шрифтовое оформление: адрес сайта – гарнитура Inter, размер – 14 pt, начертание – Medium, обозначение объема напитка – гарнитура Inter, размер – 16 pt.",
    size: "Размер носителя: высота стакана – 116 мм; ширина развёртки – 220 мм.",
  },
  {
    name: "Бутылки для воды",
    type: "Внешний носитель",
    img: "assets/images/7 Бутылки для воды.jpg",
    layout: "assets/images/7 Бутылки для воды макет.jpg",
    desc: "Бутылка для воды – это фирменный спортивный аксессуар, предназначенный для использования во время тренировок и повседневной активности.",
    text1: "Дизайн бутылки выполнен в фирменном стиле фитнес-центра с использованием графических элементов. На поверхности размещены фирменный блок, а дополнительными элементами оформления являются фирменные графические элементы, создающие акцент и поддерживающие визуальную айдентику бренда.",
    text2: "Бутылка представлена в двух фирменных цветовых вариантах: белом и оранжевом. При использовании белого фона логотип выполняется в чёрном цвете, при использовании оранжевого – в белом. Использование других цветовых вариантов не допускается.",
    size: "Размер носителя: высота бутылки – 180 мм; ширина развёртки – 210 мм.",
  },
  {
    name: "Фирменное полотенце",
    type: "Внутренний носитель",
    img: "assets/images/8 Полотенце 2.jpg",
    layout: "assets/images/8 Полотенце макет.png",
    desc: "Полотенце – это фирменный носитель, предназначенный для использования во время тренировок и посещения фитнес-центра.",
    text1: "Дизайн полотенца выполнен в минималистичном стиле с использованием фирменного логотипа компании. На нижней части изделия размещен фирменный блок, обеспечивающий узнаваемость бренда и визуальное единство фирменного стиля.",
    text2: "Цвет носителя: белый. Логотип выполнен в фирменном чёрном цвете. Использование других цветовых вариантов не допускается.",
    size: "Размер носителя: 500 мм × 900 мм.",
  },
  {
    name: "Футболки сотрудников",
    type: "Внутренний носитель",
    img: "assets/images/9 Футболки сотрудников.jpg",
    layout: "assets/images/9 Футболки сотрудников макет.jpg",
    desc: "Футболка сотрудника – элемент фирменной униформы фитнес-центра, предназначенный для формирования единого визуального образа персонала.",
    text1: "Дизайн футболки выполнен в современном стиле с использованием фирменной графики и корпоративных цветов компании. На передней части изделия размещён фирменный логотип, а на спине специализация сотрудника. Дополнительно на футболке расположен крупный фирменный графический элемент.",
    text2: "Цвет носителя: фирменный оранжевый. Логотип, текст и графические элементы выполнены в белом цвете. Использование других цветовых вариантов не допускается.",
    text3: "Шрифтовое оформление: специализация сотрудника – гарнитура Onder, начертание – Regular.",
    size: "Футболка, изготовленна в стандартных размерах (S, M, L, XL)",
  },
  {
    name: "Сертификат на услугу",
    type: "Внешний носитель",
    img: "assets/images/10 Сертификат на услугу.jpg",
    layout: "assets/images/10 Сертификат на услугу макет.jpg",
    desc: "Подарочный сертификат – это фирменный носитель, предназначенный для предоставления услуг фитнес-центра в формате подарка.",
    text1: "Дизайн сертификата выполнен с использованием фирменной графики и фирменных цветов бренда. На лицевой стороне размещены логотип, название сертификата, описание услуги, уникальный номер, срок действия и адрес сайта. Основным визуальным акцентом выступает крупный фирменный графический элемент оранжевого цвета.",
    text2: "Цвет носителя: белый. Основные фирменные цвета оформления – чёрный и оранжевый. Использование других цветовых вариантов не допускается.",
    text3: "Шрифтовое оформление: – заголовок – гарнитура Onder, размер 28 pt; описание услуги, номер сертификата, срок действия и адрес сайта – гарнитура Inter, размер 18 pt, начертание – Regular, SemiBold;",
    size: "Размер носителя: 210 мм × 136 мм.",
  },
  {
    name: "Буклет с прайсом",
    type: "Внутренний носитель",
    img: "assets/images/11 Буклет с прайсом.jpg",
    layout: "assets/images/11 Буклет с прайсом макет.jpg",
    desc: "Буклет с прайсом – это фирменный информационный носитель, предназначенный для ознакомления клиентов с тарифами, скидками и дополнительными услугами фитнес-центра.",
    text1: "Дизайн буклета выполнен в строгом стиле с использованием фирменных цветов и типографики бренда. На носителе размещены таблица стоимости абонементов, блоки со скидками и дополнительными услугами, а также фирменный логотип компании.",
    text2: "Цвет носителя: фирменный чёрный. Основные элементы оформления и текст выполнены в белом цвете, акцентные заголовки – в фирменном оранжевом цвете. Использование других цветовых вариантов не допускается.",
    text3: "Шрифтовое оформление: – заголовок – гарнитура Onder, размер 36 pt; заголовки разделов – гарнитура Inter, размер 20 pt, начертание – Bold, SemiBold, основной текст и таблица – гарнитура Inter, размер 18 pt, начертание – Regular, SemiBold;",
    size: "Размер носителя: 210 мм × 297 мм.",
  },
  {
    name: "Фирменный бланк",
    type: "Внутренний носитель",
    img: "assets/images/12 Фирменный бланк.jpg",
    layout: "assets/images/12 Фирменный бланк макет.jpg",
    desc: "Фирменный бланк – это официальный носитель корпоративной документации, предназначенный для ведения деловой переписки и оформления внутренних и внешних документов фитнес-центра.",
    text1: "На бланке размещены фирменный знак, реквизиты организации и контактная информация. Компоновка элементов обеспечивает удобство восприятия текста и подчёркивает деловой стиль компании.",
    text2: "Цвет носителя: белый. Фирменный знак и текстовая информация выполнены в чёрном цвете.",
    text3: "Шрифтовое оформление: основной текст документа – гарнитура Inter, размер 14 pt, начертание – Regular; реквизиты организации – гарнитура Inter, размер 14 pt, начертание – Regular/Bold;",
    size: "Размер носителя: A4 (210 мм × 297 мм).",
  },
  {
    name: "Информационный стенд",
    type: "Внутренний носитель",
    img: "assets/images/13 Информационный стенд.jpg",
    layout: "assets/images/13 Информационный стенд макет.jpg",
    desc: "Информационный стенд – это фирменный навигационный носитель, предназначенный для размещения актуальной информации, объявлений и материалов для посетителей фитнес-центра.",
    text1: "Дизайн стенда выполнен с использованием фирменной графики и корпоративных цветов бренда. Основным визуальным акцентом выступает крупный графический элемент, интегрированный в фон стенда. В верхней части размещён заголовок.",
    text2: "Цвет носителя: фирменный чёрный. Заголовок и графические элементы выполнены в белом цвете. Использование других цветовых вариантов не допускается.",
    text3: "Шрифтовое оформление: заголовок – гарнитура Onder, размер 72 pt; информационные материалы размещаются в соответствии с фирменной типографикой компании.",
    size: "Размер носителя: 860 мм × 910 мм.",
  },
  {
    name: "Навигация внутри клуба",
    type: "Внутренний носитель",
    img: "assets/images/14 Навигация внутри клуба 1.png",
    layout: "assets/images/14 Навигация внутри клуба макет.png",
    desc: "Навигационные таблички – это элементы внутренней навигации фитнес-центра, предназначенные для удобной ориентации посетителей в пространстве клуба.",
    text1: "Дизайн табличек выполнен с использованием контрастной типографики и строгой композиции. На носителях размещаются названия залов и помещений на русском и английском языках, а также пиктограммы для обозначения раздевалок и функциональных зон.",
    text2: "Цвет носителя: объёмные навигационные элементы выполнены в металлическом цвете. Использование других цветовых вариантов не допускается.",
    text3: "Шрифтовое оформление: названия помещений – гарнитура Inter, размер 104 pt;",
    size: "Размеры и параметры элементов: высота текстовых блоков – 50 мм; расстояние между строками – 30 мм; расстояние между разделительными линиями и текстом – 60 мм; толщина разделительных линий – 10 мм.",
  },
  {
    name: "Вывеска на фасаде",
    type: "Внешний носитель",
    img: "assets/images/15 Вывеска на фасаде.jpg",
    layout: "assets/images/15 Вывеска на фасаде макет.jpg",
    desc: "Фасадная вывеска — это основной элемент внешней идентификации фитнес-центра, предназначенный для визуального обозначения бренда и привлечения внимания посетителей.",
    text1: "На фасаде здания расположен полный вариант горизонтально-ориентированного логотипа.",
    text2: "Цветовое решение выполнено в графитовом и металлическом исполнении. Объёмные буквы и фирменный знак имеют серебристый металлический эффект с матовой поверхностью. Использование других цветовых вариантов не допускается.",
    size: "Размер носителя: 4500 мм × 650 мм.",
  },
  {
    name: "Группа во Вконтакте",
    type: "Digital-носитель",
    img: "assets/images/16 Группа ВК.png",
    layout: "assets/images/16 Группа ВК макет.png",
    desc: "Оформление сообщества фитнес-центра «В теме» во ВКонтакте разработано как продолжение фирменной визуальной системы бренда и направлено на формирование единого цифрового образа клуба.",
    text1: "Дизайн сочетает контрастную типографику, фирменную графику, динамичные композиции и акцентный оранжевый цвет, создавая визуально активную и современную коммуникационную среду.",
    text2: "Шрифтовое оформление: заголовки и основной текст – гарнитура Onder.",
    linkText: "Перейти в сообщество",
    link: "https://vk.com/vteme_vkr",
  },
  {
    name: "Рекламный баннер",
    type: "Внешний носитель",
    img: "assets/images/17 Рекламный баннер.jpg",
    layout: "assets/images/17 Рекламный баннер макет.jpg",
    desc: "Рекламный баннер предназначен для наружного продвижения фитнес-центра и формирования узнаваемого визуального образа бренда.",
    text1: "Композиция баннера построена на сочетании фирменной графики, динамичных фотографий и акцентных цветовых блоков, что создаёт современный и энергичный визуальный стиль.",
    text2: "Цветовое решение выполнено в фирменной палитре бренда: оранжевый – акцентный цвет; белый – основной фон и текстовые блоки; чёрный – для типографики и контрастных элементов.",
    size: "Размер рекламного баннера: 10000 × 2200 мм.",
  },
  {
    name: "Постеры внутри клуба",
    type: "Внутренний носитель",
    img: "assets/images/18 Постеры внутри клуба.jpg",
    layout: "assets/images/18 Постеры внутри клуба макет.jpg",
    desc: "Серия интерьерных постеров предназначена для визуального оформления пространства фитнес-центра и поддержания фирменной атмосферы бренда. Постеры используются в тренировочных зонах, коридорах, зоне ожидания и кардиозоне.",
    text1: "Дизайн серии выполнен в едином фирменном стиле и основан на сочетании динамичных спортивных фотографий, фирменной графики, мотивационных слоганов и фирменной цветовой палитры бренда.",
    text2: "Цветовое решение: оранжевый – основной акцентный цвет; белый – для текста и графических элементов;",
    text3: "Шрифтовое оформление: основные слоганы – гарнитура Onder, размер 128 pt",
    size: "Формат постеров: 1200 × 1800 мм.",
  },
  {
    name: "Спортивный коврик",
    type: "Внутренний носитель",
    img: "assets/images/19 Спортивный коврик.jpg",
    layout: "assets/images/19 Спортивный коврик макет.jpg",
    desc: "Фирменный спортивный коврик предназначен для использования в тренировочных залах, зонах функционального тренинга, групповых занятий и персональных тренировок фитнес-центра.",
    text1: "Дизайн коврика выполнен в фирменной стилистике бренда и сочетает минималистичную композицию и крупный графический элемент",
    text2: "Цветовое решение: оранжевый – основной цвет поверхности коврика; белый – для графических элементов и логотипа",
    size: "Размер носителя: 610 × 1830 мм.",
  },
  {
    name: "Конверт",
    type: "Внешний носитель",
    img: "assets/images/20 Конверт.jpg",
    layout: "assets/images/20 Конверт макет.jpg",
    desc: "Фирменный конверт предназначен для передачи документов, подарочных сертификатов, коммерческих предложений и внутренней корреспонденции фитнес-центра.",
    text1: "Дизайн выполнен в минималистичной фирменной стилистике бренда и сочетает чистое белое поле, акцентные графические элементы и фирменную типографику. Основными элементами оформления являются:логотип фитнес-центра; пиктограмма; акцентные оранжевые элементы; фирменная шрифтовая композиция.",
    text2: "Цветовое решение: белый – основной цвет конверта; черный – для логотипа, графики и текстовой информации; фирменный оранжевый – для акцентных деталей и внутренней стороны конверта.",
    text3: "Шрифтовое оформление: контактная информация – гарнитура Inter, размер 18 pt, начертание – Regular",
    size: "Размер носителя: 229 × 162 мм;",
  },
];

const galleryGrid = document.querySelector("#galleryGrid");
const carrierCounter = document.querySelector("#carrierCounter");
const carrierPrev = document.querySelector("#carrierPrev");
const carrierNext = document.querySelector("#carrierNext");

const carrierModal = document.querySelector("#carrierModal");
const carrierModalClose = document.querySelector("#carrierModalClose");

const modalType = document.querySelector("#modalType");
const modalTitle = document.querySelector("#modalTitle");
const modalDesc = document.querySelector("#modalDesc");
const modalText1 = document.querySelector("#modalText1");
const modalText2 = document.querySelector("#modalText2");
const modalText3 = document.querySelector("#modalText3");
const modalLink = document.querySelector("#modalLink");
const modalSize = document.querySelector("#modalSize");
const modalImage = document.querySelector("#modalImage");
const layoutToggleBtn = document.querySelector("#layoutToggleBtn");

let currentCarrier = null;
let showingLayout = false;

let carrierPage = 0;
const carriersPerPage = 8;

function renderCarriers() {
  galleryGrid.innerHTML = "";

  const start = carrierPage * carriersPerPage;
  const end = Math.min(start + carriersPerPage, carriers.length);
  const visibleCarriers = carriers.slice(start, end);

  visibleCarriers.forEach((item, index) => {
    const card = document.createElement("button");
    card.className = "carrier-card";
    card.type = "button";

    card.innerHTML = `
      <div class="carrier-thumb">
        <img src="${item.img}" alt="${item.name}">
      </div>
      <h3>${item.name}</h3>
    `;

    card.addEventListener("click", () => {
      openCarrierModal(item);
    });

    galleryGrid.appendChild(card);
  });

  carrierCounter.textContent = `${start + 1}-${end} из ${carriers.length}`;

  carrierPrev.disabled = carrierPage === 0;
  carrierNext.disabled = end >= carriers.length;
}

function openCarrierModal(item) {
  modalType.textContent = item.type;
  modalTitle.textContent = item.name;
  modalDesc.textContent = item.desc;
  modalText1.textContent = item.text1;
  modalText2.textContent = item.text2;
  modalText3.textContent = item.text3;
  modalSize.textContent = item.size;

  modalImage.src = item.img;
  modalImage.alt = item.name;

  carrierModal.hidden = false;
  document.body.style.overflow = "hidden";

  currentCarrier = item;
  showingLayout = false;

  layoutToggleBtn.textContent = "Посмотреть макет";

  if (item.link) {
    modalLink.href = item.link;
    modalLink.textContent = item.linkText || item.link;
    modalLink.style.display = "inline-block";
  } else {
    modalLink.style.display = "none";
  }
}

function closeCarrierModal() {
  carrierModal.hidden = true;
  document.body.style.overflow = "";
}

carrierPrev.addEventListener("click", () => {
  if (carrierPage > 0) {
    carrierPage--;
    renderCarriers();
  }
});

carrierNext.addEventListener("click", () => {
  if ((carrierPage + 1) * carriersPerPage < carriers.length) {
    carrierPage++;
    renderCarriers();
  }
});

carrierModalClose.addEventListener("click", closeCarrierModal);

carrierModal.addEventListener("click", (event) => {
  if (event.target === carrierModal) {
    closeCarrierModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCarrierModal();
  }
});

renderCarriers();

layoutToggleBtn.addEventListener("click", () => {
  if (!currentCarrier) return;

  showingLayout = !showingLayout;

  if (showingLayout) {
    modalImage.src = currentCarrier.layout;
    document.querySelector(".carrier-modal-card").classList.add("layout-mode");
    layoutToggleBtn.textContent = "Посмотреть мокап";
  } else {
    modalImage.src = currentCarrier.img;
    layoutToggleBtn.textContent = "Посмотреть макет";
    document
      .querySelector(".carrier-modal-card")
      .classList.remove("layout-mode");
  }
});

// UI Kit interactive states
const uiStateCard = document.getElementById("uiStateCard");
const uiStateTitle = document.getElementById("uiStateTitle");
const uiStateText = document.getElementById("uiStateText");
document.querySelectorAll("[data-ui-state]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const state = btn.dataset.uiState;
    uiStateCard.classList.remove("is-hover", "is-active", "is-disabled");
    if (state !== "default") uiStateCard.classList.add("is-" + state);
    const labels = {
      default: ["Наведите или нажмите", "default"],
      hover: ["Компонент подсвечен", "hover"],
      active: ["Действие подтверждено", "active"],
      disabled: ["Компонент недоступен", "disabled"],
    };
    uiStateTitle.textContent = labels[state][0];
    uiStateText.textContent = labels[state][1];
  }),
);

const scrollBtn = document.getElementById("scrollTopBtn");

// показать кнопку после прокрутки
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

// плавный скролл вверх
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const coverPik = document.getElementById("coverPik");

window.addEventListener("scroll", () => {
  if (!coverPik) return;

  const scroll = window.scrollY;
  const progress = Math.min(scroll / window.innerHeight, 1);

  coverPik.style.transform = `translateY(calc(-50% + ${progress * 260}px))`;
  coverPik.style.opacity = `${1 - progress * 1.2}`;
});

document.querySelectorAll(".acc-panel").forEach((panel) => {
  panel.addEventListener("transitionend", () => {
    if (!panel.classList.contains("is-open")) {
      panel.hidden = true;
    }
  });
});

document.querySelectorAll("[data-accordion] .acc-button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".acc-item");
    const panel = item.querySelector(".acc-panel");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));

    if (isOpen) {
      panel.classList.remove("is-open");
    } else {
      panel.hidden = false;
      requestAnimationFrame(() => {
        panel.classList.add("is-open");
      });
    }
  });
});

document.querySelectorAll(".copy-color").forEach((button) => {
  button.addEventListener("click", async () => {
    const hex = button.dataset.hex;

    try {
      await navigator.clipboard.writeText(hex);
      button.textContent = "Скопировано";
      setTimeout(() => (button.textContent = "Копировать"), 1200);
    } catch {
      button.textContent = hex;
    }
  });
});

const typeTabs = document.querySelectorAll(".type-tab");
const typePanels = document.querySelectorAll("[data-type-panel]");

typeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.fontTab;

    typeTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");

    typePanels.forEach((panel) => {
      panel.hidden = panel.dataset.typePanel !== target;
    });
  });
});

const onderSize = document.getElementById("onderSize");
const onderLine = document.getElementById("onderLine");
const onderPreview = document.getElementById("onderPreview");

function updateOnderPreview() {
  const size = Math.min(32, Math.max(16, Number(onderSize.value)));
  onderPreview.style.fontSize = `${size}px`;
  onderPreview.style.lineHeight = "1.9";
}

onderSize?.addEventListener("input", updateOnderPreview);
onderLine?.addEventListener("input", updateOnderPreview);
updateOnderPreview();

const interSize = document.getElementById("interSize");
const interLine = document.getElementById("interLine");
const interWeight = document.getElementById("interWeight");
const interPreview = document.getElementById("interPreview");
const interWeightValue = document.getElementById("interWeightValue");

interSize.addEventListener("input", () => {
  interPreview.style.fontSize = `${interSize.value}px`;
});

interLine.addEventListener("input", () => {
  interPreview.style.lineHeight = interLine.value;
});

interWeight.addEventListener("input", () => {
  interPreview.style.fontWeight = interWeight.value;
  interWeightValue.textContent = interWeight.value;
});

document.querySelectorAll('input[type="range"]').forEach((range) => {
  const update = () => {
    const percent = ((range.value - range.min) / (range.max - range.min)) * 100;
    range.style.setProperty("--progress", percent + "%");
  };

  range.addEventListener("input", update);
  update();
});

const graphicPreview = document.getElementById("graphicPreview");
const previewBox = document.querySelector(".graphics-preview");

document.querySelectorAll("[data-graphic]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-graphic]").forEach((btn) => {
      btn.classList.remove("is-active");
    });

    button.classList.add("is-active");

    const images = {
      orange: "assets/images/graphic_element.png",
      white: "assets/images/graphic_element_white.png",
      outline: "assets/images/graphic_element_stroke.png",
    };

    graphicPreview.src = images[button.dataset.graphic];

    if (
      button.dataset.graphic === "white" ||
      button.dataset.graphic === "outline"
    ) {
      previewBox.style.background = "#ff7a2f"; 
    } else {
      previewBox.style.background = "#fff";
    }
  });
});

const photoSlide = document.getElementById("photoSlide");
const photoText = document.getElementById("photoText");
const photoDots = document.querySelectorAll(".photo-dot");

const photoSlides = [
  {
    img: "assets/images/photo-style-1.jpg",
    text: "В кадре - живые, естественные эмоции и взаимодействие между людьми. Предпочтение отдаётся динамичным сценам, передающим движение, процесс тренировки и&nbsp;командный дух. Допускается сочетание динамичных кадров с более спокойными портретными изображениями.",
  },
  {
    img: "assets/images/photo-style-2.jpg",
    text: "Используются средние и&nbsp;крупные планы, атакже кадры с эффектом движения. Допускается лёгкое размытие для передачи динамики. Композиции могут быть как естественными (в&nbsp;пространстве зала), так и&nbsp;более графичными – с&nbsp;однотонным фоном.",
  },
  {
    img: "assets/images/photo-style-3.jpg",
    text: "Визуальная среда строится на&nbsp;сочетании нейтральных и&nbsp;тёплых оттенков с&nbsp;акцентом на&nbsp;фирменный оранжевый цвет. Допускается использование однотонных цветных фонов, усиливающих графичность и&nbsp;выразительность изображений.",
  },
  {
    img: "assets/images/photo-style-4.jpg",
    text: "Фотографии могут сочетаться с&nbsp;фирменной графикой и&nbsp;элементом «Импульс», усиливая динамику и&nbsp;формируя целостный визуальный стиль.",
  },
];

let currentPhoto = 0;
let photoTimer;

function showPhoto(index) {
  currentPhoto = index;

  photoSlide.style.opacity = "0";

  setTimeout(() => {
    photoSlide.src = photoSlides[index].img;
    photoText.innerHTML = photoSlides[index].text;

    photoDots.forEach((dot) => dot.classList.remove("is-active"));
    photoDots[index].classList.add("is-active");

    // вот это добавляем
    photoSlide.classList.remove("lower-focus");

    if (index === 1 || index === 3) {
      photoSlide.classList.add("lower-focus");
    }

    photoSlide.style.opacity = "1";
  }, 180);
}

function startPhotoSlider() {
  photoTimer = setInterval(() => {
    const next = (currentPhoto + 1) % photoSlides.length;
    showPhoto(next);
  }, 5000);
}

photoDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    clearInterval(photoTimer);
    showPhoto(Number(dot.dataset.photoIndex));
    startPhotoSlider();
  });
});

if (photoSlide && photoText && photoDots.length) {
  startPhotoSlider();
}

document.querySelectorAll("[data-ui-colors]").forEach((wrap) => {
  const tabs = wrap.querySelectorAll("[data-ui-tab]");
  const panels = wrap.querySelectorAll("[data-ui-panel]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.uiTab;

      tabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");

      panels.forEach((panel) => {
        const show = panel.dataset.uiPanel === id;
        panel.hidden = !show;
      });
    });
  });
});

document.querySelectorAll("[data-ui-tabs-demo]").forEach((tabs) => {
  const buttons = tabs.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });
});

const pictogramsSection = document.querySelector("#pictograms-usage");

const pictogramTabs = pictogramsSection.querySelectorAll(".pictogram-tab");
const pictogramImages = pictogramsSection.querySelectorAll(
  ".pictograms-preview img",
);
const pictogramsPreview = pictogramsSection.querySelector(
  ".pictograms-preview",
);

pictogramTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const mode = tab.dataset.pictoBg;

    pictogramTabs.forEach((button) => {
      button.classList.remove("is-active");
    });

    tab.classList.add("is-active");

    pictogramImages.forEach((img) => {
      img.src = mode === "dark" ? img.dataset.dark : img.dataset.light;
    });

    // меняем фон только preview
    if (mode === "dark") {
      pictogramsPreview.classList.add("dark-mode");
    } else {
      pictogramsPreview.classList.remove("dark-mode");
    }
  });
});

// Final adaptive pass: close mobile menu accessibly and animate visible section changes
(() => {
  const burger = document.getElementById("burger");
  const sidebar = document.getElementById("sidebar");
  if (burger && sidebar) {
    document.querySelectorAll(".toc a").forEach((link) => {
      link.addEventListener("click", () => {
        sidebar.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  const screens = Array.from(document.querySelectorAll(".screen"));
  if (!screens.length) return;
  const visibleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    },
    { threshold: 0.35 },
  );
  screens.forEach((screen) => visibleObserver.observe(screen));
})();



const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));