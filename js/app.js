const $ = (s, c = document) => c.querySelector(s); const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const burger = $('#burger'), sidebar = $('#sidebar'); burger.addEventListener('click', () => { const open = sidebar.classList.toggle('open'); burger.setAttribute('aria-expanded', open) }); $$('.toc a').forEach(a => a.addEventListener('click', () => sidebar.classList.remove('open')));
const progress = $('#progressBar'); addEventListener('scroll', () => { const h = document.documentElement; progress.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%' });
const sections = $$('section[id]'), nav = $$('.toc a'); const io = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { nav.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)); } }) }, { threshold: .55 }); sections.forEach(s => io.observe(s));
$$('[data-tabs]').forEach(tabs => { const btns = $$('[role=tab]', tabs), panels = $$('.tab-panel', tabs); btns.forEach((btn, i) => btn.addEventListener('click', () => { btns.forEach(b => b.setAttribute('aria-selected', 'false')); panels.forEach(p => p.hidden = true); btn.setAttribute('aria-selected', 'true'); panels[i].hidden = false; })) });

$$('.grid-toggle').forEach(btn => btn.addEventListener('click', () => {
  const stage = btn.previousElementSibling;
  const shown = stage.classList.toggle('show-grid');
  btn.textContent = shown ? 'Скрыть сетку' : 'Показать сетку';
}));

const copyStatus = $('#copyStatus'); $$('.swatch').forEach(s => s.addEventListener('click', async () => { const hex = s.dataset.hex; try { await navigator.clipboard.writeText(hex); copyStatus.textContent = `Скопировано: ${hex}`; } catch { copyStatus.textContent = `Код цвета: ${hex}`; } }));
$('#themeToggle').addEventListener('click', () => document.body.classList.toggle('dark'));

