import formatPageAsEmbed from "./formatLadderboard.js";
import client from "./client.js";

const LEFT_ARROW = "⬅️";
const RIGHT_ARROW = "➡️";

function messageLadderboard(channel, pages) {
  channel.send({ embeds: [formatPageAsEmbed(pages, 0)] }).then((message) => {
    message.react(LEFT_ARROW);
    message.react(RIGHT_ARROW);

    const filter = (reaction, user) => {
      return (
        [LEFT_ARROW, RIGHT_ARROW].includes(reaction.emoji.name) &&
        user.id !== client.user.id
      );
    };

    const collector = message.createReactionCollector({
      filter,
      time: 60000, // 60 seconds
    });

    let pageNumber = 0;

    collector.on("collect", (reaction, user) => {
      if (reaction.emoji.name === LEFT_ARROW) {
        if (pageNumber > 0) pageNumber--;
      } else if (reaction.emoji.name === RIGHT_ARROW) {
        if (pageNumber < pages.length - 1) pageNumber++;
      }

      // update embed
      const newEmbed = formatPageAsEmbed(pages, pageNumber);
      message.edit({ embeds: [newEmbed] });

      // remove the user's reaction
      reaction.users.remove(user.id);
    });
  });
}

export default messageLadderboard;
