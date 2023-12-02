import yaml from "js-yaml";
import fs from "fs";
import client from "./client.js";

const FILE_PATH = "./config.yml";

function getConfig(filePath) {
  const configFile = fs.readFileSync(filePath, "utf8");
  const config = yaml.load(configFile);

  return {
    token: config.token,
    guildId: config.guildId,
    channelId: config.channelId,
    clientId: config.clientId,
    aocToken: config.aocToken,
    leaderboardNumber: config.leaderboardNumber,
  };
}

const validateConfig = (config) => {
  // target guild and channel
  const guild = client.guilds.cache.get(config.guildId);
  if (!guild) {
    console.error(`Guild ${config.guildId} not found`);
    return;
  }

  const channel = guild.channels.cache.get(config.channelId);
  if (!channel) {
    console.error(`Channel ${config.channelId} not found`);
    return;
  }

  return channel && guild;
};

export const {
  token,
  guildId,
  channelId,
  clientId,
  aocToken,
  leaderboardNumber,
  channel,
} = getConfig(FILE_PATH);

// Example usage:
validateConfig({
  token,
  guildId,
  channelId,
  clientId,
  aocToken,
  leaderboardNumber,
});
