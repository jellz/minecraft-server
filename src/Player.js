class Player {
  constructor(client) {
    this.client = client;
    this.pos = { x: 0, y: 60, z: 0, yaw: 0, pitch: 0 };
  }
}

module.exports = Player;
