const Command = require("../../classes/Command");

class CalculatePrice extends Command {
  constructor(client) {
    super(client, {
      name: "calculateprice",
      aliases: ["cp"],
      description: "Calculates price in different items.",
      category: "Utility",
    });
  }

  async run(message, args) {
    if (!args.length || isNaN(args[0])) {
      return message.reply(
        "please provide a valid number for the total price.",
      );
    }

    const totalPrice = parseFloat(args[0]);

    // applying formulas
    const inWoollyChaps = totalPrice / 309.6;
    const inVioletDress = totalPrice / 327;
    const inDiamondRings = totalPrice / 824;
    const inBlankets = totalPrice / 1098;

    // creating response message
    const response = `
total price: ${totalPrice}
in woolly chaps: ${inWoollyChaps.toFixed(2)}
in violet dresses: ${inVioletDress.toFixed(2)}
in diamond rings: ${inDiamondRings.toFixed(2)}
in blankets: ${inBlankets.toFixed(2)}
`;

    // sending response
    message.channel.send(response);
  }
}

module.exports = CalculatePrice;
