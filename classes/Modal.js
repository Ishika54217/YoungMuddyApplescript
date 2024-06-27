class Modal {
  constructor(client, options = {}) {
    this.client = client;
      this.id = options.id || this.constructor.name.toLowerCase();
  }
  async run() {
    throw new Error(`${this.id} Modal doesn't provide a run method!`);
  }
}

module.exports = Modal;