function gpioInterface(bottle) {
    
    bottle.service("gpio", function() {
        const GPIO = require("onoff").Gpio;
        return GPIO;
    });
}
  
module.exports = gpioInterface;
  