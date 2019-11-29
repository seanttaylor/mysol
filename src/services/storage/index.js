/**
 * serviceName#storageService
 * serviceDesc: Exposes API for static file storage.
 */
function storageService(bottle) {
    const libStorage = require("../../lib/storage")();

    bottle.service("storage", function() {
        return libStorage;
    });
}

module.exports = storageService;
