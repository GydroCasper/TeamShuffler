import { getRegisteredUsers, setRegisteredUser } from '../state.js';
import { launchTimerToDispose } from '../timer.js';
import { fetchUserInfo } from '../db/firebase.js';
import { deleteMessage, sendMessageToChat, sendPersonalMessage } from '../bot.js';

export const register = async (msg) => {
  deleteMessage(msg.chat.id, msg.message_id);
  if (msg.from.id in getRegisteredUsers(msg.chat.id)) {
    sendPersonalMessage(
      msg.from.id,
      `You are in the pool of players in a chat "${msg.chat.title}" already`
    );
    return;
  }

  launchTimerToDispose(msg.chat.id, () => {
    sendMessageToChat(msg.chat.id, 'Thanks for a game, players pool is disposed');
  });

  fetchUserInfo(msg.chat.id, msg.from.id);

  setRegisteredUser(msg.chat.id, msg.from.id, {
    firstName: msg.from.first_name,
    userName: msg.from.username,
    lastName: msg.from.last_name,
  });

  sendPersonalMessage(msg.from.id, `You joined a pool of players in a chat "${msg.chat.title}"`);
};
