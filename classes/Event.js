class Event {
  constructor(client, options = {}) {
    this.client = client;
    this.name = options.name || this.constructor.name;
    this.once = options.once ? "once" : "on";
  }
  async run(...args) {
    throw new Error(`${this.name} Event doesn't Provide a Run Method!`);
  }
}

module.exports = Event;