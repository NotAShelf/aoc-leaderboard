import { token, guildId, channelId } from "./handlers/configHandler.js";

import fetchLeaderboard from "./leaderboard/fetch.js";
import messageLeaderboard from "./leaderboard/message.js";

import handleInteraction from "./utils/handlers/interactionHandler.js";

import client from "./utils/client.js";
import { registerCommands, loadCommands } from "./utils/commands.js";

function sleep(s) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // target guild and channel
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    console.error("Guild ${guildId} not found");
    return;
  }

  const channel = guild.channels.cache.get(channelId);
  if (!channel) {
    console.error("Channel ${channelId} not found");
    return;
  }

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
});

console.log("Loading commands...");
try {
  await loadCommands();
  await registerCommands();
} catch (error) {
  console.error(error);
}

client.on("interactionCreate", async (interaction) => {
  await handleInteraction(interaction);
});

client.login(token);
