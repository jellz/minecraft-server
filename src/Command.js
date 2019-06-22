const Player = require("./Player");
const Server = require('./Server');

class Command {
  /**
   * @param {String} chatName 
   * @param {Server} server 
   */

   // TODO: Implement proper parsing, validation blah blah blah (and implement Autocomplete in CommandPlugin properly)
  constructor(server, chatName) {
    this.server = server;
    this.chatName
  }
  /**
   * @param {Player} player 
   * @param {String[]} args 
   */
  execute(player, args) {
    throw new Error("Function execute isn't implemented");
  }
}

module.exports = Command;
