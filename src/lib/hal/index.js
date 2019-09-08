function hal(bottle) {
    const resources = {
        device: require("./device.js")
    }
    bottle.service("hal", function() {
        return {
            of
        };

        function of(data) {
            return resources[data._entity](data);
        }
    });
}
  
module.exports = hal;
  