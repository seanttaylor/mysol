function statusService(bottle) {
    const myController = require("./controller.js");
    const dependencies = ["router", "database", "hal"];

    bottle.service("status", function(router, db, hal) {
        const api = {
            getDeviceStatus
        };

        function getDeviceStatus() {
            return db.findOne("myDevice");
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

module.exports = statusService;
