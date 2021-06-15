/** @format */

const telegram = require('node-telegram-bot-api');

const token = '1797613826:AAEnB0SDYiEFXjLpRrQfFe11-v1pmzRFdF8';
const userID = 43257899;
const bot = new telegram(token, { polling: true });

function test(msg) {
  bot.sendMessage(userID, msg);
}

module.exports = {
  test,
};
