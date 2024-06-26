const axios = require('axios');
const qs = require('qs');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
const dotenv = require ('dotenv');
dotenv.config();

const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');

const {modifyExcelSheet} = require('./functions/modifyExcelSheet');

const {TENANT_ID, CLIENT_ID,CLIENT_SECRET, ITEM_ID, DOCUMENT_ID,SITE_ID} = process.env
const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const tenantId = TENANT_ID;
const itemId = ITEM_ID;
const siteId = SITE_ID;
  
const IdList = {
  siteId,
  itemId,
  tenantId,
}
const params = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default'
  };
  const rowValues = [['Date','Name','Salary']];

  const test = async()=>{
    await modifyExcelSheet(IdList,params,rowValues);
  }

  // test();

  const bot = new Telegraf(process.env.BOT_TOKEN);

  let userData = {};

bot.start((ctx) => {
    const userId = ctx.from.id;
    userData[userId] = { numbers: [] };  // Initialize the user's data
    ctx.reply('Welcome! Please enter your name:');
});

bot.on('text', (ctx) => {
    const userId = ctx.from.id;
    const text = ctx.message.text;

    if (!userData[userId]) {
        userData[userId] = { numbers: [] };  // Initialize the user's data if not already done
    }

    if (!userData[userId].name) {
        userData[userId].name = text;
        ctx.reply(`Nice to meet you, ${userData[userId].name}! Now, please enter a number:`);
    } else {
        const number = parseInt(text);
        if (!isNaN(number)) {
            userData[userId].numbers.push(number);
            ctx.reply(`Thank you! You entered number ${number}. Feel free to enter another number or type /done when you're finished.`);
        } else {
            ctx.reply('That doesn\'t seem to be a valid number. Please enter a number:');
        }
    }
});

bot.command('done', (ctx) => {
    const userId = ctx.from.id;
    if (userData[userId] && userData[userId].numbers.length > 0) {
        ctx.reply(`You have entered the following numbers: ${userData[userId].numbers.join(', ')}`);
    } else {
        ctx.reply('You have not entered any numbers yet.');
    }
});

bot.launch();