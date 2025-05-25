import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes, CallbackQueryHandler

# Enable logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Create logger
logger = logging.getLogger(__name__)

# Bot token
TOKEN = '6520786302:AAEbTOKBpVkBIuVyQTOFtGEAZXLyAEQlWxo'

# Web app URL
WEB_APP_URL = 'https://dseitd.github.io/Collagedesk2/'

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /start is issued."""
    # Создаем кнопку для открытия веб-приложения
    keyboard = [
        [InlineKeyboardButton(
            text="💻 Открыть CollegeDesk",
            web_app=WebAppInfo(url=WEB_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_text(
        '👋 Привет! Я бот CollegeDesk.\n\n'
        '✨ С моей помощью вы можете:\n'
        '- Просматривать расписание\n'
        '- Отслеживать успеваемость\n'
        '- Получать домашние задания\n'
        '- Следить за новостями колледжа\n\n'
        '⭕️ Нажмите кнопку ниже, чтобы начать:',
        reply_markup=reply_markup
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /help is issued."""
    keyboard = [
        [InlineKeyboardButton(
            text="💻 Открыть CollegeDesk",
            web_app=WebAppInfo(url=WEB_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    help_text = """✨ *Команды бота:*

/start - Начать работу с ботом
/help - Показать это сообщение
/about - Информация о боте

💻 Для доступа к веб-приложению используйте кнопку ниже:"""
    
    await update.message.reply_text(
        help_text,
        parse_mode='Markdown',
        reply_markup=reply_markup
    )

async def about(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send a message when the command /about is issued."""
    keyboard = [
        [InlineKeyboardButton(
            text="💻 Открыть CollegeDesk",
            web_app=WebAppInfo(url=WEB_APP_URL)
        )]
    ]
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    about_text = """🎓 *CollegeDesk*

Современная система управления колледжем

✨ *Возможности:*
- Расписание занятий
- Успеваемость
- Домашние задания
- Новости колледжа

Версия: 2.0"""
    
    await update.message.reply_text(
        about_text,
        parse_mode='Markdown',
        reply_markup=reply_markup
    )

def main() -> None:
    """Start the bot."""
    # Create the Application
    application = Application.builder().token(TOKEN).build()

    # Add command handlers
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("about", about))

    # Start the Bot
    application.run_polling(allowed_updates=Update.ALL_TYPES)

if __name__ == '__main__':
    main()
