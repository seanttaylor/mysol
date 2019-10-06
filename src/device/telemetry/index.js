function telemetryService(bottle) {
    /*Sensors module will be included as a dependency.*/
    const dependencies = ["events"];
    bottle.service("telemetry", function(eventEmitter) {
        const { interval, zip, range } = require("rxjs");
        /*Sensor data will originate from sensors module. This will turn become an observer that consumes data emitted from a sensor observable.*/
        const telemetryEvent$ = zip(
            range(1, 100),
            interval(10000),
            onTelemetryEvent
        );

        telemetryEvent$.subscribe();

         /**
         * Receives aggregated real-time data from the sensor array.
         * @param {Number} data - Data reported from the sensor array.
         * @returns void
        */

        function onTelemetryEvent(data) {
            eventEmitter.emit("device-telemetry-event", {
                accelerometer: {
                    orientation: data
                },
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
