/**
 * serviceName#sseService
 * serviceDescription: Exposes API for pushing Server-Sent Events to
 * connected clients.
 * Creates Express route for pushing Server-Sent Events.
 */

function sseService(bottle) {
    const myController = require("./controller.js");
    const dependencies = ["router", "events", "logger-service"];

    bottle.service("sse", function(router, eventEmitter, logger) {
        const api = {
            setSSEResponseWriter,
            onDeviceBatteryEvent,
            onDeviceTelemetryEvent,
            onDeviceAnalyticsEvent,
            eventOf
        };

        let responseOf = defaultResponseOf;

        eventEmitter.on("device-battery-event", api.onDeviceBatteryEvent);
        eventEmitter.on("device-telemetry-event", api.onDeviceTelemetryEvent);
        eventEmitter.on("device-analytics-event", api.onDeviceAnalyticsEvent);

        /**
         * Default implementation of responseOf.
         * Logs Server-Sent events to the console if no clients to connect to
         * the server.
         * @param {Object} data - Event data to push to connected clients.
         * @returns void
         */

        function defaultResponseOf(data) {
            //default implementation does nothing without connected clients.
            logger.log(data);
            logger.write(data.slice(6))
                .then(({ filePath }) => {
                    eventEmitter.emit("logfile-write", filePath);
                });
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
            //This message format is REQUIRED for Server-Sent Events. See https://medium.com/conectric-networks/a-look-at-server-sent-events-54a77f8d6ff7
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
         * Sets a function for writing to the event stream.
         * @param {Function} responseWriterFn - A function wrapper of the
         * Express response object.
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
         * @returns void
         */

        function onDeviceTelemetryEvent(telemetryData) {
            responseOf(eventOf("device-telemetry-event", telemetryData));
        }

        /**
         * Publishes a server-sent event to the client with telemetry data.
         * @param {Object} telemetryData - Current telemetry data.
         * @returns void
         */

        function onDeviceAnalyticsEvent(analysisData) {
            responseOf(eventOf("device-analytics-event", analysisData));
        }

        return {
            controller: myController({
                router: router.Router(),
                api
            })
        }
    }, ...dependencies);
}

module.exports = sseService;
