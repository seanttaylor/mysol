/**
 * serviceName#initService
 * serviceDesc: Handles initialization tasks when device starts.
 */

function initService(bottle) {
    const dependencies = ["events"];

    bottle.service("init", function(eventEmitter) {
        eventEmitter.emit("device-started");

    }, ...dependencies);
}

module.exports = initService;
