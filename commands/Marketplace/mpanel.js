const Command = require("../../classes/Command");
const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

class mPanel extends Command {
  constructor(client) {
    super(client, {
      name: "mpanel",
      description: "Creates a new buy panel in the desired channel.",
      category: "Marketplace",
      cooldown: 60000,
    });
  }
  async run(message, [target]) {
    target = parseInt(target) ? `<#${target}>` : target;

    let channel = await this.client.utils.resolveMention((target || `<#${message.channel.id}>`), message.guild, 3);

    if (!channel) return super.embed("Could not find a channel for the argument you provided, please try again.", 0);

    const embed = {
      color: 0xFF0099,
      fields: [
        {
          name: "Buy in Marketplace",
          value: "To post a buy post use button below",
        },
      ],
      footer: {
        text: `${this.client.user.username} - Trading without Clutter`,
      },
    };

    const ticketBtn = new ButtonBuilder()
      .setCustomId("buyBtn")
      .setLabel("Buy Post")
      .setEmoji("🤟")
      .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder()
      .addComponents(ticketBtn);

    return channel.send({ embeds: [embed], components: [row] });
  }
}

module.exports = mPanel;