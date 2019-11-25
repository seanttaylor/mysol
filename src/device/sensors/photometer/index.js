function photometer() {
    const { interval, zip, range } = require("rxjs");
    const photometer$ = zip(
        range(1, 100),
        interval(60000),
        onPhotometerEvent
    );

    function onPhotometerEvent(data) {
        return {
            coverage: data
        }
    }

    return photometer$;
}

module.exports = photometer;
