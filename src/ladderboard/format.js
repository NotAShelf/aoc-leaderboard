import { EmbedBuilder } from "discord.js";
import { ladderBoardNumber } from "../utils/config.js";

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
      `Join our private leaderboard with the code ${ladderBoardNumber}`,
    )
    .setFooter({
      text: `Page ${index + 1}/${
        pages.length
      }.\nUse arrow reactions to navigate between pages.`,
      iconURL: "https://adventofcode.com/favicon.png",
    });

  for (const memberId in page) {
    const member = page[memberId];
    if (!member.name || !member.stars || !member.local_score) {
      continue; // skip this member if any of the properties are missing
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
