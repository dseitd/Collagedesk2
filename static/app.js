document.addEventListener('DOMContentLoaded', function() {
    // Initialize API URL from environment
    const API_URL = window.location.origin + '/api/v1';

    // Initialize interface
    initializeInterface();

    // Check user authentication
    checkAuthentication();

    // Load initial data
    loadData();
});

function initializeInterface() {
    // Инициализация Telegram Web App
    const tg = window.Telegram.WebApp;

    // Настройка темы
    document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor);
    document.documentElement.style.setProperty('--tg-theme-text-color', tg.textColor);
    document.documentElement.style.setProperty('--tg-theme-button-color', tg.buttonColor);
    document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.buttonTextColor);

    // Расширяем на весь экран
    tg.expand();

    // Показываем кнопку назад
    tg.BackButton.show();

    // Обработчик кнопки назад
    tg.BackButton.onClick(() => {
        tg.close();
    });

    // Функция для отображения панели пользователя
    function showUserPanel(role) {
        // Скрываем все панели
        document.querySelectorAll('.panel').forEach(panel => {
            panel.style.display = 'none';
        });

        // Показываем нужную панель
        const panelId = `${role}-panel`;
        const panel = document.getElementById(panelId);
        if (panel) {
            panel.style.display = 'block';
        }
    }

    // Обработчики кнопок
    document.getElementById('btn-manage-users')?.addEventListener('click', () => {
        tg.showAlert('Управление пользователями');
    });

    document.getElementById('btn-manage-schedule')?.addEventListener('click', () => {
        tg.showAlert('Управление расписанием');
    });

    document.getElementById('btn-publish-news')?.addEventListener('click', () => {
        tg.showAlert('Публикация новостей');
    });

    document.getElementById('btn-view-schedule')?.addEventListener('click', () => {
        tg.showAlert('Просмотр расписания');
    });

    document.getElementById('btn-manage-grades')?.addEventListener('click', () => {
        tg.showAlert('Управление оценками');
    });

    document.getElementById('btn-check-attendance')?.addEventListener('click', () => {
        tg.showAlert('Проверка посещаемости');
    });

    document.getElementById('btn-my-schedule')?.addEventListener('click', () => {
        tg.showAlert('Моё расписание');
    });

    document.getElementById('btn-my-grades')?.addEventListener('click', () => {
        tg.showAlert('Мои оценки');
    });

    document.getElementById('btn-college-news')?.addEventListener('click', () => {
        tg.showAlert('Новости колледжа');
    });

    // Инициализация приложения
    document.addEventListener('DOMContentLoaded', () => {
        // Получаем данные пользователя из Telegram
        const user = tg.initDataUnsafe?.user;
        if (user) {
            document.getElementById('user-info').innerHTML = `
                <p>Пользователь: ${user.first_name} ${user.last_name || ''}</p>
            `;
        }

        // Для демонстрации показываем панель студента
        showUserPanel('student');

        // Скрываем индикатор загрузки
        document.querySelector('.loading').style.display = 'none';
    });

    // Уведомляем Telegram, что приложение готово
    tg.ready();

    document.getElementById('upload-form')?.addEventListener('submit', handleUpload);
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
}

