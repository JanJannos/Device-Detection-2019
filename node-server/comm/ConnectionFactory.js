// Import connection types
var types = require("../types.js");

module.exports = class ConnectionFactory {
  constructor(connectionType, connectionPort) {
    this.connectionType = connectionType;
    this.server = null;
    this.connectionPort = connectionPort;
  }

  /**
   *  Creates a server based on a connection type & port
   */
  createConnection() {
    switch (this.connectionType) {
      // case types.WEBSOCKETS:
      case types.WEBSOCKETS:
        const io = require("socket.io");
        this.server = io.listen(this.connectionPort);
        break;
      case types.TCP:
        // TODO ...
        break;
      case types.UDP:
        // TODO ...
        break;
      case types.HTTP:
        // TODO ...
        break;
    }
  }
};
