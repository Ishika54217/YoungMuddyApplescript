const Command = require("../../classes/Command");

class Ping extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      aliases: ["pong"],
      description: "Runs a connection test to Discord.",
      category: "General",
      cooldown: 1000,
    });
  }
  async run(message) {
    const msg = await message.channel.send({ content: "Ping?" });

    msg.edit({ content: `Pong! (Roundtrip: ${msg.createdTimestamp - message.createdTimestamp}ms. Heartbeat: ${this.client.ws.ping}ms.)` });
  }
}

module.exports = Ping;