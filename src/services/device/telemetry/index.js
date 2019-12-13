/**
 * serviceName#telemetryService
 * serviceDescription: Merges all incoming data streams from the device sensors.
 * Emits event with all telemetry data in the payload.
 */

function telemetryService(bottle) {
    const dependencies = ["events", "sensors", "logger-service", "weather"];
    bottle.service("telemetry", function(eventEmitter, sensors, logger, weather) {
        const { interval, zip, range, combineLatest } = require("rxjs");
        const { accelerometer$, photometer$, panel$ } = sensors;
        const { weather$ } = weather;
        const telemetryData$ = combineLatest([
            accelerometer$,
            photometer$,
            panel$,
            weather$
        ]);

        telemetryData$.subscribe(onTelemetryEvent);

        /**
         * Receives aggregated real-time data from the sensor array.
         * @param { Array } data - Data reported from the sensor array.
         * @returns void
         */

        function onTelemetryEvent([accelerometer, photometer, panel, weather]) {
            eventEmitter.emit("device-telemetry-event", {
                accelerometer,
                photometer,
                panel,
                weather
            });
        }
    }, ...dependencies);
}

module.exports = telemetryService;