const carriers = [
  { name: 'Визитка', type: 'печатный носитель', label: 'ВИЗИТКА', font: 'Inter Bold / 12–18 pt', size: '90×50 мм', materials: 'Матовая бумага 350 г/м², soft-touch ламинация', usage: 'Личная коммуникация, встречи, деловые мероприятия', desc: 'Компактный носитель первого контакта. На лицевой стороне — логотип и имя, на обороте — контакты и короткий дескриптор бренда.' },
  { name: 'Бланк', type: 'документ', label: 'БЛАНК', font: 'Inter Regular / 10–14 pt', size: 'A4, 210×297 мм', materials: 'Офсетная бумага 100–120 г/м²', usage: 'Официальные письма, коммерческие предложения, внутренние документы', desc: 'Фирменный шаблон документа с сохранением полей, иерархии текста и места для реквизитов.' },
  { name: 'Конверт', type: 'печатный носитель', label: 'КОНВЕРТ', font: 'Inter Medium / 9–12 pt', size: 'DL, 220×110 мм', materials: 'Белая бумага 120 г/м²', usage: 'Письма, приглашения, отправка документов', desc: 'Минималистичный конверт с логотипом, адресным блоком и аккуратной фирменной графикой.' },
  { name: 'Папка', type: 'документ', label: 'ПАПКА', font: 'Inter SemiBold / 14–20 pt', size: 'A4+, 230×310 мм', materials: 'Мелованный картон 300 г/м²', usage: 'Передача договоров, презентационных материалов, коммерческих предложений', desc: 'Презентационная папка для комплекта документов. Внутри предусмотрены карманы и зона для визитки.' },
  { name: 'Брошюра', type: 'печатный носитель', label: 'БРОШЮРА', font: 'Inter / 9–28 pt', size: 'A5, 148×210 мм', materials: 'Мелованная бумага 170 г/м², скрепление на скобу', usage: 'Описание услуг, продуктовая линейка, презентация бренда', desc: 'Многостраничный носитель с сеткой, крупными заголовками, иллюстрациями и блоками преимуществ.' },
  { name: 'Плакат', type: 'рекламный носитель', label: 'ПЛАКАТ', font: 'Inter Black / 48–96 pt', size: 'A2, 420×594 мм', materials: 'Постерная бумага 180 г/м²', usage: 'Анонсы, мероприятия, интерьерная навигация', desc: 'Крупный формат с сильной типографикой и коротким сообщением, рассчитанным на чтение с расстояния.' },
  { name: 'Баннер', type: 'digital-носитель', label: 'БАННЕР', font: 'Inter Bold / responsive', size: '1920×1080 px / 1080×1080 px', materials: 'PNG/JPG/WebP, оптимизация до 300 КБ', usage: 'Реклама, сайт, соцсети, презентации', desc: 'Digital-баннер в нескольких пропорциях с единым расположением заголовка, CTA и графического элемента.' },
  { name: 'Футболка', type: 'мерч', label: 'ФУТБОЛКА', font: 'Inter Bold / принт', size: 'S–XL, зона печати до 300×400 мм', materials: 'Хлопок 180 г/м², шелкография или DTF', usage: 'Команда, промо, мероприятия', desc: 'Фирменная футболка с лаконичным знаком на груди и дополнительной графикой на спине.' },
  { name: 'Упаковка', type: 'упаковка', label: 'УПАКОВКА', font: 'Inter Medium / 8–16 pt', size: 'Индивидуальная развёртка', materials: 'Картон 300–400 г/м², выборочная лакировка', usage: 'Продуктовая упаковка, подарочные наборы', desc: 'Упаковочный носитель с паттерном, маркировкой, описанием продукта и зоной для стикера.' },
  { name: 'Стикеры', type: 'мерч', label: 'СТИКЕРЫ', font: 'Inter Bold / 10–18 pt', size: '50×50 мм, 70×30 мм', materials: 'Виниловая плёнка, матовая ламинация', usage: 'Подарки, упаковка, маркировка, промо', desc: 'Набор наклеек с логотипом, иконками, короткими фразами и фирменными графическими элементами.' },
  { name: 'Бейдж', type: 'среда', label: 'БЕЙДЖ', font: 'Inter SemiBold / 12–20 pt', size: '90×120 мм', materials: 'Пластик / плотная бумага, шнурок', usage: 'Конференции, сотрудники, мероприятия', desc: 'Идентификационный носитель с именем, ролью и цветовым кодом команды или направления.' },
  { name: 'Пост Instagram', type: 'digital-носитель', label: 'POST', font: 'Inter Bold / 28–64 px', size: '1080×1080 px', materials: 'PNG/JPG, шаблон для Figma', usage: 'Социальные сети, анонсы, рубрики', desc: 'Квадратный шаблон публикации с сеткой, CTA, областью для фото и коротким информационным блоком.' },
  { name: 'Stories', type: 'digital-носитель', label: 'STORIES', font: 'Inter Bold / 32–80 px', size: '1080×1920 px', materials: 'PNG/MP4, безопасные зоны интерфейса', usage: 'Stories, Reels covers, короткие анонсы', desc: 'Вертикальный шаблон с учётом безопасных зон, кнопок интерфейса и места под интерактивные стикеры.' },
  { name: 'Email', type: 'digital-носитель', label: 'EMAIL', font: 'Inter / fallback Arial', size: '600 px ширина', materials: 'HTML-шаблон, изображения до 2×', usage: 'Рассылки, уведомления, коммерческие письма', desc: 'Шаблон письма с логотипом, заголовком, CTA-кнопкой, карточками преимуществ и футером.' },
  { name: 'Презентация', type: 'документ', label: 'PITCH', font: 'Inter / 18–54 pt', size: '16:9, 1920×1080 px', materials: 'PPTX/PDF, editable master slides', usage: 'Защита проекта, питчи, коммерческие встречи', desc: 'Система слайдов: титульный, разделитель, текстовый, график, кейс, финальный контактный слайд.' },
  { name: 'UI Kit', type: 'digital-система', label: 'UI KIT', font: 'Inter / 12–32 px', size: 'Desktop / tablet / mobile', materials: 'Компоненты Figma, CSS-переменные', usage: 'Сайт, лендинг, личный кабинет, интерфейс продукта', desc: 'Набор кнопок, полей, карточек, состояний hover/focus и правил использования интерфейсных элементов.' },
  { name: 'Вывеска', type: 'среда', label: 'ВЫВЕСКА', font: 'Inter Black / масштабируемая', size: 'Зависит от фасада', materials: 'Акрил, металл, LED-подсветка', usage: 'Фасад, ресепшн, навигационные зоны', desc: 'Пример применения логотипа в пространстве с контролем контраста, охранного поля и дистанции чтения.' },
  { name: 'Навигация', type: 'среда', label: 'WAYFINDING', font: 'Inter SemiBold / 24–72 pt', size: 'Модульная система', materials: 'Пластик, металл, виниловая плёнка', usage: 'Офис, шоурум, мероприятия', desc: 'Система указателей с пиктограммами, стрелками, нумерацией зон и цветовым кодированием.' },
  { name: 'Сертификат', type: 'документ', label: 'СЕРТИФИКАТ', font: 'Inter / 12–36 pt', size: 'A4, 210×297 мм', materials: 'Плотная бумага 250 г/м²', usage: 'Подарочные карты, награды, подтверждения', desc: 'Торжественный документ с рамкой, номером, подписью и сохранением фирменной иерархии.' },
  { name: 'Tote bag', type: 'мерч', label: 'TOTE BAG', font: 'Inter Bold / принт', size: '380×420 мм', materials: 'Хлопок/саржа, шелкография', usage: 'Мерч, welcome pack, промо-наборы', desc: 'Тканевая сумка с крупным фирменным элементом и возможностью размещения слогана.' }
];
const gallery = $('#galleryGrid'), prevBtn = $('#carrierPrev'), nextBtn = $('#carrierNext'), counter = $('#carrierCounter'); let carrierPage = 0; const perPage = 8;
function renderCarriers() { gallery.innerHTML = ''; const start = carrierPage * perPage; const page = carriers.slice(start, start + perPage); page.forEach((item, i) => { const n = start + i; const b = document.createElement('button'); b.className = 'gallery-item carrier-card'; b.type = 'button'; b.innerHTML = `<div class="carrier-thumb"><span>${item.label}</span></div><div class="carrier-card-body"><b>Carrier ${String(n + 1).padStart(2, '0')}</b><small>${item.name.toLowerCase()}</small></div>`; b.addEventListener('click', () => openCarrierModal(item, n)); gallery.appendChild(b) }); const end = Math.min(start + page.length, carriers.length); counter.textContent = `${start + 1}–${end} из ${carriers.length}`; prevBtn.disabled = carrierPage === 0; nextBtn.disabled = end >= carriers.length; }
prevBtn?.addEventListener('click', () => { if (carrierPage > 0) { carrierPage--; renderCarriers(); } }); nextBtn?.addEventListener('click', () => { if ((carrierPage + 1) * perPage < carriers.length) { carrierPage++; renderCarriers(); } }); renderCarriers();
function openCarrierModal(item, index) { $('#galleryModalTitle').textContent = item.name; $('#galleryModalType').textContent = item.type; $('#galleryModalText').textContent = item.desc; $('#galleryModalFont').textContent = item.font; $('#galleryModalSize').textContent = item.size; $('#galleryModalMaterials').textContent = item.materials; $('#galleryModalUsage').textContent = item.usage; const stage = $('#galleryModalImage'); stage.classList.remove('layout-view'); stage.innerHTML = `<span>${item.label}</span><small>Carrier ${String(index + 1).padStart(2, '0')} · мокап</small>`; $('#viewLayoutBtn').hidden = false; $('#backMockupBtn').hidden = true; openModal('galleryModal'); }
$('#viewLayoutBtn')?.addEventListener('click', () => { const stage = $('#galleryModalImage'); stage.classList.add('layout-view'); stage.innerHTML = '<span>Макет</span><small>зона логотипа · сетка · поля · текстовые блоки</small>'; $('#viewLayoutBtn').hidden = true; $('#backMockupBtn').hidden = false; });
$('#backMockupBtn')?.addEventListener('click', () => { const title = $('#galleryModalTitle').textContent; const item = carriers.find(c => c.name === title) || carriers[0]; const index = carriers.indexOf(item); const stage = $('#galleryModalImage'); stage.classList.remove('layout-view'); stage.innerHTML = `<span>${item.label}</span><small>Carrier ${String(index + 1).padStart(2, '0')} · мокап</small>`; $('#viewLayoutBtn').hidden = false; $('#backMockupBtn').hidden = true; });

