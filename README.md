# MTV Россия — медиапортал + CMS

Полноценный Next.js-проект для публикации на GitHub и развёртывания на Vercel.

## Стек

- Next.js App Router
- TypeScript
- PostgreSQL
- Prisma
- JWT cookie sessions
- bcrypt
- Telegram Bot API webhook
- Vercel Cron

## Локальный запуск

```bash
cp .env.example .env
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Откройте `http://localhost:3000`.

## Создатель

Seed создаёт:

```text
Логин: MTVA
Пароль: MTVA
Роль: CREATOR
```

Сразу после первого запуска рекомендуется заменить пароль/создать отдельного создателя.

## Роли

### CREATOR
Полный доступ:
- все новости;
- настройки сайта;
- администраторы;
- роли.

### ADMIN
- новости;
- настройки сайта.

### MODERATOR
- новости;
- публикация и редактирование материалов.

## Telegram

Каналы проекта:

- `@nextv_itv`
- `@mtv_1russia`

Важный момент: Telegram Bot API не предоставляет боту произвольную историю постов публичного канала. Поэтому надёжная синхронизация сделана через `channel_post` webhook: новые публикации после подключения бота автоматически появляются на сайте.

Бот должен быть добавлен в нужные каналы с правами, позволяющими получать channel posts.

Webhook:

```text
POST /api/telegram/sync
```

Установите webhook Telegram с секретным токеном:

```bash
curl -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" \
  -d "url=$NEXT_PUBLIC_SITE_URL/api/telegram/sync" \
  -d "secret_token=$TELEGRAM_WEBHOOK_SECRET" \
  -d 'allowed_updates=["channel_post"]'
```

## Vercel

1. Создайте PostgreSQL базу.
2. Импортируйте репозиторий в Vercel.
3. Добавьте переменные из `.env.example`.
4. Deploy.
5. Выполните:

```bash
npx prisma db push
npx prisma db seed
```

Cron вызывает:

```text
/api/telegram/sync
```

## GitHub

```bash
git init
git add .
git commit -m "Initial MTV Russia portal"
git branch -M main
git remote add origin https://github.com/YOUR_ACCOUNT/mtv-russia.git
git push -u origin main
```

Не коммитьте `.env`.

## Что можно расширить

- загрузка изображений через Vercel Blob/S3;
- редактор Markdown/HTML;
- категории и теги;
- поиск;
- архив новостей;
- модерация перед публикацией;
- история изменений;
- аудит действий администраторов;
- импорт Telegram-медиа;
- RSS;
- SEO/OG images;
- полноценное меню и страницы программ.


## Telegram уже подключён

В этом архиве локальный `.env.local` уже содержит токен Telegram-бота. Файл `.env.local` добавлен в `.gitignore`, поэтому его нельзя случайно отправить в GitHub обычным `git add .`.

Бот: `@mtv_nextv_bot`

Источники: `@nextv_itv` и `@mtv_1russia`. Для получения новых публикаций бот должен быть добавлен в нужные Telegram-каналы с правами, позволяющими получать `channel_post` обновления.

**Важно:** токен был отправлен в чат и поэтому считается раскрытым. Перед публичным запуском рекомендуется выпустить новый токен через BotFather и заменить значение `TELEGRAM_BOT_TOKEN` в `.env.local` / Vercel Environment Variables.
