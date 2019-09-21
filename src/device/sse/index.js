function sse(bottle) {
    const myController = require("./controller.js");
    const dependencies = ["router", "events"];

    bottle.service("sse", function(router, eventEmitter) {
        const api = {
            setSSEResponseWriter,
            onLowBattery
        };

        eventEmitter.on("device-low-battery", api.onLowBattery.bind(api));

        /**
         * Creates a UUID.
         * @returns {String} 
        */

        function createUUID(){
            let dt = new Date().getTime();
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = (dt + Math.random()*16)%16 | 0;
                dt = Math.floor(dt/16);
                return (c=='x' ? r :(r&0x3|0x8)).toString(16);
            });
            return uuid;
        }
        
        /**
         * Creates an event data object for subscribers on the server-sent event stream to consume.
         * @param {String} eventName - The name of the event to create.
         * @param {Object} payload - Data associated with event.
         * @returns {String} 
        */

        function eventOf(eventName, payload) {
            return `data: ${JSON.stringify({
                header: {
                    timestamp: new Date().toISOString(),
                    name: eventName,
                    uuid: createUUID()
                },
                payload
            })}\n\n`;
        }

         /**
         * Adds an Express response object to the API module so methods on the API can publish data to the event stream.
         * @param {Function} responseWriterFn - A function wrapper of the Express response object.
         * @returns void
        */

        function setSSEResponseWriter(responseWriterFn) {
            this.responseOf = responseWriterFn;
        }

        /**
         * Publishes a server-sent event to the client indicating a low device battery.
         * @param {Number} batteryLevel - The current battery level.
         * @returns void
        */

        function onLowBattery(batteryLevel) {
            this.responseOf(eventOf("device-low-battery", {batteryLevel}));
        }

        return {
            controller: myController({
                router: router.Router(),
                api
            })
        }
    }, ...dependencies);
}

module.exports = sse;