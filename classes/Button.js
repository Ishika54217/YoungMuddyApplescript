class Button {
  constructor(client, options = {}) {
    this.client = client;
    this.id = options.id || this.constructor.name.toLowerCase();
    this.userPerms = options.userPerms || null;
    this.botPerms = options.botPerms || null;
  }
  async run() {
    throw new Error(`${this.id} Button doesn't provide a run method!`);
  }
}

module.exports = Button;