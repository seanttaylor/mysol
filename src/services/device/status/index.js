/**
 * serviceName#statusService
 * serviceDesc: Exposes API for fetching device status, formatting HTTP
 * responses as HAL (http://stateless.co/hal_specification.html).
 * Creates Express route at /status.
 */

function statusService(bottle) {
    const myController = require("./controller.js");
    const dependencies = ["router", "database", "hal"];

    bottle.service("status", function(router, db, hal) {
        const api = {
            getDeviceStatus
        };

        /**
         * Queries data store for device status information.
         * @returns {Promise} promise - object describing device status.
         */

        function getDeviceStatus() {
            return db.findOne("myDevice");
        }

        return {
            controller: myController({
                api,
                router: router.Router(),
                hal
            })
        }

    }, ...dependencies);
}

module.exports = statusService;
