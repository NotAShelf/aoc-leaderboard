import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { token, guildId, channelId } from "./utils/config.js";
import fetchLadderboard from "./utils/fetchLadderboard.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // target guild and channel
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

  const dataPages = await fetchLadderboard();

  const leftArrow = "⬅️";
  const rightArrow = "➡️";
  const embed = formatPageAsEmbed(dataPages[0]); // format the first page as an embed

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
      time: 60000, // 60 seconds
    });

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
});

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

client.login(token);
