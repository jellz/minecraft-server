const Server = require('./Server');

class Plugin {
  /**
   * 
   * @param {Server} server 
   */
  constructor(server, commands = []) {
    /**
     * @type {Server}
     */
    this.server = server;
    this.commands = commands;
  }
}
module.exports = Plugin;