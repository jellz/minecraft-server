const mc = require('minecraft-protocol');
const NodeRSA = require('node-rsa');

class Server extends mc.Server {
  constructor(options = {}) {
    const {
      host = '0.0.0.0',
      'server-port': serverPort,
      port = serverPort || 25565,
      motd = 'A Minecraft server',
      'max-players': maxPlayers = 20,
      version,
      favicon,
      customPackets
    } = options;

    const optVersion =
      version === undefined || version === false
        ? require('minecraft-protocol/src/version').defaultVersion
        : version;

    const mcData = require('minecraft-data')(optVersion);
    const mcversion = mcData.version;
    const hideErrors = options.hideErrors || false;

    super(mcversion.minecraftVersion, customPackets, hideErrors);
    this.mcversion = mcversion;
    this.motd = motd;
    this.maxPlayers = maxPlayers;
    this.playerCount = 0;
    this.onlineModeExceptions = {};
    this.favicon = favicon;
    this.serverKey = new NodeRSA({ b: 1024 });
    if (typeof options.plugins !== 'array') return;
    this.plugins = options.plugins.map(plugin => new Plugin(this));

    server.listen(options.port, options.host);
  }
}

module.exports = Server;
