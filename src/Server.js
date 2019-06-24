const mc = require('minecraft-protocol');
const Player = require('./Player');
const EventEmitter = require('events');

class Server extends EventEmitter {
  /*
    Events:
    * playerLogin - when a new player has been added to this.players
    * ready - when the server is ready
  */
  constructor(options = {}) {
    super();

    this.options = options;
    this.server = mc.createServer(options);
    this.players = new Set(); // LoginPlugin manages this

    this.plugins = this.options.plugins.map(plugin => {
      return new plugin(this);
    });

    this.handleLogin = this.handleLogin.bind(this);
    this.server.on('login', this.handleLogin);

    this.emit('ready');
  }

  broadcastMessage(message, color) {
    Object.values(this.server.clients).forEach(_client => {
      _client.write('chat', {
        position: 0,
        message: JSON.stringify({
          text: message,
          color: color.toString()
        })
      });
    });
  }

  handleLogin(client) {
    console.log('handle login');
    const player = new Player(client, this);
    this.emit('playerLogin', { player });

    client.on('packet', (data, meta) => {
      if (meta.name === 'chat')
        return this.emit('chat', { player, message: data.message });
      if (meta.name === 'arm_animation')
        return this.emit('arm', { player, hand: data.hand });
      if (meta.name === 'settings')
        return this.emit('playerSettings', { player, settings: data });
    });

    client.socket.on('close', () => this.emit('playerLeave', { player }));
  }
}

module.exports = Server;
