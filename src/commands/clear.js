import { initRegisteredUsers, isNoRegisteredUsers } from '../state.js';
import { deleteMessage, sendMessageToChat, sendPersonalMessage } from '../bot.js';

export const clear = (msg) => {
  if (isNoRegisteredUsers(msg.chat.id)) {
    deleteMessage(msg.chat.id, msg.message_id);
    sendPersonalMessage(msg.from.id, `Nobody in a pool of players, nothing to clean up`);
    return;
  }
  initRegisteredUsers(msg.chat.id);
  sendMessageToChat(msg.chat.id, 'Players pool is cleaned up');
};
