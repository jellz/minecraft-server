const Plugin = require('../Plugin');

class DisconnectPlugin extends Plugin {
  constructor(server) {
    super(server);

    this.server.on('playerLeave', player => {
      console.log('player left', player.uuid);
      this.server.players.forEach(_player => {
        _player.client.write('player_info', {
          action: 4,
          data: [{ UUID: player.uuid }]
        });
      });
      this.server.broadcastMessage(`${player.username} left`, 'yellow');
    });
  }
}

module.exports = DisconnectPlugin;
