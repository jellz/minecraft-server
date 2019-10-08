const checkEula = require('./eula');

const Server = require('./Server');
const ConfigManager = require('./config/ConfigManager');

const DebugPlugin = require('./plugins/DebugPlugin');
const LoginPlugin = require('./plugins/LoginPlugin');
const DisconnectPlugin = require('./plugins/DisconnectPlugin');
const ChatPlugin = require('./plugins/ChatPlugin');
const AnimationPlugin = require('./plugins/AnimationPlugin');

checkEula();
(async () => {
  const config = await ConfigManager.getConfig();
  console.log(config);
  const server = new Server({
    'online-mode': config['online-mode'],
    encryption: true,
    host: config['server-ip'],
    port: config['server-port'],
    maxPlayers: config['max-players'],
    kickTimeout: config['kick-timeout'],
    motd: config['motd'],
    version: '1.14.1',
    plugins: [
      DebugPlugin,
      LoginPlugin,
      ChatPlugin,
      DisconnectPlugin,
      AnimationPlugin
    ],
    gameMode: config['gamemode'],
    difficulty: config['difficulty']
  });
})();

console.log('Server is ready');
