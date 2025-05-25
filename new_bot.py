import logging
import asyncio
from telegram import Update
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Обработчик команды /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.info('Получена команда /start')
    user = update.effective_user
    message = (
        f'Привет, {user.first_name}!\n'
        'Я ваш Telegram бот. Вот что я могу делать:\n'
        '/start - начать диалог\n'
        '/help - получить помощь\n'
        '/about - узнать обо мне\n'
        '/webapp - открыть веб-приложение\n'
        '/admin - открыть админ-панель\n'
    )
    logger.info('Отправка ответа на /start')
    await update.message.reply_text(message)

# Обработчик команды /help
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.info('Получена команда /help')
    await update.message.reply_text(
        'Я могу помочь вам с:\n'
        '/start - начать диалог\n'
        '/help - получить помощь\n'
        '/about - узнать обо мне\n'
        '/webapp - открыть веб-приложение\n'
        '/admin - открыть админ-панель\n'
        'Также я отвечаю на простые сообщения'
    )

# Обработчик команды /about
async def about_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.info('Получена команда /about')
    await update.message.reply_text(
        'Я бот CollegeDesk, созданный для управления документами.\n'
        'Используйте /webapp для доступа к веб-приложению или /admin для входа в админ-панель.'
    )

# Обработчик команды /webapp
async def webapp_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.info('Получена команда /webapp')
    webapp_url = "https://dseitd.github.io/Collagedesk2/"
    await update.message.reply_text(
        f'Откройте веб-приложение CollegeDesk по ссылке:\n{webapp_url}'
    )

# Обработчик команды /admin
async def admin_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.info('Получена команда /admin')
    admin_url = "https://dseitd.github.io/Collagedesk2/admin"
    await update.message.reply_text(
        f'Откройте админ-панель CollegeDesk по ссылке:\n{admin_url}'
    )

# Обработчик текстовых сообщений
async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.info('Получено текстовое сообщение')
    user_message = update.message.text
    await update.message.reply_text(
        f'Вы сказали: {user_message}\n'
        'Я повторяю все, что вы говорите!'
    )

# Обработчик ошибок
async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.error(f'Update {update} caused error {context.error}')

async def main() -> None:
    # Инициализация бота
    application = Application.builder().token('7640810813:AAF0b9PQbOEbImW3byH3HXTjaWS6RNzQG_M').build()

    # Добавляем обработчики команд
    application.add_handler(CommandHandler('start', start))
    application.add_handler(CommandHandler('help', help_command))
    application.add_handler(CommandHandler('about', about_command))
    application.add_handler(CommandHandler('webapp', webapp_command))
    application.add_handler(CommandHandler('admin', admin_command))
    
    # Добавляем обработчик текстовых сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    # Добавляем обработчик ошибок
    application.add_error_handler(error_handler)

    # Запускаем бота
    logger.info("Запуск бота...")
    await application.initialize()
    await application.start()
    await application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    asyncio.run(main())
