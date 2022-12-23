import { bot } from '../state.js';
import { DEFAULT_NETS_COUNT, HOURS_TO_DISPOSE } from '../constants.js';
import { getPlayersTestList } from '../../data/teams.js';

export const help = (msg) => {
  bot.deleteMessage(msg.chat.id, msg.message_id);
  bot.sendMessage(
    msg.from.id,
    'Commands, that are available: \r\n\r\n' +
      '\\r or \\register - command that is sent by a player if he wants to be included in a random team in the next draft. This command is not shown in the common chat, the result of it be sent by personal message to an user.\r\n\r\n' +
      '\\d or \\deregister - command is sent by a player who doesn\'t want to participate in drafts anymore. When he is ready to be in team again, "register" team is needed to be sent by an user. This command is not shown in the common chat, the result of it be sent by personal message to an user.\r\n\r\n' +
      `\\c or \\clear - command to clear all registered users. This command is being executed automatically in ${HOURS_TO_DISPOSE} hours after last registration is completed. This command is shown in the common chat.\r\n\r\n` +
      '\\h or \\help - command to show all commands options. This command is not shown in the common chat, the result of it be sent by personal message to an user.\r\n\r\n' +
      '\\l or \\list - command to show all the registered users at the time. This command is shown in the common chat.\r\n\r\n' +
      `\\s or \\shuffle - command to create teams out of registered users. They are created randomly taking into account gender of each player. The command takes nets amount as a parameter, like \\s 3, if the parameter is not set explicitly, it is set to the default value of ${DEFAULT_NETS_COUNT}'. Each run of the command leads to new results.. This command is shown in the common chat.\r\n\r\n` +
      `\\t or \\test - command to demonstrate how \\shuffle command works. It creates teams with a testing set of ${
        getPlayersTestList().length
      } players and takes as a parameter nets count the same way as \\shuffle does. This command is shown in the common chat.\r\n\r\n` +
      '\\g or \\gender - command to set a gender of a player. Gender is used in \\shuffle command to create balanced teams. Gender is stored in Google Firebase database, so the data in not needed to add more than once. Takes as a parameter options "f" or "female" and "m" or "male". This command is not shown in the common chat, the result of it be sent by personal message to an user.\r\n\r\n' +
      'All commands are case insensitive.'
  );
};
