/**
 * serviceName#historyService
 * serviceDescription: Exposes API for retreiving stored event streams.
 */
function historyService(bottle) {
    const dependencies = ["router", "hal", "events", "storage", "logger-service"];
    const myController = require("./controller.js");
    const { promisify } = require("util");
    const fs = require("fs");
    const readFile = promisify(fs.readFile);

    bottle.service("history", function(
        router,
        hal,
        eventEmitter,
        storageService,
        logger
    ) {

        const api = {
            onReplayEventHistory,
            getEventHistory
        };

        /**
         * Fetches the current status of the battery from the battery
         * module on the device-started event.
         * @param {Array} data - list of all event log lines from requested log
         * files in raw text format.
         * @retuns {Array} - list of all event log lines in JSON format.
         */

        function _parseEventHistoryData(data = []) {
            return data.reduce((res, file) => {
                const streams = file.trim().split("\n\n").map((ln) => {
                    try {
                        //doing try/catch here because we don't want an empty 500 response off one bad parse.
                        return JSON.parse(ln);
                    }
                    catch (e) {
                        //Send events that failed to parse to dead-letter queue.
                    }
                });
                return res.concat(streams);
            }, []);
        }

        /**
         * Fetches a log file from the static file storage.
         * @param {String} filePath - a file path to fetch from static storage.
         * @retuns {String} - raw text from the requested file.
         */

        function _getLogFile(filePath) {
            return storageService.getBucketItem("events", filePath.slice(7));
        }

        /**
         * Filters a list of ISO Date strings, retaining only the dates between
         * the startDate and endDate parameters.
         * @param {String} startDate - UNIX timestamp.
         * @param {String} endDate - UNIX timestamp.
         * @param {String} filePath - Log file path formatted as
         * ISO Date string.
         * @retuns {Array} - list of ISO Date Strings.
         */

        function _filterEventsByStartEndDate(startDate, endDate, filePath) {
            /*convert to UNIX time string; remove file folder name and
            extension.*/
            const timestamp = new Date(filePath.slice(7, -4)).getTime();
            return timestamp >= startDate && timestamp <= endDate;
        }

        function onReplayEventHistory(startDate, endDate) {
            return {};
        }

        /**
         * Fetches event log files from a specified start and end date.
         * @param {String} startDate - ISO Date String.
         * @param {String} endDate - ISO Date String.
         * @retuns {Object} - object containing all requested
         * events formatted as JSON.
         */

        function getEventHistory(startDate, endDate) {
            const _startDate = new Date(startDate).getTime();
            const _endDate = new Date(endDate).getTime();

            return storageService.listBucketContents("events")
                .then(({ contents }) => contents.filter(_filterEventsByStartEndDate.bind(null, _startDate, _endDate)))
                .then((contents) => Promise.all(contents.map(_getLogFile)))
                .then((data) => _parseEventHistoryData(data))
                .then((data) => {
                    return { _entity: "events", data };
                })
                .catch(logger.error)
        }

        return {
            controller: myController({
                api,
                router: router.Router(),
                hal
            })
        }

    }, ...dependencies);
}

module.exports = historyService;
