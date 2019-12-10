/**
 * serviceName#HALService
 * serviceDesc: Exposes API for formattted HTTP responses as
 * HAL (http://stateless.co/hal_specification.html).
 */

function HALService(bottle) {
    const resources = {
        device: require("./device.js"),
        events: require("./events.js")
    }
    bottle.service("hal", function() {
        /**
         * Returns HAL formatted data with associated links based on the _entity property of the
         * input data.
         * @param {object} data - data to transform to HAL format.
         * @returns {object} hal - Promise containing the battery status.
         */

        function of (data) {
            if (!data._entity) {
                return data;
            }
            return resources[data._entity](data);
        }

        return { of
        };
    });
}

module.exports = HALService;
