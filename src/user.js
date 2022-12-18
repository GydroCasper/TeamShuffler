export const userToString = (user) => {
  let name = '';

  if (user.first_name) {
    name += `${user.first_name}`;
  }

  if (user.username) {
    name += ` "${user.username}"`;
  }

  if (user.last_name) {
    name += ` ${user.last_name}`;
  }

  if (user.isMale === true) {
    name += ' (m)';
  } else if (user.isMale === false) {
    name += ' (f)';
  }

  return name;
};

export const usersToString = (users) => {
  let response = '';
  for (const key in users) {
    if (response) {
      response += '\r\n';
    }

    response += users[key];
  }

  return response;
};

export const usersToArray = (users) => {
  let response = [];
  for (const key in users) {
    response.push(users[key]);
  }

  return response;
};
