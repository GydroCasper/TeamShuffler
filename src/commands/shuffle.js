import { bot, registeredUsers } from '../state.js';
import { usersToArray } from '../user.js';
import { shufflePlayers } from '../shuffle.js';

export const shuffle = (msg, match) => {
  const playersList = usersToArray(registeredUsers);
  shufflePlayers(msg, match, playersList);
};
