import { setTimer, initRegisteredUsers, clearTimerToDeletePlayer } from './state.js';
import { HOURS_TO_DISPOSE } from './constants.js';

export const launchTimerToDispose = (chatId, callback) => {
  clearTimerToDeletePlayer(chatId);

  setTimer(
    setTimeout(() => {
      initRegisteredUsers(chatId);
      callback();
    }, HOURS_TO_DISPOSE * 60 * 60 * 1000)
  );
};
