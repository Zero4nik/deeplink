![CI](https://github.com/Zero4nik/deeplink/actions/workflows/ci.yml/badge.svg)
![Status](https://img.shields.io/badge/status-production-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

# Deeplink — Социальная сеть для разработчиков

**🟢 Живое демо:** [deeplink-ivory-rho.vercel.app](https://deeplink-ivory-rho.vercel.app)  
**🔵 API:** [deeplink-zm8f.onrender.com](https://deeplink-zm8f.onrender.com)

**Это не «тудулист на React». Это архитектурно зрелый fullstack-продукт, доведённый до продакшена.** Регистрация, лента постов с пагинацией, лайки с оптимистичным обновлением, подписки, комментарии, профили со счётчиками и уведомления в реальном времени через WebSocket. Тёмная тема, стеклянные карточки, CI/CD, деплой на Render и Vercel. 25 дней от идеи до продакшена.

---

## 📸 Скриншоты

| Лента | Пост с комментариями | Профиль |
|-------|----------------------|---------|
| <img width="400" alt="Лента" src="https://github.com/user-attachments/assets/c6418082-2f1a-49f9-8880-5168636674cf" /> | <img width="400" alt="Пост" src="https://github.com/user-attachments/assets/22ac1ad2-2579-4a50-8e9c-23efd56e1690" /> | <img width="400" alt="Профиль" src="https://github.com/user-attachments/assets/54fb396e-f870-4e8b-9eac-4eb2c8aba871" /> |

| Вход | Регистрация | Мобильная версия |
|------|------------|------------------|
| <img width="400" alt="Вход" src="https://github.com/user-attachments/assets/3a4335aa-2f30-4e91-a373-aa069bb2a801" /> | <img width="400" alt="Регистрация" src="https://github.com/user-attachments/assets/f0ac4053-a298-42dd-8d1b-af9e4de05993" /> | <img width="200" alt="Мобильная" src="https://github.com/user-attachments/assets/658b38a0-b9f8-430e-a278-c701b0f02528" /> |

---

## 🎯 Что это за проект

Deeplink — полноценная социальная сеть для разработчиков. Пользователи могут регистрироваться, публиковать посты, ставить лайки, подписываться на других, комментировать и получать уведомления в реальном времени. Проект построен как архитектурно зрелое fullstack-приложение, а не как одноразовая заглушка.

**Ключевые фичи**  
- 🔐 JWT-аутентификация с защищёнными роутами  
- 📝 CRUD постов с cursor-based пагинацией  
- ❤️ Лайки с оптимистичным обновлением и откатом при ошибке  
- 👥 Подписки на других разработчиков  
- 💬 Комментарии к постам  
- 👤 Профили со счётчиками постов, подписчиков и подписок  
- ⚡ Уведомления в реальном времени через WebSocket  
- 🧠 Кэширование ленты через Redis  
- 🎨 Тёмная тема со стеклянными карточками (Framer Motion)  
- 🧪 Интеграционные тесты (бэкенд) и компонентные тесты (фронтенд)  
- 🚀 CI/CD: GitHub Actions → Render + Vercel

---

## 🛠️ Технологии

### Бэкенд
TypeScript · Node.js · Express · Prisma ORM · PostgreSQL · Redis · Socket.IO · JWT · bcrypt · Docker · Jest · Supertest · GitHub Actions · Render

### Фронтенд
TypeScript · Next.js 16 (App Router) · React 19 · Axios · CSS Modules · Framer Motion · Vitest · React Testing Library · Vercel

---

## 🧱 Архитектура

 

