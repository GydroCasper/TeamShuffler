# TeamShuffler
 
&emsp; The project is dedicated to using Telegram chat-bot to create teams of voleyball players. It split registered users in teams, which count is dependent on nets count, 2 by default. The bot balances the gender composition of each team. All the players have to register to play in a game for tonigth, and if they don't want to play anymore (or want to take a pause) they have to unregister.
Befeore the games starts, bot can shuffle all the registered players into teams balanced by gender.
All registration are automatically being disposed in 4 hours after last registration for tonight is defined.
The gender is stored Google Firebase, so it state doesn't clear in time.

&emsp; To use the bot, it is needed to add @team_shuffler_bot into a chat with people who participates in a game. After that all the commands will be availble to launch. The commmands and their parameters are:

- \r or \register - command that is sent by a player if he wants to be included in a random team in the next draft. This command is not shown in the common chat, the result of it be sent by personal message to an user.
- \d or \deregister - command is sent by a player who doesn't want to participate in drafts anymore. When he is ready to be in team again, "register" team is needed to be sent by an user. This command is not shown in the common chat, the result of it be sent by personal message to an user.
- \c or \clear - command to clear all registered users. This command is being executed automatically in 4 hours after last registration is completed. This command is shown in the common chat.
- \h or \help - command to show all commands options. This command is not shown in the common chat, the result of it be sent by personal message to an user.
- \l or \list - command to show all the registered users at the time. This command is shown in the common chat.
- \s or \shuffle - command to create teams out of registered users. They are created randomly taking into account gender of each player. The command takes nets amount as a parameter, like \s 3, if the parameter is not set explicitly, it is set to the default value of 2. Each run of the command leads to new results.. This command is shown in the common chat.
- \t or \test - command to demonstrate how \shuffle command works. It creates teams with a testing set of 20 players and takes as a parameter nets count the same way as \shuffle does. This command is shown in the common chat.
- \g or \gender - command to set a gender of a player. Gender is used in \shuffle command to create balanced teams. Gender is stored in Google Firebase database, so the data in not needed to add more than once. Takes as a parameter options "f" or "female" and "m" or "male". This command is not shown in the common chat, the result of it be sent by personal message to an user.
 
## Important note
 
&emsp; Bot sends some messages to a presonal chat with an user to not spam in the common chat, but according to Telegram security rules bot can't start conversation with any user privatly. So, to recieve messages from the bot in private user has to send any direct message to a bot @team_shuffler_bot, so after he can recieve all the direct messages from a bot to this chat.
