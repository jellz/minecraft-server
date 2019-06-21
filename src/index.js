const mc = require('minecraft-protocol');
const Server = require('./Server');

const server = new Server({
  'online-mode': true,
  encryption: true,
  host: '0.0.0.0',
  port: 25565,
  maxPlayers: 10
});

server.listen(port, host);
// server.on('login', client => {
//   server.clients.forEach(client => {});
//   client.write('login', {
//     entityId: client.id,
//     levelType: 'default',
//     gameMode: 1,
//     dimension: 0,
//     difficulty: 2,
//     maxPlayers: server.maxPlayers,
//     reducedDebugInfo: false
//   });
//   client.write('position', {
//     x: 0,
//     y: 1.62,
//     z: 0,
//     yaw: 0,
//     pitch: 0,
//     flags: 0x00
//   });
//   const msg = {
//     translate: 'chat.type.text',
//     with: [
//       {
//         text: 'memes',
//         clickEvent: { action: 'suggest_command', value: '/msg memes ' },
//         bold: true
//       },
//       { text: "I don't exist", italic: true, color: 'red' }
//     ]
//   };
//   client.write('chat', { message: JSON.stringify(msg), position: 0 });
// });

