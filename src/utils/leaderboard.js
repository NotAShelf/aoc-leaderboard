import fsExtra from "fs-extra";
import { client } from "../index";
import { paginate, formatPageAsEmbed } from "./embed";

async function sendLeaderboard() {
  try {
    const data = await fsExtra.readJson("./data.json");
    const membersArray = Object.values(data.members);

    // paginate
    const pages = paginate(membersArray, 5);
    console.log("Total pages:", pages.length); // Log the total pages

    // target guild and channel
    const guildId = "445821876183367680";
    const channelId = "445829783452909586";
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

    const leftArrow = "⬅️";
    const rightArrow = "➡️";
    const embed = formatPageAsEmbed(pages[0]); // Format the first page as an embed

    channel.send({ embeds: [embed] }).then((message) => {
      message.react(leftArrow);
      message.react(rightArrow);

      const filter = (reaction, user) => {
        return (
          [leftArrow, rightArrow].includes(reaction.emoji.name) &&
          user.id !== client.user.id
        );
      };

      const collector = message.createReactionCollector({
        filter,
        time: 60000,
      }); // Collect reactions for 60 seconds

      let pageNumber = 0;

      collector.on("collect", (reaction, user) => {
        if (reaction.emoji.name === leftArrow) {
          if (pageNumber > 0) pageNumber--;
        } else if (reaction.emoji.name === rightArrow) {
          if (pageNumber < pages.length - 1) pageNumber++;
        }

        // update embed
        const newEmbed = formatPageAsEmbed(pages[pageNumber]);
        message.edit({ embeds: [newEmbed] });

        // remove the user's reaction
        reaction.users.remove(user.id);
      });
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

return sendLeaderboard();
