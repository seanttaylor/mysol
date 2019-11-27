/**
 * serviceName#analyticsService
 * serviceDesc: Processes incoming data from the sensor array.
 */

function analyticsService(bottle) {
    const dependencies = ["logger-service"];

    bottle.service("analytics", function(logger) {
        const weatherAnalytics = require("./weather")();

        /**
         * Ingests sensor data.
         * @param {Object} sensorData - Data collected from sensor array.
         * @returns void
         */

        function onProcessData(sensorData) {
            weatherAnalytics.get(sensorData.weather);
        }


        return {
            onProcessData
        }
    }, ...dependencies);
}

module.exports = analyticsService;
