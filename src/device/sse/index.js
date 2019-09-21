function sse(bottle) {
    const myController = require("./controller.js");
    const dependencies = ["router"];

    bottle.service("sse", function(router) {
    
        return {
            controller: myController({
                router: router.Router(),
            })
        }
    }, ...dependencies);
}

module.exports = sse;