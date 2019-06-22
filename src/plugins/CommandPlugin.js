const Plugin = require('../Plugin');
const Player = require('../Player');

class CommandPlugin extends Plugin {
  constructor(server) {
    super(server);
    // By now, all of the commands are in the array.
    this.server.on('started', () => {
      this.server.commands = this.server.plugins.map(plugin =>
        plugin.commands.map(cmd => {
          const instance = new cmd(server);
          instance.owner = plugin;
          return instance;
        })
      ).reduce((a,b) => [...a, ...b]);
      console.log('COmmands', this.server.commands);
    });
    this.server.on('player', player => {
      const { client } = player;
      // for some reason the client seems to not care about this
      // client.write('declare_commands', {
      //   nodes: [
      //     {
      //       flags: {command_node_type: 0}, // root
      //       children: [{ flags: {command_node_type: 1/*literal*/}, name: 'helpppp' }]
      //     }
      //   ]
      // });
    });
  }
}

module.exports = CommandPlugin;
