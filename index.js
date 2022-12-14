const express = require('express');
const expressApp = express();
expressApp.use(express.static('static'));
expressApp.use(express.json());
require('dotenv').config();
const telegramBot = require('node-telegram-bot-api');

const bot = new telegramBot(process.env.BOT_TOKEN, {polling: true});

const registeredUsers = {};

bot.onText(/\/r/, (msg) => {
    if(msg.text === '/r' || msg.text === '/register') {
        bot.deleteMessage(msg.chat.id, msg.message_id);
        if(msg.from.id in registeredUsers) {
            bot.sendMessage(msg.from.id,
                `You are in the pool of players in a chat "${msg.chat.title}" already`);
            return;
        }

        registeredUsers[msg.from.id] = userToString(msg.from);
        bot.sendMessage(msg.from.id,
            `You joined a pool of players in a chat "${msg.chat.title}"`);
    }
});

bot.onText(/\/d/, (msg) => {
    if(msg.text === '/d' || msg.text === '/deregister') {
        bot.deleteMessage(msg.chat.id, msg.message_id);
        if(!(msg.from.id in registeredUsers)) {
            bot.sendMessage(msg.from.id,
                `You weren't in a pool of players in a chat "${msg.chat.title}" anyway`);
            return;
        }

        delete registeredUsers[msg.from.id];
        bot.sendMessage(msg.from.id,
            `You left a pool of players in a chat "${msg.chat.title}"`);
    }
});

bot.onText(/\/s/, (msg) => {
    if(msg.text === '/s' || msg.text === '/show') {
        bot.deleteMessage(msg.chat.id, msg.message_id);
        const playersList = usersToString(registeredUsers);
        if(!playersList) {
            bot.sendMessage(msg.chat.id, 'Nobody in a pool of players yet');
            return;
        }

        const response = `Current pool of the players is: \r\n${playersList}`;
        bot.sendMessage(msg.chat.id, response);
    }
});

const userToString = (user) => {
    let name = '';

    if(user.first_name) {
        name += `${user.first_name} `;
    }

    if(user.username) {
        name += `"${user.username}" `;
    }

    if(user.last_name) {
        name += user.last_name;
    }

    return name;
}

function usersToString(users) {
    let response = '';
    for(const key in users) {
        if(response) {
            response += '\r\n';
        }

        response += users[key];
    }

    return response;
}