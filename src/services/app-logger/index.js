/**
 * serviceName#loggerService
 * serviceDesc: Exposes API for application logging.
 */
function loggerService(bottle) {
    const logger = require("../../lib/logger")();
    const fs = require("fs");
    const dependencies = ["events"];
    const logfileSizeThresholdMB = 1.0;

    bottle.service("logger-service", function(eventEmitter) {
        eventEmitter.on("logfile-write", onLogfileWrite);

        function getFileSizeMB(fileName) {
            const fileStats = fs.statSync(fileName);
            const fileSizeBytes = fileStats["size"];
            //Convert to size to MB.
            return fileSizeBytes / 1000000.0;
        }

        function onLogfileWrite(filePath) {
            if (getFileSizeMB(filePath) > logfileSizeThresholdMB) {
                eventEmitter.emit("logfile-size-threshold-exceeded", filePath);
            }
        }

        return logger;
    }, ...dependencies);
}

module.exports = loggerService;
