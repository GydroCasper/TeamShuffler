import { bot } from '../state.js';
import { saveGender } from '../db/firebase.js';

export const gender = async (msg, match) => {
  bot.deleteMessage(msg.chat.id, msg.message_id);

  if (!match?.length || match.length < 2 || !match[1]) {
    bot.sendMessage(
      msg.from.id,
      `Gender should be set. Acceptable parameters are 'm' or 'male' and 'f' or 'female'`
    );
    return;
  }

  const gender = match[1].trim().toLowerCase();

  if (!['m', 'f', 'male', 'female'].includes(gender)) {
    bot.sendMessage(
      msg.from.id,
      `There are just 2 to genders. Acceptable parameters are 'm' or 'male' and 'f' or 'female'`
    );
    return;
  }

  const isMale = ['m', 'male'].includes(gender);
  try {
    await saveGender(
      msg.from.id,
      msg.from.first_name,
      msg.from.username,
      msg.from.last_name,
      isMale
    );
  } catch (ex) {
    bot.sendMessage(msg.from.id, `Your gender is not saved due to: "${ex.toString()}"`);
    return;
  }

  bot.sendMessage(msg.from.id, `Your gender is set to: "${isMale ? 'male' : 'female'}"`);
};
