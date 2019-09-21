function control(bottle) {
    const dependencies = ["events", "database", "battery"];
    bottle.service("control", function(eventEmitter, db, battery) {
        eventEmitter.on("device-started", onDeviceStarted);
        eventEmitter.on("device-battery-level-event", onDeviceBatteryLevelEvent);
        
        /**
         * Fetches the current status of the battery from the battery module on the 
         * device-started event.
        */

        function onDeviceStarted() {
            battery.getStatus().then(onBatteryStatus);
        }

        /**
         * Updates the device information persisted in the datastore with the current battery 
         * reported from the battery module. 
        */

        function onDeviceBatteryLevelEvent(batteryLevel) {
            if (batteryLevel < 4) {
                console.warn(`LOW BATTERY: ${batteryLevel}`);
                eventEmitter.emit("device-low-battery", batteryLevel);
            }

            db.update("myDevice", {
                batteryLevel,
                lastStatusUpdate: new Date().toISOString()
            });
        }

        /**
         * Updates the device information persisted in the datastore with the current status of 
         * the battery.
        */

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