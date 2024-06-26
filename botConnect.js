const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const dotenv = require ('dotenv');
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply('Welcome'));