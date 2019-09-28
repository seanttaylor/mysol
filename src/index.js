module.exports = {
    router: require("./lib/router"),
    database: require("./lib/database"),
    hal: require("./lib/hal"),
    events: require("./lib/events"),
    sse: require("./device/sse"),
    //gpio: require("./lib/gpio"),
    telemetry: require("./device/telemetry"),
    psu: require("./device/power-supply"),
    battery: require("./device/battery"),
    status: require("./device/status"),
    control: require("./device/control"),
    init: require("./device/init"),
    HTTPServer: require("./server")
}
