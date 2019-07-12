const
    io = require("socket.io-client"),
    address = "http://localhost:8000" ,
    ioClient = io.connect(address);

console.log(`Connected to address ${address}`);

ioClient.on("actiontype", (msg) => {
    console.log('\nAction Type : ' + msg);
});

ioClient.on("actiondetails", (msg) => {
    var parsed = JSON.parse(msg);
    console.log('')
    console.log('vendorId : ' + parsed.vendorId);
    console.log('productId : ' + parsed.productId);
    console.log('deviceName : ' + parsed.deviceName);
    console.log('manufacturer : ' + parsed.manufacturer);
});