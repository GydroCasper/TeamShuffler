import { bot, registeredUsers } from "../state.js";
import { teamsToString } from "../team.js";
import { DEFAULT_NETS_COUNT } from "../constants.js";
import { getPlayersTestList } from "../../data/teams.js";
import { usersToArray } from "../user.js";

export const shuffle = (msg, match) => {
  // const playersList = usersToArray(registeredUsers);
  const playersList = getPlayersTestList();
  const netsCount =
    match && match.length && match[1] && +match[1] > 0 ? +match[1] : DEFAULT_NETS_COUNT;

  if (!playersList?.length) {
    bot.sendMessage(msg.chat.id, "Nobody in a pool of players yet, nobody plays");
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
    bot.sendMessage(msg.chat.id, ex.text);
  }
};

export const shuffleTeams = (list, teams, teamsCount, currentTeam = 0) => {
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
    teams[currentTeam] = [];
  }

  if (list.length === 1) {
    teams[currentTeam].push(list[0]);
    return teams;
  }

  const listIndex = Math.floor(Math.random() * list.length);
  teams[currentTeam].push(list[listIndex]);
  list.splice(listIndex, 1);

  return shuffleTeams(list, teams, teamsCount, (currentTeam + 1) % teamsCount);
};
