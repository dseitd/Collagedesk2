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
    // Add event listeners
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
