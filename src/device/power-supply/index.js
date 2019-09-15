function powerSupplyUnit(bottle) {
    bottle.service("powerSupply", function() {
        
        return {
            hasPower
        }

        function hasPower() {
            return Promise.resolve(Math.round(Math.random()) > 0 ? true : false);
        }
    });
}

module.exports = powerSupplyUnit;