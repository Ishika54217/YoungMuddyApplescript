const firstUpper = (text, split = ' ') => {
  return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`).join(' ');
};

class Command {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name || this.constructor.name.toLowerCase();
    this.aliases = options.aliases || [];
    this.description = options.description || null;
    this.category = firstUpper(options.category) || "General";
    this.usage = options.usage || null;
    this.example = options.example || [""];
    this.cooldown = options.cooldown || 3000;
    this.neededRole = options.neededRole || null;
    this.userPerms = options.userPerms || null;
    this.botPerms = options.botPerms || null;
    ;
    this.guildOnly = options.guildOnly || false;
    this.devOnly = options.devOnly || false;
    this.nsfw = options.nsfw || false;
    this.cooldown = new Map();
  }
  async run() {
    throw new Error(`Command ${this.name} doesn't Provide a Run Method!`);
  }
  startCooldown(user) {
    this.cooldown.set(`${this.message.guild?.id || "mp"}-${user}`, new Date(Date.now() + this.cooldown));

    setTimeout(() => this.cooldown.delete(`${this.message.guild?.id || "mp"}-${user}`), this.cooldown);
  }

  setMessage(message) {
    this.message = message;
  }

  /* 0 = denied, 1 = success, 2 = info*/
  embed(message, type, channel = this.message.channel) {
    type = parseInt(type);
    channel.send({
      embeds: [{
        color: type === 0 ? this.client.color.ERROR : type === 1 ? this.client.color.GREEN : type === 2 ? this.client.color.DEFAULT : this.client.color.DEFAULT,
        description: `${type === 0 ? this.client.emote.DENIED : type === 1 ? this.client.emote.SUCCESS : type === 2 ? this.client.emote.INFO : ""} ${message}`
      }]
    });
  }
}

module.exports = Command;