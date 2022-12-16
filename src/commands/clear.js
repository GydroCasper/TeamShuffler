import { bot, initRegisteredUsers, registeredUsers } from "../state.js";

export const clear = (msg) => {
  if (Object.keys(registeredUsers).length === 0) {
    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendMessage(msg.from.id, `Nobody in a pool of players, nothing to clean up`);
    return;
  }
  initRegisteredUsers();
  bot.sendMessage(msg.chat.id, "Players pool is cleaned up");
};
