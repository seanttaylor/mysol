/**
 * serviceName#sensorService
 * serviceDesc: Exposes API for pushing Server-Sent Events to connected
 * clients.
 * Creates Express route for pushing Server-Sent Events.
 */

function sensorService(bottle) {
    const dependencies = ["events", "logger-service"];
    const accelerometer$ = require("./accelerometer")();

    bottle.service("sensors", function(eventEmitter, logger) {
        return {
            accelerometer$
        }

    }, ...dependencies);
}

module.exports = sensorService;
