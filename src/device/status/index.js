function statusService(bottle) {
    const myController = require("./controller.js");
    const dependencies = ["router"];

    bottle.service("status", function(router) {
        const api = {
            getDeviceStatus
        };

        function getDeviceStatus() {
            return Promise.resolve({});
        }

        return {
            controller: myController({
                api,
                router: router.Router()
            })
        }

    }, ...dependencies);
}

module.exports = statusService;
