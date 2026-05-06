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
    desc: "Digital-баннер в нескольких пропорциях с единым расположением заголовка, CTA и графического элемента.",
    text: "Дизайн включает в себя фирменный графический элемент, логотип и основные контактные данные.",
    size: "210 мм × 160 мм",
  },
  {
    name: "Визитная карточка",
    type: "Печатный носитель",
    img: "assets/images/2 Визитная карточка.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Носитель первого контакта с клиентом или партнёром.",
    text: "На карточке размещаются логотип, имя, должность и контактная информация.",
    size: "90 мм × 50 мм",
  },
  {
    name: "Браслеты клиентов клуба",
    type: "Мерч",
    img: "assets/images/3 Браслеты клиентов клуба.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Фирменный аксессуар для клиентов клуба.",
    text: "Браслеты поддерживают узнаваемость бренда внутри пространства фитнес-центра.",
    size: "индивидуальный размер",
  },
  {
    name: "Блокнот",
    type: "Печатный носитель",
    img: "assets/images/4 Блокнот.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Фирменный блокнот для сотрудников, клиентов и партнёров.",
    text: "Может использоваться как часть welcome pack или промо-набора.",
    size: "A5",
  },
  {
    name: "Ручки",
    type: "Мерч",
    img: "assets/images/5 Ручки.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Компактный фирменный носитель для ежедневного использования.",
    text: "Логотип размещается вдоль корпуса с сохранением читаемости.",
    size: "зона печати до 50 мм",
  },
  {
    name: "Стаканчики кофе",
    type: "Упаковочный носитель",
    img: "assets/images/6 Стаканчики кофе.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Фирменный носитель для зоны отдыха или кофейной точки.",
    text: "Используется логотип, фирменный цвет и графический элемент бренда.",
    size: "индивидуальный размер",
  },
  {
    name: "Бутылки для воды",
    type: "Мерч",
    img: "assets/images/7 Бутылки для воды.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Фирменная бутылка для тренировок и повседневного использования.",
    text: "Дизайн строится на контрасте фирменных цветов и крупной графики.",
    size: "210 мм × 160 мм",
  },
  {
    name: "Фирменное полотенце",
    type: "Мерч",
    img: "assets/images/8 Полотенце 2.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Практичный носитель для использования внутри фитнес-клуба.",
    text: "Логотип размещается в нижней части изделия с сохранением охранного поля.",
    size: "индивидуальный размер",
  },
  {
    name: "Футболки сотрудников",
    type: "Мерч",
    img: "assets/images/9 Футболки сотрудников.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Форма сотрудников поддерживает единый визуальный образ клуба.",
    text: "На футболке используется знак или логотип бренда.",
    size: "S–XL",
  },
  {
    name: "Сертификат на услугу",
    type: "Печатный носитель",
    img: "assets/images/10 Сертификат на услугу.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Подарочный или информационный носитель для клиентов.",
    text: "Макет строится на фирменной типографике и акцентном цвете.",
    size: "A4",
  },
  {
    name: "Буклет с прайсом",
    type: "Печатный носитель",
    img: "assets/images/11 Буклет с прайсом.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Информационный носитель с перечнем услуг и цен.",
    text: "Используется сетка, иерархия заголовков и фирменные акценты.",
    size: "A5",
  },
  {
    name: "Фирменный бланк",
    type: "Документ",
    img: "assets/images/12 Фирменный бланк.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Официальный документ для коммуникации бренда.",
    text: "Содержит логотип, реквизиты и свободную область для текста.",
    size: "A4",
  },
  {
    name: "Информационный стенд",
    type: "Средовой носитель",
    img: "assets/images/13 Информационный стенд.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Носитель для размещения информации внутри клуба.",
    text: "Дизайн помогает структурировать информацию и сохраняет фирменный стиль.",
    size: "индивидуальный размер",
  },
  {
    name: "Навигация внутри клуба",
    type: "Средовой носитель",
    img: "assets/images/14 Навигация внутри клуба 1.png",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Система указателей для удобной ориентации посетителей.",
    text: "Используются пиктограммы, стрелки и фирменная цветовая система.",
    size: "индивидуальный размер",
  },
  {
    name: "Вывеска на фасаде",
    type: "Внешний носитель",
    img: "assets/images/15 Вывеска на фасаде.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Основной носитель бренда во внешней среде.",
    text: "Логотип применяется с учётом контраста, масштаба и дистанции чтения.",
    size: "зависит от фасада",
  },
  {
    name: "Группа во Вконтакте",
    type: "Digital-носитель",
    img: "assets/images/16 Рекламный баннер.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Оформление сообщества в социальных сетях.",
    text: "Используется единая система изображений, баннеров и графических элементов.",
    size: "digital",
  },
  {
    name: "Рекламный баннер",
    type: "Digital-носитель",
    img: "assets/images/17 Рекламный баннер.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Носитель для продвижения услуг бренда.",
    text: "Композиция строится на крупном заголовке, изображении и CTA.",
    size: "1920 × 1080 px",
  },
  {
    name: "Постеры внутри клуба",
    type: "Печатный носитель",
    img: "assets/images/18 Постеры внутри клуба.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Интерьерные постеры для коммуникации с клиентами.",
    text: "Могут использоваться для анонсов, мотивационных сообщений и навигации.",
    size: "A2 / A3",
  },
  {
    name: "Спортивный коврик",
    type: "Мерч",
    img: "assets/images/19 Спортивный коврик.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Фирменный спортивный инвентарь.",
    text: "Графика размещается так, чтобы сохранять читаемость при использовании.",
    size: "индивидуальный размер",
  },
  {
    name: "Конверт",
    type: "Печатный носитель",
    img: "assets/images/20 Конверт.jpg",
    layout: "assets/images/1 Клубная карта макет.png",
    desc: "Фирменный конверт для документов и писем.",
    text: "Оформление строится на логотипе, адресном блоке и фирменной графике.",
    size: "DL / C5",
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
const modalText = document.querySelector("#modalText");
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
  modalText.textContent = item.text;
  modalSize.textContent = item.size;

  modalImage.src = item.img;
  modalImage.alt = item.name;

  carrierModal.hidden = false;
  document.body.style.overflow = "hidden";

  currentCarrier = item;
  showingLayout = false;

  layoutToggleBtn.textContent = "Посмотреть макет";
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

    // 🔥 ВОТ ЭТО НОВОЕ — меняем фон
    if (
      button.dataset.graphic === "white" ||
      button.dataset.graphic === "outline"
    ) {
      previewBox.style.background = "#ff7a2f"; // оранжевый
    } else {
      previewBox.style.background = "#fff"; // белый
    }
  });
});

