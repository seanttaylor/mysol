function logger({ type = "default", config = {} } = {}) {
    const implementationMap = {
        "default": require("./default"),
        //winston: require("./winston"),
        //bunyan: require("./bunyan")
    };
    const myLogger = implementationMap[type](config);

    function log(msg) {
        myLogger.log(msg);
    }

    function error(msg) {
        myLogger.error(msg);
    }

    function info(msg) {
        myLogger.info(msg);
    }

    function warn(msg) {
        myLogger.warn(msg);
    }

    function write(msg) {
        return myLogger.write(msg);
    }

    return {
        log,
        error,
        info,
        warn,
        write
    }
}

module.exports = logger;
