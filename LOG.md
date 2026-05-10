# Дневник разработки Deeplink

## День 1 (2026-03-31) — Старт проекта
- Инициализировал проект с TypeScript, ESLint, Husky, Prettier
- Настроил слоистую архитектуру (routes → controllers → services → repositories)
- Создал Express сервер с `/health`
- Выбрал `tsx watch` вместо `nodemon` (быстрее, esbuild)
- Первый коммит в Git

## День 2 (2026-04-01) — Docker и база данных
- Написал Dockerfile и docker-compose.yml
- Поднял PostgreSQL и Redis в контейнерах
- Установил Prisma, настроил подключение к БД

## День 3 (2026-04-02) — Схема данных
- Создал модели: User, Post, Follow, Like
- Настроил связи и миграции
- Создал единый экземпляр PrismaClient

## День 4 (2026-04-02) — Репозитории
- Написал user.repository, post.repository, like.repository, follow.repository
- Только прямые запросы к Prisma, без бизнес-логики

## День 5 (2026-04-03) — Сервисы и JWT
- Написал auth.service, post.service, like.service, follow.service
- Реализовал JWT-генерацию и bcrypt-хеширование
- Сервисы не зависят от HTTP

## День 6 (2026-04-04) — Контроллеры и роуты
- Создал контроллеры для всех эндпоинтов
- Написал роуты: auth, posts, users
- Подключил authMiddleware к защищённым роутам

## День 7 (2026-04-05) — Обработка ошибок
- Написал errorHandler и errorMap
- Все ошибки возвращают правильные HTTP-статусы

## День 8 (2026-04-06) — Лайки
- Реализовал likeRepository, likeService, likeController
- Роут `POST /api/posts/:postId/like` (toggle)
- Счётчик лайков через increment/decrement

## День 9 (2026-04-07) — Подписки
- Реализовал followRepository, followService, followController
- Роут `POST /api/users/:followeeId/follow`
- Защита от подписки на самого себя

## День 10 (2026-04-08) — Лента и пагинация
- Метод getFeed() — посты только от подписок
- Cursor-based пагинация (WHERE id > lastId)

## День 11 (2026-04-09) — Тесты
- Интеграционные тесты: auth, posts, likes, follows
- 24 теста, все проходят
- Очистка базы перед каждым тестом

## День 12 (2026-04-10) — Кэширование Redis
- Установил ioredis, настроил подключение
- Кэширование getFeed (TTL 30 секунд)
- Инвалидация кэша при создании поста

## День 13 (2026-04-11) — WebSocket-уведомления
- Socket.IO сервер на порту 3001
- Комнаты для таргетинга уведомлений
- Уведомления при лайках и подписках

## День 14 (2026-04-29) — Деплой бэкенда
- Render: PostgreSQL + Web Service
- Переменные окружения, миграции, health-check
- API: https://deeplink-zm8f.onrender.com

## День 15 — Фронтенд: инициализация
- Next.js 16 (App Router) + TypeScript
- Структура папок, CSS-модули, Axios

## День 16 — Аутентификация на фронтенде
- AuthContext (React Context API)
- RegisterForm, LoginForm с валидацией
- useAuth() — кастомный хук

## День 17 — Navbar и навигация
- Компонент Navbar (гость/пользователь)
- Защищённые роуты
- Ссылки на профиль и страницу поста

## День 18 — Лента постов
- FeedPage: загрузка из API, PostCard
- CreatePostForm: создание поста
- Глобальная лента на главной

## День 19 — Лайки и подписки
- LikeButton: оптимистичное обновление, откат при ошибке
- FollowButton: подписка/отписка
- Мгновенный отклик без ожидания сервера

## День 20 — Комментарии
- Страница поста `/post/[id]`
- CommentForm, CommentList
- Параллельная загрузка поста и комментариев (Promise.all)

## День 21 — Профиль пользователя
- Страница `/profile/[username]`
- Счётчики постов, подписчиков, подписок
- Список постов пользователя

## День 22 — CI/CD
- GitHub Actions: два job'а (backend + frontend)
- Проверка типов и тесты при каждом пуше
- Автодеплой на Render (бэкенд) и Vercel (фронтенд)

## День 23 — Стили и дизайн
- CSS-модули для всех компонентов
- Палитра Deeplink Blue (#1a56db)
- Адаптивная вёрстка (мобильные 480px, планшеты 768px)
- Анимации через Framer Motion

## День 24 — Тесты фронтенда
- LoginForm: 3 теста (рендер, успешный вход, ошибка)
- RegisterForm: 2 теста (рендер, ошибка)
- FeedPage: 4 теста (загрузка, посты, пусто, ошибка)
- Vitest + React Testing Library

## День 25 — README и документация
- README.md с технологиями, скриншотами, endpoints
- Финальный пуш и деплой