async function checkAuthentication() {
    try {
        const response = await fetch(`${API_URL}/users/me`);
        if (response.ok) {
            const user = await response.json();
            // Инициализация Telegram Web App
            const tg = window.Telegram.WebApp;

            // Настройка темы
            document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor);
            document.documentElement.style.setProperty('--tg-theme-text-color', tg.textColor);
            document.documentElement.style.setProperty('--tg-theme-button-color', tg.buttonColor);
            document.documentElement.style.setProperty('--tg-theme-button-text-color', tg.buttonTextColor);

            // Расширяем на весь экран
            tg.expand();

            // Инициализация приложения
            document.addEventListener('DOMContentLoaded', () => {
                // Получаем данные пользователя из Telegram
                const user = tg.initDataUnsafe?.user;
                if (user) {
                    document.getElementById('user-name').textContent = `${user.first_name} ${user.last_name || ''}`;
                }

                // Добавляем пример расписания
                const schedule = [
                    { time: '9:00', subject: 'Математика', room: '301', teacher: 'Иванов И.И.' },
                    { time: '10:45', subject: 'Физика', room: '201', teacher: 'Петров П.П.' },
                    { time: '12:30', subject: 'Информатика', room: '401', teacher: 'Сидоров С.С.' }
                ];

                const scheduleList = document.getElementById('today-schedule');
                schedule.forEach(lesson => {
                    const lessonEl = document.createElement('div');
                    lessonEl.className = 'schedule-item';
                    lessonEl.innerHTML = `
                        <div class="lesson-time">${lesson.time}</div>
                        <div class="lesson-info">
                            <div class="lesson-subject">${lesson.subject}</div>
                            <div class="lesson-details">Каб. ${lesson.room} • ${lesson.teacher}</div>
                        </div>
                    `;
                    scheduleList.appendChild(lessonEl);
                });

                // Добавляем пример новостей
                const news = [
                    { title: 'День открытых дверей', date: '25 мая', content: 'Приглашаем всех на день открытых дверей в нашем колледже!' },
                    { title: 'Начало экзаменов', date: '1 июня', content: 'Расписание экзаменов доступно в разделе "Расписание"' }
                ];

                const newsList = document.getElementById('news-list');
                news.forEach(item => {
                    const newsEl = document.createElement('div');
                    newsEl.className = 'news-item';
                    newsEl.innerHTML = `
                        <div class="news-header">
                            <div class="news-title">${item.title}</div>
                            <div class="news-date">${item.date}</div>
                        </div>
                        <div class="news-content">${item.content}</div>
                    `;
                    newsList.appendChild(newsEl);
                });

                // Обработчики кнопок быстрых действий
                document.getElementById('btn-schedule')?.addEventListener('click', () => {
                    tg.showAlert('Открытие расписания...');
                });

                document.getElementById('btn-grades')?.addEventListener('click', () => {
                    tg.showAlert('Открытие оценок...');
                });

                document.getElementById('btn-homework')?.addEventListener('click', () => {
                    tg.showAlert('Открытие домашних заданий...');
                });

                document.getElementById('btn-attendance')?.addEventListener('click', () => {
                    tg.showAlert('Открытие посещаемости...');
                });

                // Обработчики кнопок навигации
                const navButtons = document.querySelectorAll('.nav-button');
                navButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        navButtons.forEach(btn => btn.classList.remove('active'));
                        button.classList.add('active');
                        tg.showAlert(`Переход к ${button.querySelector('.nav-text').textContent}...`);
                    });
                });
            });

            // Уведомляем Telegram, что приложение готово
            tg.ready();
            initializeUserInterface(user);
        } else {
            handleLogout();
        }
    } catch (error) {
        console.error('Authentication error:', error);
        handleLogout();
    }
}

async function loadData() {
    try {
        // Load users if in admin panel
        if (window.location.pathname === '/admin') {
          let tg = window.Telegram.WebApp;

// Инициализация Telegram Web App
tg.expand(); // Раскрываем на весь экран

// Устанавливаем основной цвет
document.documentElement.style.setProperty('--tg-theme-bg-color', tg.backgroundColor);
document.documentElement.style.setProperty('--tg-theme-text-color', tg.textColor);

// Показываем кнопку назад в хедере Telegram
tg.BackButton.show();

// Обработчик нажатия кнопки назад
tg.BackButton.onClick(() => {
    tg.close();
});

// Уведомляем Telegram, что приложение готово
tg.ready();
        }
        // Load documents
        await loadDocuments();
    } catch (error) {
        console.error('Error loading data:', error);
        showError('Ошибка загрузки данных');
    }
}

async function loadUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (response.ok) {
            const users = await response.json();
            renderUsers(users);
        }
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

async function loadDocuments() {
    try {
        const response = await fetch(`${API_URL}/documents`);
        if (response.ok) {
            const documents = await response.json();
            renderDocuments(documents);
        }
    } catch (error) {
        console.error('Error loading documents:', error);
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}
