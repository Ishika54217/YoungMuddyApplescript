const Command = require("../../classes/Command");

class Market extends Command {
  constructor(client) {
    super(client, {
      name: "market",
      description: "Displays a selling message in an embed.",
      category: "General",
      cooldown: 1000,
    });
  }

  async run(message, args) {
    // checking if enough args are provided
    if (args.length < 2) {
      return message.channel.send("Please provide an item and a price.");
    }

    const argument = args.join(" ").split(", ");
    const item = argument[0];
    const price = argument[1];

    const embed = {
      color: 0xff0099,
      title: `Item for Sale: ${item}`,
      description: `Price: ${price}`,
      timestamp: new Date().toISOString(),
      footer: {
        text: `Trade by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL(),
      },
    };

    message.channel.send({ embeds: [embed] });
  }
}

module.exports = Market;