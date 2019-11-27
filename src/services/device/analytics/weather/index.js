function weatherAnalytics() {
    const config = require("./config.json").config;

    /**
     * Returns object containing all data from the analytics pipeline.
     * @param {Object} weather - Weather data pulled from telemetry data.
     * @returns {Object} weatherAnalysis
     */

    function get(weather) {
        const alertThresholdsExceeded = Object.entries(config.alertThreshold)
            .reduce(onCheckAlertThresholds.bind(null, weather), []);
        return { alertThresholdsExceeded };
    }

    /**
     * Checks all metrics from the weather data against threshold
     * values defined in the config file.
     * @param {Object} weather - Weather data pulled from telemetry data.
     * @param {Array} res - Array to hold results of the threshold check.
     * @param {Array} [threshold, thresholdValue] - 2 element list containing
     * the current threshold being checked its value.
     * @returns {Object} weatherAnalysis
     */

    function onCheckAlertThresholds(weather, res, [threshold, thresholdValue]) {
        if (weather[threshold] > thresholdValue) {
            res.push({
                threshold,
                thresholdValue,
                recordedValue: weather[threshold]
            });
        }
        return res;
    }

    return {
        get
    }
};

module.exports = weatherAnalytics;
