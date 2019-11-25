module.exports = {
    router: require("./lib/router"),
    database: require("./lib/database"),
    hal: require("./lib/hal"),
    events: require("./lib/events"),
    logger: require("./lib/app-logger"),
    www: require("./lib/www"),
    //library code should ALWAYS be required FIRST.//
    weather: require("./device/weather"),
    sse: require("./device/sse"),
    sensors: require("./device/sensors"),
    //gpio: require("./lib/gpio"),
    telemetry: require("./device/telemetry"),
    psu: require("./device/power-supply"),
    battery: require("./device/battery"),
    status: require("./device/status"),
    control: require("./device/control"),
    init: require("./device/init"),
    HTTPServer: require("./server")
}
