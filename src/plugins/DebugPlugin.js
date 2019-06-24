const Plugin = require('../Plugin');

class DebugPlugin extends Plugin {
  constructor(server) {
    super(server);

    this.server.on('playerLogin', client => {
      client.on('packet', console.log);
    });
  }
}

module.exports = DebugPlugin;
