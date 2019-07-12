const USBDetection = callback => {
  const usb = require('usb');
  const usbDetect = require('usb-detection');

  return {
    usb,
    usbDetect,
    startMonitoringDevices: () => {
      // Detect add/insert
      usbDetect.on('add', function(device) {
        callback('add', device);
      });
      usbDetect.on('add:vid', function(device) {
        callback('add', device);
      });
      usbDetect.on('add:vid:pid', function(device) {
        callback('add', device);
      });
      usbDetect.on('remove', function(device) {
        callback('remove', device);
      });
      usbDetect.on('remove:vid', function(device) {
        callback('remove', device);
      });
      usbDetect.on('remove:vid:pid', function(device) {
        callback('remove', device);
      });
      usbDetect.startMonitoring();
    }
  };
};

module.exports = USBDetection;
