const { Plugin }  = require('../Plugin');

class LoginPlugin extends Plugin {
  constructor(server) {
    super(server);

    this.server.on('login', this.onLogin);
  }

  onLogin(client) {
    console.log('someone logged in');
  }
}

module.exports = LoginPlugin;