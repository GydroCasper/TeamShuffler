import { shufflePlayers } from '../shuffle.js';
import { getPlayersTestList } from '../../data/teams.js';

export const test = (msg, match) => {
  const playersList = getPlayersTestList();
  shufflePlayers(msg, match, playersList);
};
