const Event = require("../../classes/Event");

class buttonInteraction extends Event {
  constructor(client) {
    super(client, {
      name: "interactionCreate",
      once: false,
    });
  }
  async run(interaction) {
    if (!interaction.isButton()) return;

    const button = this.client.buttons.get(interaction.customId);
    if (!button) return;

    // Run the Command
    button.run(interaction);
  }
}

module.exports = buttonInteraction;