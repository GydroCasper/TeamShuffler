import { bot, registeredUsers } from "../state.js";

export const deregister = (msg) => {
  bot.deleteMessage(msg.chat.id, msg.message_id);
  if (!(msg.from.id in registeredUsers)) {
    bot.sendMessage(
      msg.from.id,
      `You weren't in a pool of players in a chat "${msg.chat.title}" anyway`
    );
    return;
  }

  delete registeredUsers[msg.from.id];
  bot.sendMessage(msg.from.id, `You left a pool of players in a chat "${msg.chat.title}"`);
};
