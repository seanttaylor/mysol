function battery(bottle) {
    const dependencies = ["events"];
    bottle.service("battery", function(eventEmitter) {
        const { of, from, interval, zip } = require("rxjs");
        const { takeWhile } = require("rxjs/operators");
        const data = [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ];
        eventEmitter.on("device-started", onDeviceStarted);
        eventEmitter.on("device-charging", onDeviceCharging);
        eventEmitter.on("device-discharging", onDeviceDischarging);
        $chargeEvent = zip(
            from(data),
            interval(5000),
            (a, b) => eventEmitter.emit("device-battery-level-event", a)
        );

        const batteryObserver = {
            complete() {
                console.log("complete");
            }
        };

        return {
            getStatus
        }

        function getStatus() {
            /* Battery MUST be queried BEFORE returning status value.
            * The PRESENCE of ABSENCE of a POWER SUPPPLY along with current charge level influences whether the battery is in a charge or discharge state
            */
            const batteryStatus = Math.round(Math.random()) > 0 ? "charging" : "discharging";
            eventEmitter.emit(`device-${batteryStatus}`);
            return Promise.resolve(batteryStatus);
        }

        function onDeviceDischarging() {
            console.log("battery discharging...");
            $chargeEvent.subscribe(batteryObserver);
        }

        function onDeviceCharging() {
            console.log("battery charging...");
        }

        function onDeviceStarted() {
            
        }

    }, ...dependencies);
}

module.exports = battery;