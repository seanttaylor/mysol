function defaultLogger() {
    const colorMap = require("./colors.js");

    function error(msg) {
        console.info(colorMap.fg.red, `[ERROR]: ${msg}`);
    }

    function info(msg) {
        console.info(colorMap.fg.white, `[INFO]: ${msg}`);
    }

    function warn(msg) {
        console.info(colorMap.fg.yellow, `[WARN]: ${msg}`);
    }

    function write(msg) {

    }


    return {
        error,
        info,
        warn,
        write
    }
}

module.exports = defaultLogger;
