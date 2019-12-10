function defaultLogger() {
    const fs = require("fs");
    const { promisify } = require("util");
    const appendFile = promisify(fs.appendFile);
    const colorMap = require("./colors.js");

    function _getFileSizeMB(fileName) {
        const fileStats = fs.statSync(fileName);
        const fileSizeBytes = fileStats["size"];
        //Convert to size to MB.
        return fileSizeBytes / 1000000.0;
    }

    /**
     * Logs a message to the console.
     * @param {Any} msg - A message to log.
     * @returns void
     */

    function log(msg) {
        console.info(colorMap.fg.white, `[LOG]: ${msg}`);
    }

    /**
     * Logs an error message to the console.
     * @param {Any} msg - A message to log.
     * @returns void
     */

    function error(msg) {
        console.info(colorMap.fg.red, `[ERROR]: ${msg}`);
    }

    /**
     * Logs an information message to the console.
     * @param {Any} msg - A message to log.
     * @returns void
     */

    function info(msg) {
        console.info(colorMap.fg.white, `[INFO]: ${msg}`);
    }

    /**
     * Logs a warning message to the console.
     * @param {Any} msg - A message to log.
     * @returns void
     */

    function warn(msg) {
        console.info(colorMap.fg.yellow, `[WARN]: ${msg}`);
    }

    /**
     * Writes a message to a file.
     * @param {String} msg - A message to log.
     * @param {String} path - Path to the file.
     * @returns void
     */

    function write(msg, path = "./application-log.txt") {
        return Promise.resolve();
        //return appendFile(path, `[${new Date().toISOString()}]: ${msg} \n`)
        //.then(() => _getFileSizeMB(path));
    }

    return {
        log,
        error,
        info,
        warn,
        write
    }
}

module.exports = defaultLogger;
