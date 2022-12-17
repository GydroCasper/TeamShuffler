import express from "express";

const expressApp = express();
expressApp.use(express.static("static"));
expressApp.use(express.json());
import dotenv from "dotenv";

dotenv.config();
import { bot, init } from "./src/state.js";
import { register } from "./src/commands/register.js";
import { deregister } from "./src/commands/deregister.js";
import { list } from "./src/commands/list.js";
import { clear } from "./src/commands/clear.js";
import { shuffle } from "./src/commands/shuffle.js";

init();

bot.onText(/\/r/, (msg) => {
  if (msg.text === "/r" || msg.text === "/register") {
    register(msg);
  }
});

bot.onText(/\/d/, (msg) => {
  if (msg.text === "/d" || msg.text === "/deregister") {
    deregister(msg);
  }
});

bot.onText(/\/l/, (msg) => {
  if (msg.text === "/l" || msg.text === "/list") {
    list(msg);
  }
});

bot.onText(/\/c/, (msg) => {
  if (msg.text === "/c" || msg.text === "/clear") {
    clear(msg);
  }
});

bot.onText(/\/s( .+)?/, (msg, match) => {
  const command = msg.text.split(" ")[0];
  if (command === "/s" || command === "/shuffle") {
    shuffle(msg, match);
  }
});
