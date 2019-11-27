/**
 * serviceName#loggerService
 * serviceDesc: Exposes API for application logging.
 */
function loggerService(bottle) {
    const logger = require("../../lib/logger")();
    bottle.service("logger-service", function() {
        return logger;
    });
}

module.exports = loggerService;