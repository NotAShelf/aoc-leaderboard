import yaml from "js-yaml";
import fs from "fs";

const FILE_PATH = "./config.yml";

function getConfig(filePath) {
  const configFile = fs.readFileSync(filePath, "utf8");
  const config = yaml.load(configFile);
  return {
    token: config.token,
    guildId: config.guildId,
    channelId: config.channelId,
    aocToken: config.aocToken,
    leaderboardNumber: config.leaderboardNumber,
  };
}

export const { token, guildId, channelId, aocToken, leaderboardNumber } =
  getConfig(FILE_PATH);
