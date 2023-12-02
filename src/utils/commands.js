import { Collection, REST, Routes } from "discord.js";
import { token, clientId, guildId } from "./handlers/configHandler.js";

import { readdirSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

import client from "./client.js";

export async function loadCommands() {
  client.commands = new Collection();

  const currentFilePath = fileURLToPath(import.meta.url);
  const commandsDir = join(dirname(currentFilePath), "../../src/commands");

  const commandFolders = readdirSync(commandsDir);

  for (const folder of commandFolders) {
    const commandsPath = join(commandsDir, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".js"),
    );

    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      try {
        const commandModule = await import(filePath);
        const { commandData, execute } = commandModule;
        if (commandData && execute) {
          client.commands.set(commandData.name, { data: commandData, execute });
          console.log(`Loaded command ${commandData.name} at ${filePath}`);
        } else {
          console.log(
            `[WARNING] The command at ${filePath} is missing a required "commandData" or "execute" property.`,
          );
        }
      } catch (error) {
        console.error(`Error loading command from ${filePath}:`, error);
      }
    }
  }
}

const commands = [
  {
    name: "leaderboard",
    description: "Fetches the Advent of Code leaderboard",
  },
];
export async function registerCommands() {
  // Construct and prepare an instance of the REST module
  const rest = new REST().setToken(token);

  // and deploy your commands!
  (async () => {
    try {
      console.log(
        `Started refreshing ${commands.length} application (/) commands.`,
      );

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );

      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`,
      );
    } catch (error) {
      // And of course, make sure you catch and log any errors!
      console.error(error);
    }
  })();
}
