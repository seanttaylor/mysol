function accelerometer() {
    const { interval, zip, range } = require("rxjs");
    const accelerometer$ = zip(
        range(1, 180),
        interval(30000),
        onAccelerometerEvent
    );

    function onAccelerometerEvent(data) {
        return {
            orientation: data
        }
    }

    return accelerometer$;
}

module.exports = accelerometer;
