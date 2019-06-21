const Server = require('./Server');

class Plugin {
  /**
   * 
   * @param {Server} server 
   */
  constructor(server) {
    /**
     * @type {Server}
     */
    this.server = server;
  }
}
module.exports = Plugin;