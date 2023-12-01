import fsExtra from "fs-extra";
import { Client, GatewayIntentBits, EmbedBuilder } from "discord.js";
import { token, rootPath } from "./utils/login";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
  try {
    const data = await fsExtra.readJson(rootPath + "/data.json");
    const membersArray = Object.values(data.members);

    // paginate
    const pages = paginate(membersArray, 5);
    console.log("Total pages:", pages.length); // log the total pages

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
    const embed = formatPageAsEmbed(pages[0]); // format the first page as an embed

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
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

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
