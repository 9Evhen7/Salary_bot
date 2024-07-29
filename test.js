const { format } = require("date-fns");

const todayDate = new Date();
const formattedTodayDate = format(todayDate, "yyyy-MM-dd HH:mm");
const newName = `Photo ${formattedTodayDate}`;

console.log(newName);
