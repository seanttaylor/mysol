function panel() {
    const { interval, zip, range } = require("rxjs");
    const panel$ = zip(
        range(1, 100),
        interval(120000),
        onPanelEvent
    );

    function onPanelEvent(data) {
        return {
            exposure: data
        }
    }

    return panel$;
}

module.exports = panel;
