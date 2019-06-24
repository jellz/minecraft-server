class Util {
  static getPlayerByUuid(uuid, players) {
    for (const p of players) {
      if (p.uuid === uuid) return p;
    }
    return null;
  }
}

module.exports = Util;
