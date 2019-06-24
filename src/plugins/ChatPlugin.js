const Plugin = require('../Plugin');

class ChatPlugin extends Plugin {
  constructor(server) {
    super(server);
    this.server.on('chat', (event) => {
      const player = event.player;
      Object.values(this.server.server.clients).forEach(_client => {
        _client.write('chat', {
          message: JSON.stringify({
            translate: 'chat.type.text',
            with: [
              {
                text: player.username,
                clickEvent: {
                  action: 'suggest_command',
                  value: `/msg ${player.username} `
                },
                hoverEvent: {
                  action: 'show_entity',
                  value: `{id:${player.uuid},name:${player.username}}`
                },
                insertion: player.username
              },
              { text: event.message }
            ]
          }),
          position: 0
        });
      });
    });
  }
}

module.exports = ChatPlugin;
