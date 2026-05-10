![CI](https://github.com/Zero4nik/deeplink/actions/workflows/ci.yml/badge.svg)

# Deeplink — Социальная сеть для разработчиков

![CI](https://github.com/Zero4nik/deeplink/actions/workflows/ci.yml/badge.svg)
![Status](https://img.shields.io/badge/status-production-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

**🟢 Живое демо:** [deeplink-ivory-rho.vercel.app](https://deeplink-ivory-rho.vercel.app)  
**🔵 API:** [deeplink-zm8f.onrender.com](https://deeplink-zm8f.onrender.com)

**Это не «тудулист на React». Это архитектурно зрелый fullstack-продукт, доведённый до продакшена.** Регистрация, лента постов с пагинацией, лайки с оптимистичным обновлением, подписки, комментарии, профили со счётчиками и уведомления в реальном времени через WebSocket. Тёмная тема, стеклянные карточки, CI/CD, деплой на Render и Vercel. 25 дней от идеи до продакшена.

---

## 📸 Скриншоты

*Все скриншоты лежат в папке `screenshots/`.

| Лента | Пост с комментариями | Профиль |
|-------|----------------------|---------|
| ![Лента]<img width="800" height="600" alt="post" src="https://github.com/user-attachments/assets/c6418082-2f1a-49f9-8880-5168636674cf" />
 | ![Пост](screenshots/post.png) | ![Профиль](screenshots/profile.png) |

| Вход | Регистрация | Мобильная версия |
|------|------------|------------------|
| ![Вход](screenshots/login.png) | ![Регистрация](screenshots/register.png) | ![Мобильная](screenshots/mobile.png) |



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
 

