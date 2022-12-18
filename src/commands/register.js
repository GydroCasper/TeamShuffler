import { bot, registeredUsers } from '../state.js';
import { launchTimerToDispose } from '../timer.js';
import { fetchUserInfo } from '../db/firebase.js';

export const register = async (msg) => {
  bot.deleteMessage(msg.chat.id, msg.message_id);
  if (msg.from.id in registeredUsers) {
    bot.sendMessage(
      msg.from.id,
      `You are in the pool of players in a chat "${msg.chat.title}" already`
    );
    return;
  }

  launchTimerToDispose(() => {
    bot.sendMessage(msg.chat.id, 'Thanks for a game, players pool is disposed');
  });

  fetchUserInfo(msg.from.id);

  registeredUsers[msg.from.id] = {
    ...registeredUsers[msg.from.id],
    firstName: msg.from.first_name,
    userName: msg.from.username,
    lastName: msg.from.last_name,
  };

  bot.sendMessage(msg.from.id, `You joined a pool of players in a chat "${msg.chat.title}"`);
};
