/**
 * serviceName#weatherService
 * serviceDescription: Exposes API for accessing the weather data stream.
 */

function weatherService(bottle) {
    const dependencies = ["events", "logger-service", "www"];
    const { Observable } = require("rxjs");

    bottle.service("weather", function(eventEmitter, logger, www) {
        const weather$ = new Observable(subscriber => {
            setTimeout(() => {
                www.weather.getForecast().then(data => subscriber.next(data));
            }, 20000);
        });

        return {
            weather$
        }

    }, ...dependencies);
}

module.exports = weatherService;
