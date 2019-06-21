const Plugin = require('../Plugin');
const Player = require("../Player");
const Server = require('../Server');

class LoginPlugin extends Plugin {
/**
 * 
 * @param {Server} server 
 */
  constructor(server) {
    super(server);
    this.server.server.on('login', client => {
      // console.log('someone logged in');
      const player = new Player(client);
      this.server.players.push(player);

      client.write('login', {
        entityId: client.id,
        levelType: 'default',
        gameMode: 1,
        dimension: 0,
        difficulty: 2,
        maxPlayers: this.server.options.maxPlayers,
        reducedDebugInfo: false
      });
      console.log(Object.keys(this.server.server.clients));
      
      Array.from(this.server.server.clients).forEach(client => {
        client.write('player_info', {
          action: 0,
          data: [
            {
              UUID: client.uuid,
              name: client.profile.name,
              properties: client.profile.properties,
              gamemode: 1,
              ping: 50
            }
          ]
        });
      });

      client.write('position', {
        x: 0,
        y: 60,
        z: 0,
        yaw: 0,
        pitch: 0,
        flags: 0x00
      });
    });
  }
}

module.exports = LoginPlugin;
