function events(bottle) {
    
    bottle.service("events", function() {
        const events = require("events");
        return new events.EventEmitter();
    });
}
  
module.exports = events;
  