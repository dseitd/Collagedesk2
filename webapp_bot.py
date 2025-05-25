import logging
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# URL вашего веб-приложения
WEBAPP_URL = "https://dseitd.github.io/Collagedesk2/"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    keyboard = [
        [InlineKeyboardButton(
            "Открыть CollegeDesk", 
            web_app=WebAppInfo(url=WEBAPP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "Привет! Я бот CollegeDesk. Нажмите кнопку ниже, чтобы открыть приложение:",
        reply_markup=reply_markup
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    keyboard = [
        [InlineKeyboardButton(
            "Открыть CollegeDesk", 
            web_app=WebAppInfo(url=WEBAPP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "Используйте кнопку ниже для доступа к CollegeDesk:",
        reply_markup=reply_markup
    )

async def webapp_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /webapp"""
    keyboard = [
        [InlineKeyboardButton(
            "Открыть CollegeDesk", 
            web_app=WebAppInfo(url=WEBAPP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        "Нажмите кнопку, чтобы открыть CollegeDesk прямо в Telegram:",
        reply_markup=reply_markup
    )

def main() -> None:
    """Запуск бота"""
    # Создаем приложение
    application = Application.builder().token('7640810813:AAF0b9PQbOEbImW3byH3HXTjaWS6RNzQG_M').build()

    # Добавляем обработчики команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("webapp", webapp_command))

    # Запускаем бота
    logger.info("Запуск бота...")
    application.run_polling(drop_pending_updates=True)

if __name__ == "__main__":
    main()
