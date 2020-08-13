module.exports = function (RED) {
  const i2c = require("i2c-bus");
  const oled = require("oled-i2c-bus");
  const font = require("oled-font-5x7");

  function WriteStringNode(config) {
    RED.nodes.createNode(this, config);

    var node = this;

    node.on("input", function (msg) {
      var i2cBus = i2c.openSync(1);
      var opts = {
        width: 128,
        height: 32,
        address: 0x3c,
      };

      var display = new oled(i2cBus, opts);

      display.clearDisplay();

      display.setCursor(1, 1);
      display.writeString(font, 2, msg.payload, 1, true);
    });
  }
  RED.nodes.registerType("write-string", WriteStringNode);
};
