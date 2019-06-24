const Server = require('./Server');

const DebugPlugin = require('./plugins/DebugPlugin');
const LoginPlugin = require('./plugins/LoginPlugin');
const DisconnectPlugin = require('./plugins/DisconnectPlugin');
const ChatPlugin = require('./plugins/ChatPlugin');
const AnimationPlugin = require('./plugins/AnimationPlugin');

const server = new Server({
  'online-mode': true,
  encryption: true,
  host: '0.0.0.0',
  port: 25565,
  maxPlayers: 20,
  version: '1.14.1',
  plugins: [
    DebugPlugin,
    LoginPlugin,
    ChatPlugin,
    DisconnectPlugin,
    AnimationPlugin
  ]
});

console.log('Server is ready');
