const Command = require("../../classes/Command");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      aliases: ["commands"],
      description: "Display all commands for the bot or help for a specific category / command.",
      category: "General",
      usage: "",
      example: ["", "ping", "General"],
    });
  }
  async run(message, [argument]) {
    const categories = this.client.commands.reduce((groups, item) => ({ ...groups, [item.category]: [...(groups[item.category] || []), item] }), {});

    let fields = [];

    for (const category in categories) {
      if (Object.hasOwnProperty.call(categories, category)) {
        if (category === "Developer" && !this.client.config.developers.includes(message.author.id)) continue;

        fields.push({
          name: category,
          value: categories[category].map(command => "`" + command.name + "`").join(", ")
        })
      }
    }

    const embed = {
      color: 0xFF0099,
      author: {
        name: `${this.client.user.username} | Help has arrived!`,
        icon_url: this.client.user.displayAvatarURL()
      },
      description: `My prefix on this server is: \`${this.client.config.default_prefix}\`\nUse \`${this.client.config.default_prefix}help [category | command]\` to view more information about a command.`,
      fields: fields,
      timestamp: new Date().toISOString(),
      footer: {
        text: `Requested by ${message.author.tag}`,
        icon_url: message.author.displayAvatarURL(),
      },
    };

    return message.channel.send({ embeds: [embed] });
  }
}

module.exports = Help;