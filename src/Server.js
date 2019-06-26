const mc = require('minecraft-protocol');
const Player = require('./Player');
const { parseColoredMessage } = require('./chat/ChatUtil');
const EventEmitter = require('events');

class Server extends EventEmitter {
  /*
    Events:
    * playerLogin - when a player logs in
    * ready - when the server is ready
    * playerSettings - when a player's client settings (e.g. view distance) change
    * chat - when a player attempts to send a chat message
    * connection - when a connection is made to the server
  */
  constructor(options = {}) {
    super();

    this.options = options;
    this.server = mc.createServer(options);
    this.server.maxPlayers = options.maxPlayers; // maxPlayers does nothing when passed to createServer() - see this issue: https://github.com/PrismarineJS/node-minecraft-protocol/issues/632
    this.players = new Set(); // LoginPlugin manages this

    this.plugins = this.options.plugins.map(plugin => {
      return new plugin(this);
    });

    this.handleLogin = this.handleLogin.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
    this.server.on('connection', this.handleConnection);
    this.server.on('login', this.handleLogin);

    this.emit('ready');
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

  handleConnection(client) {
    console.log('handle connection');
    this.emit('connection', { client });
    console.log(client.state, client.version);
    // if (client.state === 'handshaking' && client.version === '1.14.1') {}
  }

  broadcastMessage(message) {
    Object.values(this.server.clients).forEach(_client => {
      _client.write('chat', {
        position: 1,
        message: JSON.stringify(parseColoredMessage(message))
      });
    });
  }

  getPlayerByUuid(uuid) {
    for (const p of this.players) {
      if (p.uuid === uuid) return p;
    }
    return null;
  }
}

module.exports = Server;
