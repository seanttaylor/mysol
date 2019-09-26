function battery(bottle) {
    const dependencies = ["events", "powerSupply"];

    bottle.service("battery", function(eventEmitter, psu) {
        const { from, interval, zip } = require("rxjs");
        const data = [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ];
        chargeEvent$ = zip(
            from(data),
            interval(5000),
            onChargeEvent
        );

        chargeEvent$.subscribe();

        /**
         * Queries the power supply module; indicates whether battery is charging or 
         * discharging.
         * @returns {Promise} status - Promise containing the battery status.
        */

        function getStatus() {
            /* Battery MUST be queried BEFORE returning status value.
            * The PRESENCE of ABSENCE of a POWER SUPPPLY along with current charge level
            * influences whether the battery is in a charge or discharge state.
            */
            return psu.checkHasPower().then((deviceHasPower)=> {
                const batteryCharging = /*Math.round(Math.random()) > 0 && deviceHasPower ? "charging" :*/ false;
                return batteryCharging;
            });
        }

         /**
         * Queries the power supply module; emits a battery event.
         * @param {Number} batteryLevel - The current charge level reported from the battery.
         * @returns {Number} batteryLevel - Promise containing the battery status.
        */

        function onChargeEvent(batteryLevel) {
            getStatus().then((batteryCharging)=> {
                eventEmitter.emit("device-battery-event", {
                    batteryLevel,
                    batteryCharging
                }); 
            });
            return batteryLevel;
        }

        return {
            getStatus
        }

    }, ...dependencies);
}

module.exports = battery;