const photoSlide = document.getElementById("photoSlide");
const photoText = document.getElementById("photoText");
const photoDots = document.querySelectorAll(".photo-dot");

const photoSlides = [
  {
    img: "assets/images/photo-style-1.jpg",
    text: "В кадре — живые, естественные эмоции и взаимодействие между людьми. Предпочтение отдаётся динамичным сценам, передающим движение, процесс тренировки и командный дух. Допускается сочетание динамичных кадров с более спокойными портретными изображениями.",
  },
  {
    img: "assets/images/photo-style-2.jpg",
    text: "Используются средние и крупные планы, а также кадры с эффектом движения. Допускается лёгкое размытие для передачи динамики. Композиции могут быть как естественными (в пространстве зала), так и более графичными — с однотонным фоном.",
  },
  {
    img: "assets/images/photo-style-3.jpg",
    text: "Визуальная среда строится на сочетании нейтральных и тёплых оттенков с акцентом на фирменный оранжевый цвет. Допускается использование однотонных цветных фонов, усиливающих графичность и выразительность изображений.",
  },
  {
    img: "assets/images/photo-style-4.jpg",
    text: "Фотографии могут сочетаться с фирменной графикой и элементом «Импульс», усиливая динамику и формируя целостный визуальный стиль.",
  },
];

let currentPhoto = 0;
let photoTimer;

function showPhoto(index) {
  currentPhoto = index;

  photoSlide.style.opacity = "0";

  setTimeout(() => {
    photoSlide.src = photoSlides[index].img;
    photoText.textContent = photoSlides[index].text;

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