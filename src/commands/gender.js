import { saveGender } from '../db/firebase.js';
import { deleteMessage, sendPersonalMessage } from '../bot.js';

export const gender = async (msg, match) => {
  deleteMessage(msg.chat.id, msg.message_id);

  if (!match?.length || match.length < 2 || !match[1]) {
    sendPersonalMessage(
      msg.from.id,
      `Gender should be set. Acceptable parameters are 'm' or 'male' and 'f' or 'female'`
    );
    return;
  }

  const gender = match[1].trim().toLowerCase();

  if (!['m', 'f', 'male', 'female'].includes(gender)) {
    sendPersonalMessage(
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
    sendPersonalMessage(msg.from.id, `Your gender is not saved due to: "${ex.toString()}"`);
    return;
  }

  sendPersonalMessage(msg.from.id, `Your gender is set to: "${isMale ? 'male' : 'female'}"`);
};
