/**
 * Transforms input data into HAL format.
 * @param data - Data to format according to the HAL specification.
 * @returns {Object} - HAL formatted data.
*/

function device(data) {
    return {
        _links: {
            self: {
                href: "/status",
                title: "Get high level status information about a mySōl device."
            },
            usage: {
                href: "/status/usage",
                title: "Breakdown of energy usage by connected device."
            },
            battery: {
                href: "/status/battery",
                title: "Detailed summary of battery statistics."
            },
            rel: {
                href: "/device/control/{status}",
                title: "Send a control message to the device to change its status to one of an enumerated list.",
                templated: "true"
            }
        },
        ...data
    }   
};

module.exports = device;