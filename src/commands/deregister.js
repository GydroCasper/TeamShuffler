import { deleteRegisteredUser, getRegisteredUsers } from '../state.js';
import { deleteMessage, sendPersonalMessage } from '../bot.js';

export const deregister = (msg) => {
  deleteMessage(msg.chat.id, msg.message_id);
  if (!(msg.from.id in getRegisteredUsers(msg.chat.id))) {
    sendPersonalMessage(
      msg.from.id,
      `You weren't in a pool of players in a chat "${msg.chat.title}" anyway`
    );
    return;
  }

  deleteRegisteredUser(msg.chat.id, msg.from.id);
  sendPersonalMessage(msg.from.id, `You left a pool of players in a chat "${msg.chat.title}"`);
};
