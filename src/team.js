export const teamsToString = (teams) => {
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
