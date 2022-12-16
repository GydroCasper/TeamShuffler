import { timerToDeletePlayers, setTimer, initRegisteredUsers } from "./state.js";
import { HOURS_TO_DISPOSE } from "./constants.js";

export const launchTimerToDispose = (callback) => {
  if (timerToDeletePlayers) {
    clearTimeout(timerToDeletePlayers);
  }

  setTimer(
    setTimeout(() => {
      initRegisteredUsers();
      callback();
    }, HOURS_TO_DISPOSE * 60 * 60 * 1000)
  );
};
