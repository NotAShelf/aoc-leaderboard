const rootPath = "./.";
import yaml from "js-yaml";
import fs from "fs";

async function getToken() {
  try {
    const filePath = rootPath + "/config.yml";
    const configFile = fs.readFileSync(filePath, "utf8");
    const token = yaml.load(configFile).token;

    // Use the token as needed
    // console.log("Token:", token);
    return token;
  } catch (error) {
    console.error("Error reading or parsing config file:", error);
  }
}

const token = getToken();

return { token, rootPath };
