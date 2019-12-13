/**
 * serviceName#controlService
 * serviceDescription: Main control for device; only module with access to all
 * device services.
 */

function controlService(bottle) {
    const dependencies = ["events", "database", "battery", "analytics"];
    bottle.service("control", function(eventEmitter, db, battery, analytics) {
        eventEmitter.on("device-started", onDeviceStarted);
        eventEmitter.on("device-battery-event", onDeviceBatteryEvent);
        eventEmitter.on("device-telemetry-event", onDeviceTelemetryEvent);

        /**
         * Fetches the current status of the battery from the battery
         * module on the device-started event.
         * @retuns void
         */

        function onDeviceStarted() {
            battery.getStatus().then(onBatteryStatus);
        }

        /**
         * Updates the device information persisted in the datastore with
         * the current data reported from the battery module.
         * @param {Object} data - Current data about the battery.
         * @returns void
         */

        function onDeviceBatteryEvent({ batteryLevel, batteryCharging }) {
            if (batteryLevel < 4) {
                console.warn(`LOW BATTERY: ${batteryLevel}`);
            }

            db.updateOne("myDevice", {
                batteryLevel,
                batteryCharging,
                lastStatusUpdate: new Date().toISOString()
            });
        }

        /**
         * Updates the device information persisted in the datastore with
         * the current status of the battery.
         * @returns void
         */

        function onBatteryStatus(batteryCharging) {
            db.updateOne("myDevice", {
                batteryCharging,
                deviceStatus: "ok",
                lastStatusUpdate: new Date().toISOString()
            });
        }

        /**
         * Forwards telemetryData to anayltics module(s).
         * @param {Object} telemetryData - Current telemetry data.
         */

        function onDeviceTelemetryEvent(telemetryData) {
            eventEmitter.emit("device-analytics-event",
                analytics.onProcessData(telemetryData));
        }

    }, ...dependencies);
}

module.exports = controlService;
