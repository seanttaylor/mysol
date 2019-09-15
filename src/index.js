module.exports = {
    router: require("./lib/router"),
    database: require("./lib/database"),
    hal: require("./lib/hal"),
    events: require("./lib/events"),
    //gpio: require("./lib/gpio"),
    psu: require("./device/power-supply"),
    battery: require("./device/battery"),
    status: require("./device/status"),
    control: require("./device/control"),
    init: require("./device/init"),
    server: require("./server")
}
