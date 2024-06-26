const Event = require("../../classes/Event");

class messageCreate extends Event {
  constructor(client) {
    super(client, {
      name: "messageCreate",
      once: false,
    });
  }
  async run(message) {
    if (!message || message.author.bot || message.system) return;

    if (message.guild && !message.member) message.member = await message.guild.members.fetch(message.author);

    let mentionRegex = message.content.match(new RegExp(`^<@!?(${this.client.user.id})>`, 'gi'));

    const prefix = mentionRegex ? mentionRegex[0] : this.client.config.default_prefix;

    if (message.content && !message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
    if (!command) return;

    // Developer Only
    if (command.devOnly && !this.client.config.developers.includes(message.author.id)) return;

    // Guild Only
    if (command.guildOnly && !message.guild) return;
    command.setMessage(message);

    // Run the Command
    try {
    command.run(message, args);
    } catch (error) {
      console.log(error);
      return message.channel.send("It seems that an error occurred...");
    }
  }
}

module.exports = messageCreate;