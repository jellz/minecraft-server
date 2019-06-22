class Player {
  constructor(client) {
    this.client = client;
    this.pos = { x: 0, y: 60, z: 0, yaw: 0, pitch: 0 };
  }
  onCertainPacket(packet, cb) {
    this.client.on("packet", (data, meta) => {
      if (meta.name == packet) cb(data, meta);
    });
  }
}

module.exports = Player;
