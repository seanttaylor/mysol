function init(bottle) {
    const dependencies = ["events"];
    bottle.service("init", function(eventEmitter) {
        eventEmitter.emit("device-started");

    }, ...dependencies);
}

module.exports = init;