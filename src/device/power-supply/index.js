function powerSupplyUnit(bottle) {
    bottle.service("powerSupply", function() {

        /**
         * Validates the power supply unit is receiving power (i.e. is the device plugged in)
         * @returns {boolean} hasPower - TRUE if device is plugged in FALSE otherwise.
         */

        function hasPower() {
            return Promise.resolve(Math.round(Math.random()) > 0 ? true : false);
        }

        return {
            hasPower
        }
    });
}

module.exports = powerSupplyUnit;