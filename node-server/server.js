var USBDetection = require('./detection/USBDetection.js');
USBDetection(updateClients).startMonitoringDevices();

// Factory of connection types
// Get a server (WEBSOCKETS) up & running
var ConnectionFactory = require('./comm/ConnectionFactory.js');
const port = 8000;
var types = require('./types.js');

var connection = new ConnectionFactory(types.WEBSOCKETS, port);

connection.createConnection();

console.log('Waiting for clients on port ' + connection.connectionPort);

let sequenceNumberByClient = new Map();

// event fired every time a new client connects:
connection.server.on('connection', socket => {
  console.info(`Client connected [id=${socket.id}]`);
  // initialize this client's sequence number
  sequenceNumberByClient.set(socket, 1);

  // when socket disconnects, remove it from the list:
  socket.on('disconnect', () => {
    sequenceNumberByClient.delete(socket);
    console.info(`Client gone [id=${socket.id}]`);
  });
});

// sends each client a live tree view from the Server

function updateClients(action, device) {
  const actionDevice = action + ' : ' + device;
  console.log(actionDevice);
  for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {

    var deviceDetails = new Object();
    deviceDetails.actionType = action;
    deviceDetails.vendorId = device.vendorId;
    deviceDetails.productId = device.productId;
    deviceDetails.deviceName = device.deviceName;
    deviceDetails.manufacturer = device.manufacturer;
    client.emit('actiondetails', JSON.stringify(deviceDetails));
  }
}
