function control(bottle) {
    const dependencies = ["events", "database", "battery"];
    bottle.service("control", function(eventEmitter, db, battery) {
        eventEmitter.on("device-started", onDeviceStarted);
        eventEmitter.on("device-battery-level-event", onDeviceBatteryLevelEvent);

        function onDeviceStarted() {
            battery.getStatus().then(onBatteryStatus);
        }

        function onDeviceBatteryLevelEvent(batteryLevel) {
            db.update("myDevice", {
                batteryLevel,
                lastStatusUpdate: new Date().toISOString()
            })
        }

        function onBatteryStatus(batteryStatus) {
            db.update("myDevice", {
                batteryStatus: batteryStatus,
                deviceStatus: "ok",
                lastStatusUpdate: new Date().toISOString()
            });
        }

    }, ...dependencies);
}

module.exports = control;