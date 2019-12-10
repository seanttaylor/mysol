function historyService(bottle) {
    const dependencies = ["router", "hal", "events", "storage"];
    const myController = require("./controller.js");
    bottle.service("history", function(router, hal, eventEmitter, storageService) {

        const api = {
            onReplayEventHistory,
            getEventHistory
        };

        function onReplayEventHistory(startDate, endDate) {
            return {};
        }

        function getEventHistory(startDate, endDate) {
            storageService.listBucketContents("events")
                .then(console.log);
            return Promise.resolve({ _entity: "events" });
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
