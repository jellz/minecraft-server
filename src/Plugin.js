const Server = require('./Server');

class Plugin {
  constructor(server) {
    this.server = server;
  }
}

module.exports = Plugin;