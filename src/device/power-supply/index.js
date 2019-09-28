function powerSupplyUnit(bottle) {
    bottle.service("powerSupply", function() {
        /**
         * Validates the power supply unit is receiving power (i.e. is the device plugged in)
         * @returns {Boolean} hasPower - TRUE if device is plugged in, FALSE otherwise.
         */

        function checkHasPower() {
            return Promise.resolve(Math.round(Math.random()) > 0 ? true : false);
        }

        return {
            checkHasPower
        }
    });
}

module.exports = powerSupplyUnit;