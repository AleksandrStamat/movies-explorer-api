/** @format */

const telegram = require('node-telegram-bot-api');

const token = '1797613826:AAEnB0SDYiEFXjLpRrQfFe11-v1pmzRFdF8';
const userID = 43257899;
const bot = new telegram(token, { polling: true });

function message(msg) {
  bot.sendMessage(userID, msg);
}
const sendForm = (req, res, next) => {
  const {
    name,
    email,
    phone,
    msg,
  } = req.body;
  const text = `
Имя: ${name}
Email: ${email}
Телефон: ${phone}
Сообщение: ${msg}
  `;
  message(text);
  res.status(200).send({ message: 'Сообщение отправленно' });
}

module.exports = {
  sendForm,
};
