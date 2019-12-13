/**
 * serviceName#eventService
 * serviceDescription: Exposes API for application-level publish/subscribe.
 */
function eventService(bottle) {

    bottle.service("events", function() {
        const events = require("events");
        return new events.EventEmitter();
    });
}

module.exports = eventService;
