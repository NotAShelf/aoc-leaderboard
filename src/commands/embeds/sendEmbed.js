import { SlashCommandBuilder } from "discord.js";
import fetchLeaderboard from "../../leaderboard/fetch.js";
import messageLeaderboard from "../../leaderboard/message.js";

import { channel } from "../handlers/configHandler.js";

function sleep(s) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

const commandData = new SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("Fetches the Advent of Code leaderboard");

async function execute(interaction) {
  try {
    await interaction.reply("Fetching leaderboard...");
    let dataPages = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const newDataPages = await fetchLeaderboard();

      if (newDataPages.length > 0) {
        dataPages = newDataPages;
      }

      messageLeaderboard(channel, dataPages);

      await sleep(3600);
    }
  } catch (error) {
    console.error("Error fetching or messaging leaderboard:", error);
    await interaction.followUp("There was an error fetching the leaderboard.");
  }
}

export { commandData, execute };
