#!/bin/bash

# Проверяем наличие git
if ! command -v git &> /dev/null; then
    echo "Git не установлен. Пожалуйста, установите git и повторите попытку."
    exit 1
fi

# Проверяем наличие папки collegedesk/webapp
if [ ! -d "collegedesk/webapp" ]; then
    echo "Папка collegedesk/webapp не найдена. Убедитесь, что проект правильно склонирован."
    exit 1
fi

# Создаем или переходим в ветку gh-pages
git checkout -B gh-pages

# Копируем файлы из webapp в корень репозитория
cp -r collegedesk/webapp/* .

# Добавляем все файлы
git add .

# Коммитим изменения
git commit -m "Deploy to GitHub Pages"

# Пушим в ветку gh-pages
git push -f origin gh-pages

# Возвращаемся в ветку main
git checkout main

echo "Деплой завершен! Проверьте ваш сайт на GitHub Pages."
