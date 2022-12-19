import { bot } from './state.js';
import { DEFAULT_NETS_COUNT } from './constants.js';
import { teamsToString } from './team.js';

export const shufflePlayers = (msg, match, playersList) => {
  const netsCount =
    match && match.length && match[1] && +match[1] > 0 ? +match[1] : DEFAULT_NETS_COUNT;

  if (!playersList?.length) {
    bot.sendMessage(msg.chat.id, 'Nobody in a pool of players yet, nobody plays');
    return;
  }

  if (playersList.length < netsCount * 4) {
    bot.sendMessage(
      msg.chat.id,
      `There are just ${playersList.length} players to play on ${netsCount} nets`
    );
    return;
  }

  try {
    const teams = shuffleTeams(playersList, [], netsCount * 2);
    const response = `The teams are: \r\n\r\n${teamsToString(teams)}`;
    bot.sendMessage(msg.chat.id, response);
  } catch (ex) {
    bot.sendMessage(msg.chat.id, ex.toString());
  }
};

const shuffleTeams = (list, teams, teamsCount, currentTeam = 0) => {
  if (!list?.length) {
    throw new Error("List length can't be 0");
  }

  if (teams == null) {
    teams = [];
  }

  if (teamsCount <= currentTeam) {
    throw new Error(
      `Something went wrong. Current team ${currentTeam} is greater than list length ${list.length}`
    );
  }

  if (!teams[currentTeam]) {
    teams[currentTeam] = { players: [], malesSurplus: 0 };
  }

  if (list.length === 1) {
    teams[currentTeam] = addPlayer(teams[currentTeam], list[0]);
    return teams;
  }

  if (teams[currentTeam].malesSurplus == 0) {
    teams[currentTeam] = addRandomPlayer(list, teams[currentTeam]);
  } else {
    teams[currentTeam] = addPlayerWithGender(
      list,
      teams[currentTeam],
      teams[currentTeam].malesSurplus < 0
    );
  }

  return shuffleTeams(list, teams, teamsCount, (currentTeam + 1) % teamsCount);
};

const addPlayerWithGender = (list, team, maleNeeded) => {
  const genderIndexes = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i].isMale === maleNeeded) {
      genderIndexes.push(i);
    }
  }

  if (genderIndexes.length) {
    const genderIndexesIndex = Math.floor(Math.random() * genderIndexes.length);
    team = addPlayer(team, list[genderIndexes[genderIndexesIndex]]);
    list.splice(genderIndexes[genderIndexesIndex], 1);
    return team;
  } else {
    return addRandomPlayer(list, team);
  }
};

const addRandomPlayer = (list, team) => {
  const listIndex = Math.floor(Math.random() * list.length);
  team = addPlayer(team, list[listIndex]);
  list.splice(listIndex, 1);
  return team;
};

const addPlayer = (team, player) => {
  return {
    ...team,
    players: [...team.players, player],
    malesSurplus:
      team.malesSurplus + (player.isMale === true ? 1 : player.isMale === false ? -1 : 0),
  };
};
