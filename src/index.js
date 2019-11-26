module.exports = {
    www: require("./services/www"),
    hal: require("./services/hal"),
    events: require("./services/events"),
    router: require("./services/router"),
    logger: require("./services/app-logger"),
    database: require("./services/database"),
    weather: require("./services/device/weather"),
    sse: require("./services/device/sse"),
    sensors: require("./services/device/sensors"),
    //gpio: require("./services/gpio"),
    telemetry: require("./services/device/telemetry"),
    psu: require("./services/device/power-supply"),
    battery: require("./services/device/battery"),
    status: require("./services/device/status"),
    control: require("./services/device/control"),
    init: require("./services/device/init"),
    //HTTP service is ALWAYS loaded LAST.//
    HTTPServer: require("./services/server")
}
