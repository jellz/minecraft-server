const util = require('util');
const Plugin = require('../Plugin');
class DebugPlugin extends Plugin {
  constructor(server) {
    super(server);
    this.server.server.on('login', client => {
      client.on('packet', console.log);
      client.on('packet', (data, meta) => {
        if (meta.name !== 'chat') return;
        if (data.message == '/debug') {
          client.write('chat', {
            message: JSON.stringify({
              text: `Client, depth=0: ${util.inspect(client, false, 0)}}`
            }),
            position: 0
          });
        }
      });
    });
  }
}

module.exports = DebugPlugin;
