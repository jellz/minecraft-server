const Plugin = require('../Plugin');
const { getPlayerByUuid } = require('../Util');

class DisconnectPlugin extends Plugin {
  constructor(server) {
    super(server);

    this.server.on('playerLeave', event => {
      const player = event.player;
      console.log('player left', player.uuid);
      this.server.players.delete(getPlayerByUuid(player.uuid, this.server.players));
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
