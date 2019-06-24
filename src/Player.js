class Player {
  constructor(client, server) {
    this.client = client;
    this.server = server;
    this.position = { x: 0, y: 60, z: 0, yaw: 0, pitch: 0 };
    this.username = client.profile.name;
    this.uuid = client.uuid;
    this.latency = client.latency;
    this._properties = client.profile.properties;
    this.settings = null;
  }

  updateSettings(newSettings) {
    this.settings = newSettings;
  }

}

module.exports = Player;
