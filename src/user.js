export const userToString = (user) => {
  let name = '';

  if (user.firstName) {
    name += `${user.firstName}`;
  }

  if (user.userName) {
    name += ` "${user.userName}"`;
  }

  if (user.lastName) {
    name += ` ${user.lastName}`;
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

    console.log(users[key]);

    response += userToString(users[key]);
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
