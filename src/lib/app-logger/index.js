function applicationLogger(bottle) {
    const logger = require("../logger")();
    bottle.service("application-logger", function() {
        return logger;
    });
}

module.exports = applicationLogger;