function openModal(id, title, text) { const m = document.getElementById(id); if (id === 'galleryModal' && title) { $('#galleryModalTitle').textContent = title; $('#galleryModalText').textContent = text; } m.hidden = false; const c = $('.close', m); c.focus(); }
$$('[data-modal]').forEach(b => b.addEventListener('click', () => openModal(b.dataset.modal)));
$$('.modal').forEach(m => { m.addEventListener('click', e => { if (e.target === m) m.hidden = true }); $('.close', m).addEventListener('click', () => m.hidden = true) }); addEventListener('keydown', e => { if (e.key === 'Escape') $$('.modal').forEach(m => m.hidden = true) });

// UI Kit interactive states
const uiStateCard = document.getElementById('uiStateCard');
const uiStateTitle = document.getElementById('uiStateTitle');
const uiStateText = document.getElementById('uiStateText');
document.querySelectorAll('[data-ui-state]').forEach(btn => btn.addEventListener('click', () => {
  const state = btn.dataset.uiState;
  uiStateCard.classList.remove('is-hover', 'is-active', 'is-disabled');
  if (state !== 'default') uiStateCard.classList.add('is-' + state);
  const labels = { default: ['Наведите или нажмите', 'default'], hover: ['Компонент подсвечен', 'hover'], active: ['Действие подтверждено', 'active'], disabled: ['Компонент недоступен', 'disabled'] };
  uiStateTitle.textContent = labels[state][0];
  uiStateText.textContent = labels[state][1];
}));

