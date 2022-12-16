import telegramBot from "node-telegram-bot-api";

export let bot;
export let registeredUsers = [];

export let timerToDeletePlayers;

export const init = () => {
  bot = new telegramBot(process.env.BOT_TOKEN, { polling: true });
};

export const setTimer = (timerValue) => {
  timerToDeletePlayers = timerValue;
};

export const initRegisteredUsers = () => {
  registeredUsers = [];
};
