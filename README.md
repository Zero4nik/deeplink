<img width="1280" height="635" alt="post" src="https://github.com/user-attachments/assets/befcdee1-c62a-4613-8063-cb010b453545" />![CI](https://github.com/Zero4nik/deeplink/actions/workflows/ci.yml/badge.svg)

# Deeplink — Социальная сеть для разработчиков

![CI](https://github.com/Zero4nik/deeplink/actions/workflows/ci.yml/badge.svg)
![Status](https://img.shields.io/badge/status-production-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

**🟢 Живое демо:** [deeplink-ivory-rho.vercel.app](https://deeplink-ivory-rho.vercel.app)  
**🔵 API:** [deeplink-zm8f.onrender.com](https://deeplink-zm8f.onrender.com)

**Это не «тудулист на React». Это архитектурно зрелый fullstack-продукт, доведённый до продакшена.** Регистрация, лента постов с пагинацией, лайки с оптимистичным обновлением, подписки, комментарии, профили со счётчиками и уведомления в реальном времени через WebSocket. Тёмная тема, стеклянные карточки, CI/CD, деплой на Render и Vercel. 25 дней от идеи до продакшена.

---

## 📸 Скриншоты

*Все скриншоты лежат в папке `screenshots/`. Если у вас есть гифки, добавьте их тем же путём.*

| Лента | Пост с комментариями | Профиль |
|-------|----------------------|---------|
| ![Лента](<img width="1280" height="635" alt="post" src="https://github.com/user-attachments/assets/e277b8f9-92fd-4320-8150-f4050197d529" />
) | ![Пост](screenshots/post.png) | ![Профиль](screenshots/profile.png) |

| Вход | Регистрация | Мобильная версия |
|------|------------|------------------|
| ![Вход](screenshots/login.png) | ![Регистрация](screenshots/register.png) | ![Мобильная](screenshots/mobile.png) |

*(Подставьте свои реальные скриншоты и названия файлов. При необходимости замените `.png` на `.jpg` или `.gif`.)*

---

## 🎯 Что это за проект

Deeplink — полноценная социальная сеть для разработчиков. Пользователи могут регистрироваться, публиковать посты, ставить лайки, подписываться на других, комментировать и получать уведомления в реальном времени. Проект построен как архитектурно зрелое fullstack-приложение, а не как одноразовая заглушка. Бэкенд и фронтенд развёрнуты в облаке, проходят автоматическое тестирование и деплоятся при каждом пуше в основную ветку.

**Ключевые фичи**  
- 🔐 JWT-аутентификация с защищёнными роутами  
- 📝 CRUD постов с cursor-based пагинацией  
- ❤️ Лайки с оптимистичным обновлением и откатом при ошибке  
- 👥 Подписки на других разработчиков  
- 💬 Комментарии к постам  
- 👤 Профили со счётчиками постов, подписчиков и подписок  
- ⚡ Уведомления в реальном времени через WebSocket (Socket.IO)  
- 🧠 Кэширование ленты через Redis  
- 🎨 Тёмная тема со стеклянными карточками (Framer Motion для анимаций)  
- 🧪 Интеграционные тесты (бэкенд) и компонентные тесты (фронтенд)  
- 🚀 CI/CD: GitHub Actions → Render (бэкенд) + Vercel (фронтенд)

---

## 🛠️ Технологии

### Бэкенд
TypeScript · Node.js · Express · Prisma ORM · PostgreSQL · Redis · Socket.IO · JWT · bcrypt · Docker · Jest · Supertest · GitHub Actions · Render

### Фронтенд
TypeScript · Next.js 16 (App Router) · React 19 · Axios · CSS Modules · Framer Motion · Vitest · React Testing Library · Vercel

---

## 🧱 Архитектура

