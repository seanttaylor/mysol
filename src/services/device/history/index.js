/**
 * serviceName#historyService
 * serviceDesc: Exposes API for retreiving stored event streams.
 */
function historyService(bottle) {
    const dependencies = ["router", "hal", "events", "storage"];
    const myController = require("./controller.js");
    const { promisify } = require("util");
    const fs = require("fs");
    const readFile = promisify(fs.readFile);

    bottle.service("history", function(router, hal, eventEmitter, storageService) {

        const api = {
            onReplayEventHistory,
            getEventHistory
        };

        function _parseEventHistoryData(data = []) {
            return data.reduce((res, file) => {
                const streams = file.split("\n").map(line => {
                    let ln = line.slice(7).replace(/\\/g, "")
                        .replace(/nn/g, "").replace(" ", "")
                    return ln;
                });
                return res.concat(streams);
            }, []);
        }

        function _getLogFile(filePath) {
            return storageService.getBucketItem("events", filePath.slice(7))
        }

        function onReplayEventHistory(startDate, endDate) {
            return {};
        }

        function getEventHistory(startDate, endDate) {
            return storageService.listBucketContents("events")
                .then(({ contents }) => Promise.all(contents.map(_getLogFile)))
                .then((data) => _parseEventHistoryData(data))
                .then((data) => {
                    return { _entity: "events", data };
                })
                .catch(console.error)
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
