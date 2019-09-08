module.exports = {
    router: require("./lib/router"),
    database: require("./lib/db"),
    hal: require("./lib/hal"),
    events: require("./lib/events"),
    //gpio: require("./lib/gpio"),
    status: require("./device/status"),
    control: require("./device/control"),
    init: require("./device/init"),
    server: require("./server")
}
