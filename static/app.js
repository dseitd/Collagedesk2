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
