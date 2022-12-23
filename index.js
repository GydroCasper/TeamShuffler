import express from 'express';

const expressApp = express();
expressApp.use(express.static('static'));
expressApp.use(express.json());
import dotenv from 'dotenv';

dotenv.config();
import { bot, init } from './src/state.js';
import { register } from './src/commands/register.js';
import { deregister } from './src/commands/deregister.js';
import { list } from './src/commands/list.js';
import { clear } from './src/commands/clear.js';
import { shuffle } from './src/commands/shuffle.js';
import { gender } from './src/commands/gender.js';
import { test } from './src/commands/test.js';
import { help } from './src/commands/help.js';

init();

bot.onText(/\/[rR]/, (msg) => {
  const commandText = msg.text.toLowerCase();
  if (commandText === '/r' || commandText === '/register') {
    register(msg);
  }
});

bot.onText(/\/[dD]/, (msg) => {
  const commandText = msg.text.toLowerCase();
  if (commandText === '/d' || commandText === '/deregister') {
    deregister(msg);
  }
});

bot.onText(/\/[lL]/, (msg) => {
  const commandText = msg.text.toLowerCase();
  if (commandText === '/l' || commandText === '/list') {
    list(msg);
  }
});

bot.onText(/\/[cC]/, (msg) => {
  const commandText = msg.text.toLowerCase();
  if (commandText === '/c' || commandText === '/clear') {
    clear(msg);
  }
});

bot.onText(/\/[sS]( .+)?/, (msg, match) => {
  const commandText = msg.text.toLowerCase();
  const command = commandText.split(' ')[0];
  if (command === '/s' || command === '/shuffle') {
    shuffle(msg, match);
  }
});

bot.onText(/\/[gG]( .+)?/, (msg, match) => {
  const commandText = msg.text.toLowerCase();
  const command = commandText.split(' ')[0];
  if (command === '/g' || command === '/gender') {
    gender(msg, match);
  }
});

bot.onText(/\/[tT]( .+)?/, (msg, match) => {
  const commandText = msg.text.toLowerCase();
  const command = commandText.split(' ')[0];
  if (command === '/t' || command === '/test') {
    test(msg, match);
  }
});

bot.onText(/\/[hH]/, (msg) => {
  const commandText = msg.text.toLowerCase();
  if (commandText === '/h' || commandText === '/help') {
    help(msg);
  }
});
