/**
 * serviceName#wwwService
 * serviceDescription: Exposes API for accessing ALL third-party HTTP APIs.
 * Centralized integration point for external services.
 */
function wwwService(bottle) {
    bottle.service("www", function() {
        return {
            weather: require("./weather")()
        }
    });
}

module.exports = wwwService;
