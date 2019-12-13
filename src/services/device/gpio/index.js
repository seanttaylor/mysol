/**
 * serviceName#gpioService
 * serviceDescription: Exposes API for connecting to device GPIO board.
 */

function gpioService(bottle) {

    bottle.service("gpio", function() {
        const GPIO = require("onoff").Gpio;
        return GPIO;
    });
}

module.exports = gpioService;
