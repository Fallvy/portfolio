# NEBULA DIGITAL

## Ультра-современный веб-сайт для цифровой студии

![Nebula Digital](https://img.shields.io/badge/NEBULA-DIGITAL-00F0FF?style=for-the-badge&logo=three.js)

---

## 🌌 Описание

**NEBULA DIGITAL** — это концептуальный дизайн-проект веб-сайта для студии, создающей цифровые решения будущего. Сайт представляет собой иммерсивное 3D-пространство, где навигация происходит через исследование космических объектов, а каждый элемент реагирует на действия пользователя.

### Ключевые особенности

- **3D-сцена на Three.js** — центральный артефакт из жидкого металла с динамическими шейдерами
- **Нелинейная навигация** — перемещение между разделами через "астероиды"
- **Кастомный курсор** — магнитный эффект с плавным следованием
- **GSAP анимации** — кинематографичные переходы и микро-взаимодействия
- **Адаптивный дизайн** — оптимизация для мобильных устройств
- **Шум и сканлайны** — ретро-футуристическая эстетика

---

## 📁 Структура проекта

```
nebula_digital/
├── index.html              # Главный HTML-файл
├── css/
│   ├── main.css           # Основные стили и переменные
│   ├── 3d-scene.css       # Стили для 3D-сцены
│   └── animations.css     # Продвинутые анимации
├── js/
│   ├── main.js            # Точка входа и инициализация
│   ├── 3d-scene.js        # Three.js сцена и рендеринг
│   ├── animations.js      # GSAP анимации
│   ├── navigation.js      # Навигация и взаимодействия
│   ├── cursor.js          # Кастомный курсор
│   └── utils.js           # Вспомогательные функции
└── assets/
    ├── models/            # 3D-модели (при необходимости)
    ├── textures/          # Текстуры
    └── audio/             # Аудио-файлы
```

---

## 🚀 Быстрый старт

### Вариант 1: Локальный запуск

1. Откройте файл `index.html` в любом современном браузере
2. Для корректной работы Three.js рекомендуется использовать локальный сервер

### Вариант 2: Локальный сервер (рекомендуется)

```bash
# Используя Python 3
cd nebula_digital
python -m http.server 8000

# Откройте в браузере: http://localhost:8000
```

```bash
# Используя Node.js (npm install -g http-server)
cd nebula_digital
http-server -p 8000

# Откройте в браузере: http://localhost:8000
```

### Вариант 3: VS Code Live Server

1. Установите расширение "Live Server"
2. Откройте `index.html`
3. Нажмите "Go Live"

---

## 🎮 Управление

### Навигация

- **Клик по астероиду** — переход к соответствующему разделу
- **Кнопка RETURN** — возврат в центр (главная)
- **Колесо мыши** — приближение/отдаление камеры
- **Движение мыши** — вращение центрального артефакта

### Горячие клавиши

| Клавиша | Действие |
|---------|----------|
| `H` / `Home` | Возврат на главную |
| `1` | Раздел HOME |
| `2` | Раздел PROJECTS |
| `3` | Раздел LABORATORY |
| `4` | Раздел CONTACT |
| `Escape` | Возврат на главную |

---

## 🎨 Технологии

### Основные

- **HTML5** — семантическая разметка
- **CSS3** — кастомные свойства, анимации, grid/flexbox
- **JavaScript (ES6+)** — модульная архитектура

### Библиотеки

- **Three.js (r128)** — 3D-рендеринг и шейдеры
- **GSAP 3.12.2** — анимации и ScrollTrigger
- **Google Fonts** — Clash Display, Space Mono

### Эффекты

- **GLSL шейдеры** — жидкий металл, искажения
- **Post-processing** — bloom, хроматическая аберрация
- **Физика частиц** — система частиц с аддитивным смешиванием

---

## 🎯 Кастомизация

### Цветовая схема

Измените CSS-переменные в `css/main.css`:

```css
:root {
    --color-neon-cyan: #00F0FF;      /* Основной акцент */
    --color-neon-purple: #BD00FF;    /* Вторичный акцент */
    --color-neon-green: #39FF14;     /* Дополнительный */
}
```

### Скорость анимаций

В `js/animations.js` измените длительности в timeline:

```javascript
tl.to(element, {
    duration: 0.8,  // Измените это значение
    // ...
});
```

### 3D-объекты

В `js/3d-scene.js` можно заменить геометрию:

```javascript
// Икосаэдр (по умолчанию)
const geometry = new THREE.IcosahedronGeometry(1, 1);

// Или куб
const geometry = new THREE.BoxGeometry(1, 1, 1);

// Или сфера
const geometry = new THREE.SphereGeometry(1, 64, 64);
```

---

## 📱 Адаптивность

Сайт оптимизирован для:

- **Desktop** (1920×¹⁰⁸⁰ и выше) — полный опыт с 3D
- **Tablet** (768×¹⁰⁲⁴) — упрощённая навигация
- **Mobile** (375×�⁶⁷) — вертикальная ориентация, сенсорное управление

На мобильных устройствах рекомендуется использовать упрощённую версию с пре-рендерными видео для лучшей производительности.

---

## 🔧 Расширение функционала

### Добавление аудио

1. Добавьте файлы в `assets/audio/`
2. В `js/navigation.js` раскомментируйте инициализацию аудио:

```javascript
toggleAudio() {
    this.audioEnabled = !this.audioEnabled;

    if (this.audioEnabled) {
        const audio = new Audio('assets/audio/ambient.mp3');
        audio.loop = true;
        audio.play();
    }
}
```

### Добавление проектов

В `index.html` добавьте новый блок:

```html
<div class="project-showcase" data-project="4">
    <div class="project-3d-container">
        <div class="project-hologram">
            <div class="hologram-screen"></div>
        </div>
    </div>
    <div class="project-info">
        <h3 class="project-name">НАЗВАНИЕ ПРОЕКТА</h3>
        <p class="project-desc">Описание проекта</p>
        <div class="project-tech">
            <span class="tech-tag">Tech1</span>
            <span class="tech-tag">Tech2</span>
        </div>
    </div>
</div>
```

---

## 🎭 Эффекты и анимации

### Доступные CSS-классы

| Класс | Описание |
|-------|----------|
| `.glitch` | Эффект глитча на тексте |
| `.neon-flicker` | Мерцание неона |
| `.bloom` | Свечение элемента |
| `.float` | Парящая анимация |
| `.gradient-text` | Градиентный текст |
| `.pulse-ring` | Пульсирующие кольца |

### GSAP анимации

Используйте класс `Animations` для сложных переходов:

```javascript
// Пример из кода
animations.transitionToSection('portfolio');
animations.particleExplosion(x, y);
animations.warpEffect();
```

---

## 📊 Производительность

### Оптимизация

- **LOD (Level of Detail)** — уменьшение детализации 3D-моделей на расстоянии
- **InstancedMesh** — для рендеринга множества одинаковых объектов
- **Texture compression** — сжатие текстур в формате KTX2/Basis
- **Lazy loading** — загрузка ресурсов по требованию

### Рекомендации

- Минимум 60 FPS на современных GPU
- Адаптивное качество для слабых устройств
- Отключение пост-процессинга на мобильных

---

## 🌐 Браузерная совместимость

| Браузер | Версия | Статус |
|---------|--------|--------|
| Chrome | 90+ | ✅ Полная |
| Firefox | 88+ | ✅ Полная |
| Safari | 14+ | ✅ Полная |
| Edge | 90+ | ✅ Полная |

**Требуется поддержка:**
- WebGL 2.0
- ES6+
- CSS Grid

---

## 📝 Лицензия

Этот проект создан в образовательных целях. Вы можете свободно использовать код для своих проектов.

---

## 👨‍💻 Автор

**NEBULA DIGITAL Design Concept**

Создано с использованием:
- Three.js
- GSAP
- Modern CSS

---

## 🔗 Ссылки

- [Three.js Documentation](https://threejs.org/docs/)
- [GSAP Documentation](https://greensock.com/docs/)
- [WebGL Fundamentals](https://webglfundamentals.org/)

---

<div align="center">

**МЫ НЕ СОЗДАЕМ САЙТЫ. МЫ СОЗДАЕМ ЦИФРОВЫЕ ВСЕЛЕННЫЕ.**

Made with 🌌 by NEBULA DIGITAL

</div>
