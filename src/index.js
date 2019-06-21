const mc = require('minecraft-protocol');
const server = mc.createServer({
  'online-mode': true,   // optional
  encryption: true,      // optional
  host: '0.0.0.0',       // optional
  port: 25565,           // optional
  maxPlayers: 10
});

server.on('login', function(client) {
  client.write('login', {
    entityId: client.id,
    levelType: 'default',
    gameMode: 1,
    dimension: 0,
    difficulty: 2,
    maxPlayers: server.maxPlayers,
    reducedDebugInfo: false
  });
  client.write('position', {
    x: 0,
    y: 1.62,
    z: 0,
    yaw: 0,
    pitch: 0,
    flags: 0x00
  });
  var msg = {
    translate: 'chat.type.announcement',
    'with': [
      'Server',
      'Hello, world!'
    ]
  };
  client.write('chat', { message: JSON.stringify(msg), position: 0 });
});