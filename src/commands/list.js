import { bot, getRegisteredUsers } from '../state.js';
import { usersToString } from '../user.js';

export const list = (msg) => {
  bot.deleteMessage(msg.chat.id, msg.message_id);
  const playersList = usersToString(getRegisteredUsers(msg.chat.id));
  if (!playersList) {
    bot.sendMessage(msg.chat.id, 'Nobody in a pool of players yet');
    return;
  }

  const response = `Current pool of the players is: \r\n${playersList}`;
  bot.sendMessage(msg.chat.id, response);
};
