import { EmbedBuilder } from "discord.js";
import { leaderboardNumber } from "../utils/handlers/configHandler.js";

function formatPageAsEmbed(pages, index) {
  const page = pages[index];

  const embed = new EmbedBuilder()
    .setColor("#ffffff")
    .setTitle("Advent of Code 2023 Leaderboard")
    .setURL("https://adventofcode.com/2023/leaderboard/private/view/3319152")
    .setAuthor({
      name: "Hyprland",
      iconURL:
        "https://cdn.discordapp.com/icons/961691461554950145/a_b8077e6dbd9b2ff7ee4127f702eb8369.gif?size=1024&width=0&height=233",
      url: "https://adventofcode.com/2023/leaderboard/private/view/3319152",
    })
    .setDescription(
      `Join our private leaderboard with the code ${leaderboardNumber}`,
    )
    .setFooter({
      text: `Page ${index + 1}/${
        pages.length
      }.\nUse arrow reactions to navigate.`,
      iconURL: "https://adventofcode.com/favicon.png",
    });

  for (const memberId in page) {
    const member = page[memberId];
    if (
      !member.name ||
      member.stars == undefined ||
      member.local_score == undefined
    ) {
      // skip this member if any of the properties are missing
      continue;
    }
    embed.addFields(
      {
        name: "Member ID - Name",
        value: `${String(memberId)} - ${member.name}`,
        inline: true,
      },
      {
        name: "Stars",
        value: `${member.stars}⭐`,
        inline: true,
      },
      {
        name: "Local Score",
        value: String(member.local_score),
        inline: true,
      },
    );
  }

  return embed;
}

export default formatPageAsEmbed;
