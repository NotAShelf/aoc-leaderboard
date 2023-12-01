const { EmbedBuilder } = require("discord.js");

function paginate(array, page_size) {
  if (!Array.isArray(array)) {
    throw new Error("Expected an array");
  }

  const pages = [];
  for (let i = 0; i < array.length; i += page_size) {
    pages.push(array.slice(i, i + page_size));
  }

  return pages;
}

function formatPageAsEmbed(page) {
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
    .setDescription("Use arrow reactions to navigate between pages")
    .setFooter({
      text: "Join our private leaderboard with the code 3319152-9754f45b",
      iconURL: "https://adventofcode.com/favicon.png",
    });

  for (const memberId in page) {
    const member = page[memberId];
    if (!member.name || !member.stars || !member.local_score) {
      continue; // Skip this member if any of the properties are missing
    }
    embed.addFields(
      {
        name: "Member ID - Name",
        value: `${String(memberId)} - ${member.name}`,
        inline: true,
      },
      {
        name: "Stars",
        value: "⭐".repeat(String(member.stars)),
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

return { paginate, formatPageAsEmbed };
