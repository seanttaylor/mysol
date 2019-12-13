/**
 * serviceName#storageService
 * serviceDescription: Exposes API for static file storage.
 */
function storageService(bottle) {
    const libStorage = require("../../lib/storage")();
    const fs = require("fs");
    const { promisify } = require("util");
    const readFile = promisify(fs.readFile);
    const dependencies = ["events"];

    bottle.service("storage", function(eventEmitter) {
        eventEmitter.on("logfile-size-threshold-exceeded", onLogfileSizeThresholdExceeded);

        function onLogfileSizeThresholdExceeded(filePath) {
            readFile(filePath, "utf-8")
                .then((data) => data)
                .then(libStorage.putStorageBucket.bind(null, "events", `${new Date().toISOString()}.txt`));
        }

        return libStorage;
    }, ...dependencies);
}

module.exports = storageService;
