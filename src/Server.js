const mc = require('minecraft-protocol');
const NodeRSA = require('node-rsa');
const EventEmitter = require('events');

class Server extends EventEmitter {
  /*
  Events:
  player - when a new player has been added to this.players
  */
  constructor(options = {}) {
    super();
    this.options = options;
    this.server = mc.createServer(options);
    this.players = []; // LoginPlugin manages this.

    // The server manages plugins, for rather obvious reasons.
    // Might want to refactor this to have a difference between internal and external plugins.
    this.plugins = options.plugins.map(plugin => {
      return new plugin(this);
    });

    // CommandPlugin manages the client-side part of this.
    this.commands = options.commands.map(command => {
      return new command(this);
    });
  }
}

module.exports = Server;
