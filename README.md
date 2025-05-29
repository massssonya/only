# ONLY

Проект на React с использованием Webpack, TypeScript, SCSS и Swiper.

## 📦 Установка

Перед запуском убедитесь, что у вас установлены:

- [Node.js](https://nodejs.org/) (рекомендуется LTS-версия)
- [npm](https://www.npmjs.com/) или [yarn](https://yarnpkg.com/)

1. Клонируйте репозиторий:

```bash
git clone https://github.com/your-username/only.git
cd only

2. Установите зависимости:

npm install

🚀 Запуск в режиме разработки

npm run dev

🏗 Сборка проекта

npm run build

Собранные файлы будут находиться в папке dist/.

📊 Анализ размера бандла

Анализ структуры бандла через webpack-bundle-analyzer:

npm run analyze

Или полный билд с последующим анализом:

npm run build:analyze

🌐 Деплой на Netlify

Вариант 1: через Netlify UI
Перейдите на https://app.netlify.com/ и создайте новый сайт.
Подключите репозиторий Git.
Укажите следующие параметры:
Build command: npm run build
Publish directory: dist
Base directory: .
Нажмите Deploy site. Через пару минут ваш сайт будет доступен по публичному URL.

Вариант 2: через Netlify CLI
Установите CLI и выполните шаги:

npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build

После netlify deploy, вы получите временную ссылку. Чтобы опубликовать в продакшн, выполните:

netlify deploy --prod

🧱 Стек технологий

React 19
TypeScript
SCSS
Webpack 5
Styled Components
GSAP
Swiper
