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
let userData = {};

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.telegram.setMyCommands([
    {
      command: 'test',
      description: 'Тестова команда',
    },
    {
      command: 'greetings',
      description: 'Команда вітання',
    }
  ]);

bot.start((ctx) => {
    const userId = ctx.from.id;
    console.log(ctx.from);
    userData[userId] = {
    name: "",
    salary:{
        amount: 0,
        date: "",
    }};  
    ctx.reply('Вітаю!\nЦе телеграм бот "TGPC_Salary_Bot".\nВведіть, будь ласка, своє імя та фамілію:');

    bot.on('text', (ctx)=>{
        const userId = ctx.from.id;
        const text = ctx.message.text;
        const regex = /^[A-Za-zА-ЩЬЮЯҐЄІЇа-щьюяґєії\s]+$/u;
        if(regex.test(text)){
            userData[userId].name = text;
            ctx.reply(`Приємно познайомитись ${text}`);
        } else{
            ctx.reply('Ви ввели не допустимий символ!')
        }
    })
});
bot.command('test', (ctx)=>{
    ctx.reply('It is test!');
})


// bot.on('text', (ctx) => {
//     const userId = ctx.from.id;
//     const text = ctx.message.text;

//     if (!userData[userId].name) {
//         userData[userId].name = text;
//         ctx.reply(`Nice to meet you, ${userData[userId].name}! Now, please enter a number:`);
//     } else {
//         const number = parseInt(text);
//         if (!isNaN(number)) {
//             const currentDate = new Date();
//             const formattedDate = format(currentDate, 'yyyy-MM-dd');
//             let {amount, date} = userData[userId].salary;
//             amount = number;
//             date = formattedDate;
           
//             const rowValues = [[date,userData[userId].name,amount]];

//             mode(rowValues);
            

//             ctx.reply(`Thank you! You entered number ${number}. Feel free to enter another number or type /done when you're finished.`);
//         } else {
//             ctx.reply('That doesn\'t seem to be a valid number. Please enter a number:');
//         }
//     }
// });

// bot.command('done', (ctx) => {
//     const userId = ctx.from.id;
//     if (userData[userId] && userData[userId].numbers.length > 0) {
//         ctx.reply(`You have entered the following numbers: ${userData[userId].numbers.join(', ')}`);
//     } else {
//         ctx.reply('You have not entered any numbers yet.');
//     }
// });

module.exports ={
    bot,
}