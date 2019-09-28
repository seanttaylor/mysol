function hal(bottle) {
    const resources = {
        device: require("./device.js")
    }
    bottle.service("hal", function() {
        /**
         * Returns HAL formatted data with associated links based on the _entity property of the 
         * input data.
         * @param {object} data - data to transform to HAL format.
         * @returns {object} hal - Promise containing the battery status.
        */

        function of(data) {
            if (!data._entity) {
                return data;
            }
            return resources[data._entity](data);
        }

        return {
            of
        };
    });
}
  
module.exports = hal;
  