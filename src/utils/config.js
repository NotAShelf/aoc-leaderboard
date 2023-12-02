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
  };
}

export const { token, guildId, channelId } = getConfig(filePath);
