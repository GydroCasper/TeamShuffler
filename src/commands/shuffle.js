import { getRegisteredUsers } from '../state.js';
import { usersToArray } from '../user.js';
import { shufflePlayers } from '../shuffle.js';

export const shuffle = (msg, match) => {
  const playersList = usersToArray(getRegisteredUsers(msg.chat.id));
  shufflePlayers(msg, match, playersList);
};
