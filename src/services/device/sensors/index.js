/**
 * serviceName#sensorService
 * serviceDesc: Exposes API for accessing Observables returned from
 * all device sensors.
 */

function sensorService(bottle) {
    const dependencies = ["events", "logger-service"];
    const accelerometer$ = require("./accelerometer")();
    const photometer$ = require("./photometer")();
    const panel$ = require("./panel")();


    bottle.service("sensors", function(eventEmitter, logger) {
        return {
            accelerometer$,
            photometer$,
            panel$
        }

    }, ...dependencies);
}

module.exports = sensorService;
