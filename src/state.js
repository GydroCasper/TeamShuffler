import telegramBot from 'node-telegram-bot-api';

export let bot;
let registeredUsers = {};

let timersToDeletePlayers = {};

export const init = () => {
  bot = new telegramBot(process.env.BOT_TOKEN, { polling: true });
};

export const setTimer = (chatId, timerValue) => {
  timersToDeletePlayers[chatId] = timerValue;
};

export const clearTimerToDeletePlayer = (chatId) => {
  if (timersToDeletePlayers[chatId]) {
    clearTimeout(timersToDeletePlayers[chatId]);
  }
};

export const initRegisteredUsers = (chatId) => {
  registeredUsers = { [chatId]: {} };
};

export const isNoRegisteredUsers = (chatId) => {
  if (!registeredUsers[chatId]) {
    initRegisteredUsers(chatId);
  }

  return Object.keys(registeredUsers[chatId]).length === 0;
};

export const getRegisteredUsers = (chatId) => {
  return { ...registeredUsers[chatId] };
};

export const deleteRegisteredUser = (chatId, userId) => {
  if (!registeredUsers[chatId]) {
    initRegisteredUsers(chatId);
  }

  delete registeredUsers[chatId][userId];
};

export const setRegisteredUser = (chatId, userId, user) => {
  if (!registeredUsers[chatId]) {
    initRegisteredUsers(chatId);
  }

  registeredUsers[chatId][userId] = {
    ...registeredUsers[chatId][userId],
    ...user,
  };
};
