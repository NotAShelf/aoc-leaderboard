import { token, guildId, channelId } from "./utils/handlers/configHandler.js";

import messageLeaderboard from "./leaderboard/message.js";

import handleInteraction from "./utils/handlers/interactionHandler.js";

import client from "./utils/client.js";
import loadCommands from "./utils/commands.js";

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const guild = client.guilds.cache.get(guildId);

  if (!guild) {
    console.error("Guild ${guildId} not found");
  }

  const channel = guild.channels.cache.get(channelId);

  // target guild and channel

  messageLeaderboard(channel);
});

console.log("Loading commands.");

loadCommands();

client.on("interactionCreate", async (interaction) => {
  await handleInteraction(interaction);
});

client.login(token);
