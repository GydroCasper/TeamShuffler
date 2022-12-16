import { userToString } from "../user.js";
import { bot, registeredUsers } from "../state.js";
import { launchTimerToDispose } from "../timer.js";

export const register = (msg) => {
  bot.deleteMessage(msg.chat.id, msg.message_id);
  if (msg.from.id in registeredUsers) {
    bot.sendMessage(
      msg.from.id,
      `You are in the pool of players in a chat "${msg.chat.title}" already`
    );
    return;
  }

  launchTimerToDispose(() => {
    bot.sendMessage(msg.chat.id, "Thanks for a game, players pool is disposed");
  });

  registeredUsers[msg.from.id] = userToString(msg.from);

  bot.sendMessage(msg.from.id, `You joined a pool of players in a chat "${msg.chat.title}"`);
};
