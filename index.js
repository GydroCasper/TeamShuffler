const express = require("express");
const expressApp = express();
expressApp.use(express.static("static"));
expressApp.use(express.json());
require("dotenv").config();
const telegramBot = require("node-telegram-bot-api");

const bot = new telegramBot(process.env.BOT_TOKEN, { polling: true });

let registeredUsers = {};
const DEFAULT_NETS_COUNT = 2;
const HOURS_TO_DISPOSE = 4;
let timerToDeletePlayers;

bot.onText(/\/r/, (msg) => {
  if (msg.text === "/r" || msg.text === "/register") {
    bot.deleteMessage(msg.chat.id, msg.message_id);
    if (msg.from.id in registeredUsers) {
      bot.sendMessage(
        msg.from.id,
        `You are in the pool of players in a chat "${msg.chat.title}" already`
      );
      return;
    }

    launchTimerToDispose();

    registeredUsers[msg.from.id] = userToString(msg.from);

    bot.sendMessage(
      msg.from.id,
      `You joined a pool of players in a chat "${msg.chat.title}"`
    );
  }
});

bot.onText(/\/d/, (msg) => {
  if (msg.text === "/d" || msg.text === "/deregister") {
    bot.deleteMessage(msg.chat.id, msg.message_id);
    if (!(msg.from.id in registeredUsers)) {
      bot.sendMessage(
        msg.from.id,
        `You weren't in a pool of players in a chat "${msg.chat.title}" anyway`
      );
      return;
    }

    delete registeredUsers[msg.from.id];
    bot.sendMessage(
      msg.from.id,
      `You left a pool of players in a chat "${msg.chat.title}"`
    );
  }
});

bot.onText(/\/l/, (msg) => {
  if (msg.text === "/l" || msg.text === "/list") {
    bot.deleteMessage(msg.chat.id, msg.message_id);
    const playersList = usersToString(registeredUsers);
    if (!playersList) {
      bot.sendMessage(msg.chat.id, "Nobody in a pool of players yet");
      return;
    }

    const response = `Current pool of the players is: \r\n${playersList}`;
    bot.sendMessage(msg.chat.id, response);
  }
});

bot.onText(/\/c/, (msg) => {
  if (msg.text === "/c" || msg.text === "/clear") {
    if (Object.keys(registeredUsers).length === 0) {
      bot.deleteMessage(msg.chat.id, msg.message_id);
      bot.sendMessage(
        msg.from.id,
        `Nobody in a pool of players, nothing to clean up`
      );
      return;
    }
    registeredUsers = {};
    bot.sendMessage(msg.chat.id, "Players pool is cleaned up");
  }
});

bot.onText(/\/s( .+)?/, (msg, match) => {
  if (msg.text.startsWith("/s") || msg.text.startsWith("/shuffle")) {
    const playersList = usersToArray(registeredUsers);
    // const playersList = getPlayersTestList();
    const netsCount =
      match && match.length && match[1] && +match[1] > 0
        ? +match[1]
        : DEFAULT_NETS_COUNT;

    if (!playersList) {
      bot.sendMessage(
        msg.chat.id,
        "Nobody in a pool of players yet, nobody plays"
      );
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
      const teams = shuffle(playersList, [], netsCount * 2);
      const response = `The teams are: \r\n\r\n${teamsToString(teams)}`;
      bot.sendMessage(msg.chat.id, response);
    } catch (ex) {
      bot.sendMessage(msg.chat.id, ex.text);
    }
  }
});

const shuffle = (list, teams, teamsCount, currentTeam = 0) => {
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

  return shuffle(list, teams, teamsCount, (currentTeam + 1) % teamsCount);
};

const userToString = (user) => {
  let name = "";

  if (user.first_name) {
    name += `${user.first_name} `;
  }

  if (user.username) {
    name += `"${user.username}" `;
  }

  if (user.last_name) {
    name += user.last_name;
  }

  return name;
};

const usersToString = (users) => {
  let response = "";
  for (const key in users) {
    if (response) {
      response += "\r\n";
    }

    response += users[key];
  }

  return response;
};

const usersToArray = (users) => {
  let response = [];
  for (const key in users) {
    response.push(users[key]);
  }

  return response;
};

const teamsToString = (teams) => {
  let response = "";
  for (let teamIndex = 0; teamIndex < teams.length; teamIndex++) {
    if (response) {
      response += "\r\n";
    }
    if (teamIndex > 0) {
      response += "\r\n";
    }
    response += `Team ${teamIndex + 1}`;

    const team = teams[teamIndex];
    for (let playerIndex = 0; playerIndex < team.length; playerIndex++) {
      response += `\r\n${team[playerIndex]}`;
    }
  }

  return response;
};

const getPlayersTestList = () => {
  return [
    "Johnny Sexton",
    "Rory Best",
    "Ronan O'Gara",
    "Beauden Barrett",
    "Brodie Retallick",
    "Alun Wyn Jones",
    "Owen Farrell",
    "Faf de Klerk",
    "Tadhg Furlong",
    "Maro Itoje",
    "Mako Vunipola",
    "Ardie Savea",
    "Billy Vunipola",
    "Handre Pollard",
    "Rieko Ioane",
    "Malcolm Marx",
    "Richie Mo'unga",
    "Cheslin Kolbe",
    "Jacob Stockdale",
    "Antoine Dupon",
  ];
};

const launchTimerToDispose = () => {
  if (timerToDeletePlayers) {
    clearTimeout(timerToDeletePlayers);
  }

  timerToDeletePlayers = setTimeout(() => {
    registeredUsers = [];
    bot.sendMessage(msg.chat.id, "Thanks for a game, players pool is disposed");
  }, HOURS_TO_DISPOSE * 60 * 60 * 1000);
};
