function logger({ type = "default", config = {} } = {}) {
    const implementationMap = {
        "default": require("./default"),
        //winston: require("./winston"),
        //bunyan: require("./bunyan")
    };
    const myLogger = implementationMap[type](config);

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
        myLogger.write(msg);
    }

    return {
        error,
        info,
        warn,
        write
    }
}

module.exports = logger;
