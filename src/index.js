import { token, guildId, channelId } from "./utils/config.js";
import fetchLadderboard from "./utils/fetchLadderboard.js";
import formatPageAsEmbed from "./utils/formatLadderboard.js";
import messageLadderboard from "./utils/messageLadderboard.js";
import client from "./utils/client.js";

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // target guild and channel
  const guild = client.guilds.cache.get(guildId);
  if (!guild) {
    console.error("Guild not found");
    return;
  }

  const channel = guild.channels.cache.get(channelId);
  if (!channel) {
    console.error("Channel not found");
    return;
  }

  const dataPages = await fetchLadderboard();

  messageLadderboard(channel, dataPages);
});

client.login(token);
