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
    if (!args.length) {
      return message.reply("please provide a valid number for the total price.");
    }

    let input = args[0].toLowerCase();

    // Replace shorthand notations with actual numbers
    input = input.replace(/(\d+)k/g, (match, p1) => `${p1}000`);
    input = input.replace(/(\d+)m/g, (match, p1) => `${p1}000000`);
    input = input.replace(/(\d+)b/g, (match, p1) => `${p1}000000000`);

    // Evaluate the expression
    let totalPrice;
    try {
      totalPrice = eval(input);
      if (isNaN(totalPrice)) {
        throw new Error();
      }
    } catch (error) {
      return message.reply("please provide a valid number for the total price.");
    }

    // Applying formulas
    const inWoollyChaps = totalPrice / 309.6;
    const inVioletDress = totalPrice / 327;
    const inDiamondRings = totalPrice / 824;
    const inBlankets = totalPrice / 1098;

    // Creating response message
    const response = `
total price: ${totalPrice}
in woolly chaps: ${inWoollyChaps.toFixed(2)}
in violet dresses: ${inVioletDress.toFixed(2)}
in diamond rings: ${inDiamondRings.toFixed(2)}
in blankets: ${inBlankets.toFixed(2)}
`;

    // Sending response
    message.channel.send(response);
  }
}

module.exports = CalculatePrice;