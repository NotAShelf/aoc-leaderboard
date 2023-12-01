const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const lbCommand = new SlashCommandBuilder()
  .setName("aoc-leaderboard")
  .setDescription("Displays the Advent of Code 2023 Leaderboard");

const commands = [lbCommand];

// FIXME: can we register slash commands without querying the REST API? I don't really know
const rest = new REST({ version: "9" }).setToken("token-here");

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
