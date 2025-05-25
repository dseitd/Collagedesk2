import logging
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
    user = update.effective_user
    await update.message.reply_text(
        f'Привет, {user.first_name}!\n'
        'Я ваш Telegram бот. Вот что я могу делать:\n'
        '/start - начать диалог\n'
        '/help - получить помощь\n'
        '/about - узнать обо мне\n'
    )

# Обработчик команды /help
async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        'Я могу помочь вам с:\n'
        '/start - начать диалог\n'
        '/help - получить помощь\n'
        '/about - узнать обо мне\n'
        'Также я отвечаю на простые сообщения'
    )

# Обработчик команды /about
async def about_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text(
        'Я простой Telegram бот, созданный на Python.\n'
        'Я могу отвечать на команды и обрабатывать текстовые сообщения.'
    )

# Обработчик текстовых сообщений
async def echo(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user_message = update.message.text
    await update.message.reply_text(
        f'Вы сказали: {user_message}\n'
        'Я повторяю все, что вы говорите!'
    )

# Обработчик ошибок
async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.error(f'Update {update} caused error {context.error}')

def main() -> None:
    # Замените 'YOUR_BOT_TOKEN' на ваш токен бота
    application = Application.builder().token('7640810813:AAF0b9PQbOEbImW3byH3HXTjaWS6RNzQG_M').build()

    # Добавляем обработчики команд
    application.add_handler(CommandHandler('start', start))
    application.add_handler(CommandHandler('help', help_command))
    application.add_handler(CommandHandler('about', about_command))
    
    # Добавляем обработчик текстовых сообщений
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, echo))

    # Добавляем обработчик ошибок
    application.add_error_handler(error_handler)

    # Запускаем бота
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()
