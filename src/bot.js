import { bot } from './state.js';
import { log } from './log.js';

export const sendPersonalMessage = (recipientId, text) => {
  try {
    bot.sendMessage(recipientId, text);
  } catch (ex) {
    log(ex);
  }
};

export const sendMessageToChat = (chatId, text) => {
  try {
    bot.sendMessage(chatId, text);
  } catch (ex) {
    log(ex);
  }
};

export const deleteMessage = (chatId, messageId) => {
  try {
    bot.deleteMessage(chatId, messageId);
  } catch (ex) {
    sendMessageToChat(chatId, `Can't delete message due to: ${ex}`);
    log(ex);
  }
};
