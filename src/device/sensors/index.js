function sensors(bottle) {
    const dependencies = ["events", "application-logger"];
    const accelerometer$ = require("./accelerometer")();

    bottle.service("sensors", function(eventEmitter, logger) {
        return {
            accelerometer$
        }

    }, ...dependencies);
}

module.exports = sensors;
