function sse(bottle) {
    const myController = require("./controller.js");
    const dependencies = ["router", "events"];

    bottle.service("sse", function(router, eventEmitter) {
        const api = {
            setSSEResponseWriter,
            onDeviceBatteryEvent,
            onDeviceTelemetryEvent,
            eventOf
        };

        let responseOf = defaultResponseOf;

        eventEmitter.on("device-battery-event", api.onDeviceBatteryEvent.bind(api));
        eventEmitter.on("device-telemetry-event", api.onDeviceTelemetryEvent.bind(api));

        /**
         * Default implementation of responseOf.
         * Logs Server-Sent events to the console if no clients to connect to
         * the server.
         * @param {Object} data - Event data to push to connected clients.
         * @returns void
         */

        function defaultResponseOf(data) {
            console.log("/*===New Event===*/");
            console.log(data);
        }

        /**
         * Creates a UUID.
         * @returns {String}
         */

        function createUUID() {
            let dt = new Date().getTime();
            let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                let r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        }

        /**
         * Creates an event data object for subscribers on the server-sent event stream to consume.
         * @param {String} eventName - The name of the event to create.
         * @param {Object} payload - Data associated with event.
         * @returns {String}
         */

        function eventOf(eventName, payload = {}) {
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
         * Adds an Express response object to the API module so methods on the API can publish
         * data to the event stream.
         * @param {Function} responseWriterFn - A function wrapper of the Express response object.
         * @returns void
         */

        function setSSEResponseWriter(responseWriterFn) {
            responseOf = responseWriterFn;
        }

        /**
         * Publishes a server-sent event to the client with battery data.
         * @param {Object} batteryData - Current data about the battery.
         * @returns void
         */

        function onDeviceBatteryEvent(batteryData) {
            responseOf(eventOf("device-battery-event", batteryData));
        }

        /**
         * Publishes a server-sent event to the client with telemetry data.
         * @param {Object} telemetryData - Current telemetry data.
         */

        function onDeviceTelemetryEvent(telemetryData) {
            responseOf(eventOf("device-telemetry-event", telemetryData));
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
