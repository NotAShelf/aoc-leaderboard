import { Collection, REST, Routes } from "discord.js";

import { token, clientId, guildId } from "./handlers/configHandler.js";
import client from "./client.js";

import sendLeaderboard from "../commands/sendLeaderboard.js";

// manually is cleaner and safer in our case
const commands = [sendLeaderboard];

export default async function loadCommands() {
  client.commands = new Collection();

  commands.forEach((command) => {
    client.commands.set(command.data.name, {
      data: command.data,
      execute: command.exec,
    });
  });

  await registerCommands(commands.map((c) => c.data));
}

async function registerCommands(commandsData) {
  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(token);

  // and deploy your commands!
  (async () => {
    console.log("Started refreshing application (/) commands.");

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: commandsData,
      },
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    );
  })();
}
