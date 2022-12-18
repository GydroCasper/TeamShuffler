export const getPlayersTestList = () => {
  return [
    playerConstructor('Jonny', '', 'Sexton', false),
    playerConstructor('Rory', '', 'Best', true),
    playerConstructor('Ronan', '', "O'Gara", true),
    playerConstructor('Beauden', '', 'Barrett', true),
    playerConstructor('Brodie', '', 'Retallick', false),
    playerConstructor('Alun', '', 'Wyn Jones'),
    playerConstructor('Owen', '', 'Farrell'),
    playerConstructor('Faf', '', 'de Klerk', false),
    playerConstructor('Tadhg', '', 'Furlong'),
    playerConstructor('Maro', '', 'Itoje', true),
    playerConstructor('Mako', '', 'Vunipola'),
    playerConstructor('Ardie', '', 'Savea', false),
    playerConstructor('Billy', '', 'Vunipola'),
    playerConstructor('Handre', '', 'Pollard', false),
    playerConstructor('Rieko', '', 'Ioane', true),
    playerConstructor('Malcolm', '', 'Marx'),
    playerConstructor('Richie', '', "Mo'unga", true),
    playerConstructor('Cheslin', '', 'Kolbe', false),
    playerConstructor('Jacob', '', 'Stockdale', true),
    playerConstructor('Antoine', '', 'Dupon', false),
  ];
};

const playerConstructor = (name, username, lastName, isMale) => {
  const player = {
    first_name: name,
    username: username,
    last_name: lastName,
  };

  if (isMale === true) {
    player.isMale = true;
  } else if (isMale === false) {
    player.isMale = false;
  }

  return player;
};