const scrollBtn = document.getElementById('scrollTopBtn');

// показать кнопку после прокрутки
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollBtn.classList.add('show');
  } else {
    scrollBtn.classList.remove('show');
  }
});

// плавный скролл вверх
scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const coverPik = document.getElementById('coverPik');

window.addEventListener('scroll', () => {
  if (!coverPik) return;

  const scroll = window.scrollY;
  const progress = Math.min(scroll / window.innerHeight, 1);

  coverPik.style.transform = `translate(-50%, calc(-50% + ${progress * 260}px))`;
  coverPik.style.opacity = `${1 - progress * 1.2}`;
});

document.querySelectorAll('.acc-panel').forEach(panel => {
  panel.addEventListener('transitionend', () => {
    if (!panel.classList.contains('is-open')) {
      panel.hidden = true;
    }
  });
});

document.querySelectorAll('[data-accordion] .acc-button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.acc-item');
    const panel = item.querySelector('.acc-panel');
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', String(!isOpen));

    if (isOpen) {
      panel.classList.remove('is-open');
    } else {
      panel.hidden = false;
      requestAnimationFrame(() => {
        panel.classList.add('is-open');
      });
    }
  });
});

document.querySelectorAll('.copy-color').forEach((button) => {
  button.addEventListener('click', async () => {
    const hex = button.dataset.hex;

    try {
      await navigator.clipboard.writeText(hex);
      button.textContent = 'Скопировано';
      setTimeout(() => button.textContent = 'Копировать', 1200);
    } catch {
      button.textContent = hex;
    }
  });
});

const typeTabs = document.querySelectorAll('.type-tab');
const typePanels = document.querySelectorAll('[data-type-panel]');

typeTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.fontTab;

    typeTabs.forEach((item) => item.classList.remove('is-active'));
    tab.classList.add('is-active');

    typePanels.forEach((panel) => {
      panel.hidden = panel.dataset.typePanel !== target;
    });
  });
});

const onderSize = document.getElementById('onderSize');
const onderLine = document.getElementById('onderLine');
const onderPreview = document.getElementById('onderPreview');

onderSize.addEventListener('input', () => {
  onderPreview.style.fontSize = `${onderSize.value}px`;
});

onderLine.addEventListener('input', () => {
  onderPreview.style.lineHeight = onderLine.value;
});

const interSize = document.getElementById('interSize');
const interLine = document.getElementById('interLine');
const interWeight = document.getElementById('interWeight');
const interPreview = document.getElementById('interPreview');
const interWeightValue = document.getElementById('interWeightValue');

interSize.addEventListener('input', () => {
  interPreview.style.fontSize = `${interSize.value}px`;
});

interLine.addEventListener('input', () => {
  interPreview.style.lineHeight = interLine.value;
});

interWeight.addEventListener('input', () => {
  interPreview.style.fontWeight = interWeight.value;
  interWeightValue.textContent = interWeight.value;
});

document.querySelectorAll('input[type="range"]').forEach(range => {
  const update = () => {
    const percent = (range.value - range.min) / (range.max - range.min) * 100;
    range.style.setProperty('--progress', percent + '%');
  };

  range.addEventListener('input', update);
  update();
});


