const Modal = require("../../classes/Modal");

class buyModalForm extends Modal {
  constructor(client) {
    super(client, {
      id: "buyModalForm",
    });
  }
  async run(interaction) {
    const item_name = interaction.fields.getTextInputValue("buy_item_name");
    const item_quantiy =
      interaction.fields.getTextInputValue("buy_item_quantity");
    const item_price = interaction.fields.getTextInputValue("buy_item_price");

    if (isNaN(item_quantiy))
      return interaction.reply({
        content: "Quantity must be a number!.",
        ephemeral: true,
      });

    const embed = {
      color: 0xff0099,
      description: `Buying ${item_quantiy} ${item_name} at/for ${item_price}`,
      footer: {
        text: `${interaction.user.tag} | ${interaction.user.id}`,
        icon_url: interaction.user.displayAvatarURL(),
      },
    };

    const marketplace_channel = interaction.guild.channels.cache.get(
      this.client.config.channels.marketplace_channel,
    );

    await marketplace_channel.send({
      content: interaction.user.toString(),
      embeds: [embed]
    });

    interaction.reply({
      content: `Successfully sent your request to <#${this.client.config.channels.marketplace_channel}>`,
      ephemeral: true,
    });
  }
}

module.exports = buyModalForm;
