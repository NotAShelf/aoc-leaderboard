import yaml from "js-yaml";
import fs from "fs";

const filePath = "./config.yml";

function getConfig(filePath) {
  const configFile = fs.readFileSync(filePath, "utf8");
  const config = yaml.load(configFile);
  return {
    token: config.token,
    guildId: config.guildId,
    channelId: config.channelId,
    aocToken: config.aocToken,
    ladderBoardNumber: config.ladderBoardNumber,
  };
}

export const { token, guildId, channelId, aocToken, ladderBoardNumber } =
  getConfig(filePath);