const graphicPreview = document.getElementById('graphicPreview');
const previewBox = document.querySelector('.graphics-preview');

document.querySelectorAll('[data-graphic]').forEach((button) => {
  button.addEventListener('click', () => {

    document.querySelectorAll('[data-graphic]').forEach((btn) => {
      btn.classList.remove('is-active');
    });

    button.classList.add('is-active');

    const images = {
      orange: 'assets/images/graphic_element.png',
      white: 'assets/images/graphic_element_white.png',
      outline: 'assets/images/graphic_element_stroke.png'
    };

    graphicPreview.src = images[button.dataset.graphic];

    // 🔥 ВОТ ЭТО НОВОЕ — меняем фон
    if (button.dataset.graphic === 'white' || button.dataset.graphic === 'outline') {
      previewBox.style.background = '#ff7a2f'; // оранжевый
    } else {
      previewBox.style.background = '#fff'; // белый
    }
  });
});

const pictogramUsagePreview = document.getElementById('pictogramUsagePreview');

document.querySelectorAll('[data-picto-bg]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-picto-bg]').forEach((btn) => {
      btn.classList.remove('is-active');
    });

    button.classList.add('is-active');

    if (button.dataset.pictoBg === 'dark') {
      pictogramUsagePreview.classList.add('is-dark');
      pictogramUsagePreview.querySelector('img').src = 'assets/images/pictograms-dark.svg';
    } else {
      pictogramUsagePreview.classList.remove('is-dark');
      pictogramUsagePreview.querySelector('img').src = 'assets/images/pictograms-light.svg';
    }
  });
});

const photoSlide = document.getElementById('photoSlide');
const photoText = document.getElementById('photoText');
const photoDots = document.querySelectorAll('.photo-dot');

const photoSlides = [
  {
    img: 'assets/images/photo-style-1.jpg',
    text: 'В кадре — живые, естественные эмоции и взаимодействие между людьми. Предпочтение отдаётся динамичным сценам, передающим движение, процесс тренировки и командный дух. Допускается сочетание динамичных кадров с более спокойными портретными изображениями.'
  },
  {
    img: 'assets/images/photo-style-2.jpg',
    text: 'Используются средние и крупные планы, а также кадры с эффектом движения. Допускается лёгкое размытие для передачи динамики. Композиции могут быть как естественными (в пространстве зала), так и более графичными — с однотонным фоном.'
  },
  {
    img: 'assets/images/photo-style-3.jpg',
    text: 'Визуальная среда строится на сочетании нейтральных и тёплых оттенков с акцентом на фирменный оранжевый цвет. Допускается использование однотонных цветных фонов, усиливающих графичность и выразительность изображений.'
  },
  {
    img: 'assets/images/photo-style-4.jpg',
    text: 'Фотографии могут сочетаться с фирменной графикой и элементом «Импульс», усиливая динамику и формируя целостный визуальный стиль.'
  }
];

let currentPhoto = 0;
let photoTimer;

function showPhoto(index) {
  currentPhoto = index;

  photoSlide.style.opacity = '0';

  setTimeout(() => {
    photoSlide.src = photoSlides[index].img;
    photoText.textContent = photoSlides[index].text;

    photoDots.forEach((dot) => dot.classList.remove('is-active'));
    photoDots[index].classList.add('is-active');

    photoSlide.style.opacity = '1';
  }, 180);
}

function startPhotoSlider() {
  photoTimer = setInterval(() => {
    const next = (currentPhoto + 1) % photoSlides.length;
    showPhoto(next);
  }, 5000);
}

photoDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    clearInterval(photoTimer);
    showPhoto(Number(dot.dataset.photoIndex));
    startPhotoSlider();
  });
});

if (photoSlide && photoText && photoDots.length) {
  startPhotoSlider();
}


document.querySelectorAll('[data-ui-colors]').forEach((wrap) => {
  const tabs = wrap.querySelectorAll('[data-ui-tab]');
  const panels = wrap.querySelectorAll('[data-ui-panel]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.uiTab;

      tabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      panels.forEach(panel => {
        const show = panel.dataset.uiPanel === id;
        panel.hidden = !show;
      });
    });
  });
});

document.querySelectorAll('[data-ui-tabs-demo]').forEach((tabs) => {
  const buttons = tabs.querySelectorAll('button');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
    });
  });
});