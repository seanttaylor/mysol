/**
 * Transforms input data into HAL format.
 * @param data - Data to format according to the HAL specification.
 * @returns {Object} - HAL formatted data.
 */

function events(resource) {
    const { _entity, data } = resource;
    return {
        _links: {
            self: {
                href: "/events?startdate={YYYY-MM-DDThh:mm:ss}&enddate={YYYY-MM-DDThh:mm:ss}",
                title: "Get list of generated events stored in the device log.",
                templated: true
            },
            replay: {
                href: "/events/replay?startdate={YYYY-MM-DDThh:mm:ss}&enddate={YYYY-MM-DDThh:mm:ss}",
                title: "Re-emit events to connected client(s).",
                templated: true
            },
            rel: {
                href: "http://localhost:8081/api/relations/events",
                title: "Canonical definition of this resource with annotations."
            }
        },
        events: data
    }
};

module.exports = events;
