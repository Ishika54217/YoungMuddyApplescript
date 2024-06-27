const Event = require("../../classes/Event");

class buttonInteraction extends Event {
  constructor(client) {
    super(client, {
      name: "interactionCreate",
      once: false,
    });
  }
  async run(interaction) {
    if (!interaction.isModalSubmit()) return;

    const modalInteraction = this.client.modalForms.get(interaction.customId);
    if (!modalInteraction) return;

    // Run the Command
    modalInteraction.run(interaction);
  }
}

module.exports = buttonInteraction;