const Event = require("../../classes/Event");
const { ActivityType } = require("discord.js");

class ready extends Event {
  constructor(client) {
    super(client, {
      name: "ready",
      once: true,
    });
  }
  async run() {
    this.client.user?.setPresence({ activities: [{ name: `${this.client.config.default_prefix}help`, type: ActivityType.Listening }], status: 'online' });

    console.log(`\n ——— ${this.client.user.tag}: READY!`.blue);
  }
}

module.exports = ready;