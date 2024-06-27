const Modal = require("../../classes/Modal");

class buyModalForm extends Modal {
  constructor(client) {
    super(client, {
      id: "buyModalForm",
    });
  }
  async run(interaction) {
    const item_name = interaction.fields.getTextInputValue("buy_item_name");
    const item_quantiy = interaction.fields.getTextInputValue("buy_item_quantity");
    const item_price = interaction.fields.getTextInputValue("buy_item_price");

    if (isNaN(item_quantiy)) return interaction.reply({ content: "Quantity must be a number!.", ephemeral: true });

    const embed = {
      color: 0xff0099,
      description: `Buying ${item_quantiy} ${item_name} at/for ${item_price}`,
      timestamp: new Date().toISOString(),
      footer: {
        text: `Trade by ${interaction.user.tag}`,
        icon_url: interaction.user.displayAvatarURL(),
      },
    };
    
    interaction.reply({ embeds: [embed], ephemeral: true });
  }
}

module.exports = buyModalForm;