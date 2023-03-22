import { bot } from '../state.js';
import { getNextFriday } from '../utils/dateUtils.js';
import dayjs from 'dayjs';

export const sendPoll = (msg) => {
  const nextFridayDate = getNextFriday();
  const question = `Friday, 18.15, Natick, ${dayjs(nextFridayDate).format('DD MMMM')}?`;
  const options = ['I go', 'Probably', 'Not this time', '+Bar after the game'];

  const pollOptions = {
    is_anonymous: false,
    type: 'regular',
    allows_multiple_answers: true,
  };

  bot.sendPoll(msg.chat.id, question, options, pollOptions);
};
