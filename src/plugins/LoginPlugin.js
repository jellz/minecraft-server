const Plugin = require('../Plugin');
const Player = require('../Player');

class LoginPlugin extends Plugin {
  constructor(server) {
    super(server);
    this.server.on('playerLogin', event => {
      console.log('playerLogin received');
      console.log(event);
      this.server.players.add(event.player);

      const client = event.player.client;

      client.write('login', {
        entityId: client.id,
        levelType: 'default',
        gameMode: 1,
        dimension: 0,
        difficulty: 2,
        maxPlayers: this.server.options.maxPlayers,
        reducedDebugInfo: false
      });

      this.server.on('playerSettings', event => event.player.updateSettings(event.settings));

      // TODO: optimise player info implementation
      this.server.players.forEach(_player => {
        console.log(_player.uuid);
        this.server.players.forEach(_otherplayer => {
          _otherplayer.client.write('player_info', {
            action: 0,
            data: [
              {
                UUID: _player.uuid,
                name: _player.username,
                properties: _player._properties,
                gamemode: 1,
                ping: _player.latency
              }
            ]
          });
          
          // _otherplayer.client.write('named_entity_spawn', {
          //   entityId: _player.uuid,
          //   playerUUID: _player.uuid,
          //   x: _player.position.x,
          //   y: _player.position.y,
          //   z: _player.position.z,
          //   yaw: _player.position.yaw,
          //   pitch: _player.position.pitch,
          //   entityMetadata: []
          // });
        });
      });

      client.write('position', Object.assign(event.player.position, { flags: 0x00 }));

      // this.server.emit('newPlayer', player);
      this.server.broadcastMessage(`${event.player.username} joined`, 'yellow');
    });
  }
}

module.exports = LoginPlugin;