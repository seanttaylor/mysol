function dbInterface(bottle) {
    const { FSRepository } = require("repositories");
    const { promisify } = require("util");
    const repo = new FSRepository("./data.json");
  
    process.on("unhandledRejection", (reason, p) => {
      console.log("Unhandled Rejection at:", p, "reason:", reason);
      // application specific logging, throwing an error, or other logic here
    });
  
    bottle.service("database", function() {
      return {
        add,
        remove,
        update,
        findAll,
        findOne
      };
    })
  
    function add(data) {
      return promisify(repo.add)(data);
    }
  
    function update(id, body) {
      return findOne(id).then((data)=> {
        const updatedRecord = Object.assign(data, body);
        return promisify(repo.update)({ 
          _id: id, 
          ...updatedRecord
        });
      })
      
    }
  
    function remove(id) {
      return promisify(repo.remove)(id);
    }
  
    function findAll() {
      return promisify(repo.findAll)();
    }
  
    function findOne(id) {
      return promisify(repo.findOne)(id);
    }
  }
  
  module.exports = dbInterface;
  