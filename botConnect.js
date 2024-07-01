const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const { format } = require('date-fns');
const dotenv = require ('dotenv');
dotenv.config();


const {IdList,params} = require('./params');
const {modifyExcelSheet} = require('./functions/modifyExcelSheet');

const mode = async(rowV)=>{
    await modifyExcelSheet(IdList,params,rowV);
}

const bot = new Telegraf(process.env.BOT_TOKEN);
let userData = {};
bot.start((ctx) => {
    const userId = ctx.from.id;
    userData[userId] = {
    name: "",
    salary:{
        amount: 0,
        date: "",
    }
    };  
    ctx.reply('Welcome! Please enter your name:');
});

bot.on('text', (ctx) => {
    const userId = ctx.from.id;
    const text = ctx.message.text;

    if (!userData[userId].name) {
        userData[userId].name = text;
        ctx.reply(`Nice to meet you, ${userData[userId].name}! Now, please enter a number:`);
    } else {
        const number = parseInt(text);
        if (!isNaN(number)) {
            const currentDate = new Date();
            const formattedDate = format(currentDate, 'yyyy-MM-dd');
            let {amount, date} = userData[userId].salary;
            amount = number;
            date = formattedDate;
           
            const rowValues = [[date,userData[userId].name,amount]];

            mode(rowValues);
            

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

module.exports ={
    bot,
}