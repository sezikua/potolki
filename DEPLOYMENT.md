# Інструкції з розгортання

## Швидкий старт

1. **Клонуйте репозиторій**
   ```bash
   git clone <repository-url>
   cd "сайт потолки"
   ```

2. **Встановіть залежності**
   ```bash
   npm install
   ```

3. **Налаштуйте змінні оточення**
   
   Створіть файл `.env.local`:
   ```env
   NEXT_PUBLIC_GA_ID=your-google-analytics-id
   CRM_WEBHOOK_URL=https://your-crm.com/webhook
   NEXT_PUBLIC_SITE_URL=https://labell.kiev.ua
   ```

4. **Запустіть локально**
   ```bash
   npm run dev
   ```

5. **Перевірте збірку**
   ```bash
   npm run build
   ```

## Deployment на Vercel

### Автоматичне розгортання

1. Підключіть репозиторій до Vercel через GitHub/GitLab
2. Vercel автоматично визначить Next.js проект
3. Додайте змінні оточення у налаштуваннях проекту
4. Deployment відбувається автоматично при push у main

### Ручне розгортання

```bash
npm install -g vercel
vercel
```

## Налаштування домену

1. У Vercel Dashboard перейдіть до налаштувань домену
2. Додайте ваш домен (labell.kiev.ua)
3. Додайте DNS записи як вказано в інструкціях
4. Дочекайтесь активації SSL сертифікату

## Налаштування аналітики

### Google Analytics 4

1. Створіть GA4 property
2. Отримайте Measurement ID (G-XXXXXXXXXX)
3. Додайте у `.env.local`:
   ```env
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

### Google Search Console

1. Додайте сайт у Search Console
2. Виберіть метод верифікації (HTML tag)
3. Додайте verification code у `app/layout.tsx`:
   ```typescript
   verification: {
     google: 'your-verification-code',
   }
   ```

## Налаштування форм

### Інтеграція з CRM

Відредагуйте API routes для інтеграції з вашою CRM:

**app/api/contact/route.ts:**
```typescript
await fetch(process.env.CRM_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name,
    phone,
    email,
    message,
    service,
    area,
    source: 'website',
  }),
});
```

### Email нотифікації

Можна використати:
- SendGrid
- Resend
- Nodemailer

Приклад з Nodemailer:
```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  // налаштування
});

await transporter.sendMail({
  to: 'info@labell.kiev.ua',
  subject: 'Нова заявка з сайту',
  html: `...`,
});
```

## Оптимізація зображень

1. Додайте зображення у `public/images/`
2. Використовуйте формат WebP для кращої оптимізації
3. Next.js Image автоматично оптимізує зображення

## Performance моніторинг

- Vercel Analytics (включений автоматично)
- Lighthouse CI для моніторингу Core Web Vitals
- Налаштуйте алерти у Vercel Dashboard

## SEO перевірка

Після deployment перевірте:

1. ✅ Meta tags через [Meta Tags Checker](https://metatags.io/)
2. ✅ Open Graph через [Facebook Debugger](https://developers.facebook.com/tools/debug/)
3. ✅ Structured Data через [Google Rich Results Test](https://search.google.com/test/rich-results)
4. ✅ Sitemap доступність: `yoursite.com/sitemap.xml`
5. ✅ Robots.txt: `yoursite.com/robots.txt`

## Підтримка та оновлення

### Регулярні оновлення

```bash
npm update
npm audit fix
```

### Backup

- Vercel автоматично робить backup
- Рекомендується регулярно робити backup бази даних (якщо використовується)

## Troubleshooting

### Помилка збірки

1. Перевірте версію Node.js (потрібна 18+)
2. Видаліть `node_modules` та `.next`
3. Перевстановіть залежності:
   ```bash
   rm -rf node_modules .next
   npm install
   npm run build
   ```

### Проблеми з зображеннями

1. Перевірте шляхи до зображень
2. Використовуйте абсолютні шляхи від `public/`
3. Перевірте формати (WebP, JPEG, PNG)

### Проблеми з формами

1. Перевірте API routes у логах Vercel
2. Перевірте змінні оточення
3. Перевірте CORS налаштування

## Підтримка

Для питань звертайтесь до команди розробки.
