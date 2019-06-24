const Plugin = require('../Plugin');

class AnimationPlugin extends Plugin {
  constructor(server) {
    super(server);

    this.server.on('arm', (player, hand) => {
      const { client } = player;
      // client.write('animation', {
        // entityId: 92,
        // animation: 0
      // });
    });
  }
}

module.exports = AnimationPlugin;
