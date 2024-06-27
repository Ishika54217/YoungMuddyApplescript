const Button = require("../../classes/Button");
const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

class buyBtn extends Button {
  constructor(client) {
    super(client, {
      id: "buyBtn",
    });
  }
  async run(interaction) {
    // create modal
    const modal = new ModalBuilder()
      .setCustomId("buyModalForm")
      .setTitle("Buy Item");

    // create text input fields
    const itemInput = new TextInputBuilder()
      .setCustomId("buy_item_name")
      .setLabel("Item Name")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const quantityInput = new TextInputBuilder()
      .setCustomId("buy_item_quantity")
      .setLabel("Quantity")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    const priceInput = new TextInputBuilder()
      .setCustomId("buy_item_price")
      .setLabel("Price")
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    // add inputs to modal
    modal.addComponents(
      new ActionRowBuilder().addComponents(itemInput),
      new ActionRowBuilder().addComponents(quantityInput),
      new ActionRowBuilder().addComponents(priceInput),
    );

    // show modal
    await interaction.showModal(modal);
  }
}

module.exports = buyBtn;
