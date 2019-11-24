function defaultLogger() {
    const fs = require("fs");
    const { promisify } = require("util");
    const writeToFile = promisify(fs.writeFile);
    const appendFile = promisify(fs.appendFile);
    const readFile = promisify(fs.readFile);
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

    function write(msg, path = "./application-log.txt") {
        return appendFile(path, `[${new Date().toISOString()}]: ${msg} \n`);
    }

    return {
        error,
        info,
        warn,
        write
    }
}

module.exports = defaultLogger;
