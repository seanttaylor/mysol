function control(bottle) {
    const dependencies = ["events", "database"];
    bottle.service("control", function(eventEmitter, db) {
        eventEmitter.on("device-started", onDeviceStarted);

        function onDeviceStarted() {
            db.update("myDevice", {
                status: "CHARGING",
                lastStatusUpdate: new Date().toISOString()
            });
        }

    }, ...dependencies);
}

module.exports = control;