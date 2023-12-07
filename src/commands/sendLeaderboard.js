import { SlashCommandBuilder } from "discord.js";
import messageLeaderboard from "../leaderboard/message.js";

const sendLeaderboardData = new SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("Fetches the Advent of Code leaderboard");

async function sendLeaderBoardExec(interaction) {
  try {
    await interaction.reply("Fetching leaderboard...");
    messageLeaderboard(interaction.channel);
  } catch (error) {
    console.error("Error fetching or messaging leaderboard:", error);
    await interaction.followUp("There was an error fetching the leaderboard.");
  }
}

export default { data: sendLeaderboardData, exec: sendLeaderBoardExec };
