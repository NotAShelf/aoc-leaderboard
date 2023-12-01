const rootPath = "./.";

// get bot token from config.yml
const yaml = require("js-yaml");
const fs = require("fs");
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
