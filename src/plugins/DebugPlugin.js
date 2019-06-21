const { Plugin } = require('../Plugin');

class DebugPlugin extends Plugin {
  constructor(server) {
    super(server);
    this.server.server.on("login", client => {
      client.on("packet", console.log);
    });
  }

}

module.exports = DebugPlugin;