const util = require('util');
const Plugin = require('../Plugin');
const Command = require('../Command');
class EvalCommand extends Command {
  constructor(server) {
    super(server, "eval");
  }
}
class DebugPlugin extends Plugin {
  constructor(server) {
    super(server, [EvalCommand]);
    this.server.on('player', player => {
      const client = player.client;
      client.on('packet', console.log);
      client.on('packet', (data, meta) => {
        if (meta.name !== 'chat') return;
        // if (data.message == '/debug') {
        //   client.write('chat', {
        //     message: JSON.stringify({
        //       text: `Client, depth=0: ${util.inspect(client, false, 0)}}`
        //     }),
        //     position: 0
        //   });
        // }
      });
    });
  }
}

module.exports = DebugPlugin;
