const { Client, Collection, GatewayIntentBits, Collector } = require("discord.js");
    const { readdirSync } = require("fs");
    const path = require("path");
    const colors = require("colors");

    const Command = require("./Command.js");
    const Event = require("./Event.js");

    class Bot extends Client {
      constructor(options = {}) {
        super({
          ...options,
          disableMentions: 'everyone',
          shard: 'auto',
          restTimeOffset: 0,
          partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION'],
          intents: [
            GatewayIntentBits.Guilds,//
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            //GatewayIntentBits.GuildBans,
            //GatewayIntentBits.DirectMessageReactions,
            //GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.DirectMessages,
            //GatewayIntentBits.GuildEmojisAndStickers,
            //GatewayIntentBits.GuildIntegrations,
            //GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildMembers,
            //GatewayIntentBits.GuildMessageReactions,
            //GatewayIntentBits.GuildMessageTyping,
            GatewayIntentBits.GuildPresences,
            //GatewayIntentBits.GuildScheduledEvents,
            //GatewayIntentBits.GuildVoiceStates,
            //GatewayIntentBits.GuildWebhooks,
          ],
          ws: { properties: { browser: 'Discord iOS' } },
        });

        this.config = require("../config.js");
        this.commands = new Collection();
        this.aliases = new Collection();
        this.utils = new (require("../classes/Utils"))(this);

        console.clear();
        console.log(`Client Initialised —— Node ${process.version}.`);
      }

      loadAntiCrash() {
        process.on('unhandledRejection', (reason, p) => {
          console.log(' [antiCrash] :: Unhandled Rejection/Catch');
          console.log(reason, p);
        });
        process.on("uncaughtException", (err, origin) => {
          console.log(' [antiCrash] :: Uncaught Exception/Catch');
          console.log(err, origin);
        });
        process.on('uncaughtExceptionMonitor', (err, origin) => {
          console.log(' [antiCrash] :: Uncaught Exception/Catch (MONITOR)');
          console.log(err, origin);
        });
      }

      loadCommands() {
        for (const dir of readdirSync('./commands/')) {
          for (let file of readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'))) {

            delete require.cache[file];
            let pull = new (require(`../commands/${dir}/${file}`))(this);

            if (!(pull instanceof Command)) return;

            this.commands.set(pull.name, pull);

            if (pull.aliases && Array.isArray(pull.aliases)) for (const alias of pull.aliases) {
              this.aliases.set(alias, pull.name);
            }
          }
        }
      }

      loadEvents() {
        for (const dir of readdirSync('./events/')) {
          for (let file of readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'))) {

            delete require.cache[file];
            let pull = new (require(`../events/${dir}/${file}`))(this);

            if (!(pull instanceof Event)) return;

            super[pull.once](pull.name, (...args) => pull.run(...args));
          }
        }
      }

      login() {
        super.login(process.env['BOT_TOKEN']).catch(err => {
          console.log(`[ERROR]`.red, "Invalid Token Provided!".green)
        });
      }

      async start() {
        this.loadAntiCrash();
        this.loadCommands();
        this.loadEvents();
        this.login();
      }
    }

    module.exports = Bot;