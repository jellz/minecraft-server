const { Plugin } = require('../Plugin');

class LoginPlugin extends Plugin {
  constructor(server) {
    super(server);

    this.server.on('login', (client) => this.onLogin(client));
  }

  onLogin(client) {
    console.log('someone logged in');
    client.write('login', {
      entityId: client.id,
      levelType: 'default',
      gameMode: 1,
      dimension: 0,
      difficulty: 2,
      maxPlayers: this.server.maxPlayers,
      reducedDebugInfo: false
    });
    client.write('position', {
      x: 0,
      y: 1.62,
      z: 0,
      yaw: 0,
      pitch: 0,
      flags: 0x00
    });
  }
}

module.exports = LoginPlugin;
