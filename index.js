const express = require('express');
const expressApp = express();
const axios = require("axios");
const path = require("path");
const port = process.env.PORT || 3000;
expressApp.use(express.static('static'));
expressApp.use(express.json());
require('dotenv').config();
const telegramBot = require('node-telegram-bot-api');

const bot = new telegramBot(process.env.BOT_TOKEN, {polling: true});

bot.on('message', msg => {
    const { chat: { id }} = msg;
    bot.sendMessage(id, 'Hello World');
})