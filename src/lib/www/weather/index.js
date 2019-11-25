function weather() {
    const weatherApiData = require("./dark-sky-schema.json");
    let currentLocation = {
        lat: 38.0820268,
        lng: 84.5067193,
        city: "New York, NY"
    };

    function getForecast({ lat = 0.0, lng = 0.0, city = "New York, NY" } = {}) {
        return Promise.resolve(weatherApiData["daily"]);
    }

    function getCurrent() {
        return Promise.resolve(weatherApiData["currently"]);
    }

    function getCurrentTemp() {
        return Promise.resolve({
            lastUpdate: new Date().toISOString(),
            currentTemp: weatherApiData["currently"]["temperature"],
            feelsLike: weatherApiData["currently"]["apparentTemperature"]
        });
    }

    function setLocation({ lat = 0.0, lng = 0.0, city = "New York, NY" } = {}) {
        currentLocation = Object.assign(currentLocation, { lat, lng, city });
        return Promise.resolve(currentLocation);
    }

    return {
        getForecast,
        getCurrent,
        getCurrentTemp,
        setLocation
    }
}

module.exports = weather;
