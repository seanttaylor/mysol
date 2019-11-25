function telemetryService(bottle) {
    const dependencies = ["events", "sensors", "application-logger"];
    bottle.service("telemetry", function(eventEmitter, sensors, logger) {
        const { interval, zip, range, combineLatest } = require("rxjs");
        const telemetryEvent$ = zip(
            range(1, 100),
            interval(10000),
            (telemetryData) => telemetryData
        );
        const telemetryData$ = combineLatest([telemetryEvent$, sensors.accelerometer$]);

        telemetryData$.subscribe(onTelemetryEvent);

        /**
         * Receives aggregated real-time data from the sensor array.
         * @param { Number } data - Data reported from the sensor array.
         * @returns void
         */

        function onTelemetryEvent([data, accelerometer]) {
            eventEmitter.emit("device-telemetry-event", {
                accelerometer,
                photometer: {
                    strength: data
                },
                panel: {
                    coverage: data
                }
            });

            return data;
        }
    }, ...dependencies);
}

module.exports = telemetryService;
