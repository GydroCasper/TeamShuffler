import { bot, initRegisteredUsers, isNoRegisteredUsers } from '../state.js';

export const clear = (msg) => {
  if (isNoRegisteredUsers(msg.chat.id)) {
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendMessage(msg.from.id, `Nobody in a pool of players, nothing to clean up`);
    return;
  }
  initRegisteredUsers(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'Players pool is cleaned up');
};
