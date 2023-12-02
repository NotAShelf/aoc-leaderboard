import { token, guildId, channelId } from "./utils/config.js";
import fetchLeaderboard from "./leaderboard/fetch.js";
import messageLeaderboard from "./leaderboard/message.js";
import client from "./utils/client.js";

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

client.login(token);
