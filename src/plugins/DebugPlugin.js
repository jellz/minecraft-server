const Plugin = require('../Plugin');

class DebugPlugin extends Plugin {
  constructor(server) {
    super(server);

    this.server.on('playerLogin', event => {
      event.player.client.on('packet', console.log);
    });
  }
}

module.exports = DebugPlugin;
