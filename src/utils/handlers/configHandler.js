import yaml from "js-yaml";
import fs from "fs";

import { exit } from "process";

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

const config = getConfig(FILE_PATH);

export const {
  token,
  guildId,
  channelId,
  clientId,
  aocToken,
  leaderboardNumber,
  channel,
} = config;
