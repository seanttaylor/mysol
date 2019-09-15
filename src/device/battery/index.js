function battery(bottle) {
    const dependencies = ["events", "psu"];
    
    bottle.service("battery", function(eventEmitter, psu) {
        const { from, interval, zip } = require("rxjs");
        const data = [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ];
        eventEmitter.on("device-started", onDeviceStarted);
        eventEmitter.on("device-charging", onDeviceCharging);
        eventEmitter.on("device-discharging", onDeviceDischarging);
        chargeEvent$ = zip(
            from(data),
            interval(5000),
            (batteryLevel, b) => {
                eventEmitter.emit("device-battery-level-event", batteryLevel) 
                return batteryLevel;
            }
        );

        const batteryObserver = {
            complete() {
                console.log("complete");
            }
        };

        /**
         * Queries the power supply module; fires the corresponding event for the current battery * status (i.e. charging or discharging) 
         * @returns {Promise} status - Promise containing the battery status.
        */

        function getStatus() {
            /* Battery MUST be queried BEFORE returning status value.
            * The PRESENCE of ABSENCE of a POWER SUPPPLY along with current charge level influences whether the battery is in a charge or discharge state
            */
            const batteryStatus = Math.round(Math.random()) > 0 && psu.hasPower() ? "charging" : "discharging";
            eventEmitter.emit(`device-${batteryStatus}`);
            return Promise.resolve(batteryStatus);
        }

        /**
         * Subscribes the to chargeEvent$ observable when the device-discharging event is 
         * fired.
        */

        function onDeviceDischarging() {
            console.log("battery discharging...");
            chargeEvent$.subscribe(batteryObserver);
        }

        function onDeviceCharging() {
            console.log("battery charging...");
        }

        function onDeviceStarted() {
            
        }

        return {
            getStatus
        }

    }, ...dependencies);
}

module.exports = battery;