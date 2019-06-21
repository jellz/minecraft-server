const mc = require('minecraft-protocol');
const NodeRSA = require('node-rsa');

class Server {
  constructor(options = {}) {
    this.options = options;
    this.server = mc.createServer(options);
    this.players = [];
    this.plugins = options.plugins.map(plugin => {
      return new plugin(this);
    });
  }
}

module.exports = Server;
