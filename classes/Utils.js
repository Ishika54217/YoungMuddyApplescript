const { Client, Guild } = require("discord.js");

module.exports = class Utils {
  constructor(client) {
    this.client = client;
  }
  async resolveMention(query, from, type = 0) {
    if (typeof query !== "string")
      throw new TypeError("Invalid String was Provided!");

    if (from && !(from instanceof Guild || from instanceof Client))
      throw new TypeError("Invalid Source Provided!");

    /** Extract the related object out of a Discord mention
      * @param      { String }                      query   Mention.
      * @param      { Discord.(Client | Guild) }    from    Specifies whether you want to retrieve this information from the client or the guild.
      * @param      { Number }                      type    What you want to extract | 0 = All, 1 = User, 2 = Role, 3 = Channel
      * @returns    { Object|undefined }                    An object with a "member", "role" or "channel" property corresponding to the mention, or "null" if the provided channel is not a mention
      */
    if (type < 0 || type > 3)
      throw new TypeError("The Type must be b/w 0 and 3.");

    const filter = `^<(${["@!?|@&|#", "@!?", "@&", "#"][type]})([0-9]+)>`,
      match = query.match(new RegExp(filter));

    if (!match) return;

    const prefix = match[1],
      id = match[2];

    if (prefix === "@&" && from instanceof Client)
      throw new TypeError("Roles only exist in a guild");

    switch (prefix) {
      case "@":
      case "@!":
        const type = from instanceof Client ? "users" : "members";
        return await from[type].fetch(match[2]).catch(() => { });

      case "@&": return await from.roles.fetch(id).catch(() => { });

      case "#": return await from.channels.cache.get(id);
    }
  }

  /** Converts a certain number of seconds to formatted time hh:mm:ss
   * @param {number} seconds // Name of second to convert
   */
  formatTime(seconds) {
    const h = Math.floor(seconds / 3600),
      m = Math.floor((seconds % 3600) / 60),
      s = Math.round(seconds % 60);

    return [
      h,
      m > 9 ? m : (h ? "0" + m : m || "0"),
      s > 9 ? s : "0" + s,
    ].filter(Boolean).join(":");
  }

  toAbbrev(num) {
    if (!num || isNaN(num)) return '0';
    if (typeof num === 'string') num = parseInt(num);
    let decPlaces = Math.pow(10, 1);
    var abbrev = ['K', 'M', 'B', 'T'];
    for (var i = abbrev.length - 1; i >= 0; i--) {
      var size = Math.pow(10, (i + 1) * 3);
      if (size <= num) {
        num = Math.round((num * decPlaces) / size) / decPlaces;
        if (num == 1000 && i < abbrev.length - 1) {
          num = 1;
          i++;
        }
        num += abbrev[i];
        break;
      }
    }
    return num;
  }

  trimString(str, max = 1024) {
    return str.length > max ? `${str.slice(0, max - 3)}...` : str;
  }

  randomRange(min, max) {
    if (!max) throw new Error('No maximum Number is Provided!');
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  * chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }
};