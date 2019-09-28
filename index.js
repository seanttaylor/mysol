const Bottle = require("bottlejs");
const myBottle = new Bottle();
const services = require("./src/index.js");

(function bootstrap(instance, services) {
    Object.entries(services)
    .map(([serviceName, serviceFn])=> {
        //Instantiate all services with an instance of Bottle.
        serviceFn(instance); 
        //Launch services.
        instance.container[serviceName];
    });
}(myBottle, services));
