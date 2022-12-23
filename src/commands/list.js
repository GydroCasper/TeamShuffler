import { getRegisteredUsers } from '../state.js';
import { usersToString } from '../user.js';
import { deleteMessage, sendMessageToChat } from '../bot.js';

export const list = (msg) => {
  deleteMessage(msg.chat.id, msg.message_id);
  const playersList = usersToString(getRegisteredUsers(msg.chat.id));
  if (!playersList) {
    sendMessageToChat(msg.chat.id, 'Nobody in a pool of players yet');
    return;
  }

  const response = `Current pool of the players is: \r\n${playersList}`;
  sendMessageToChat(msg.chat.id, response);
};
