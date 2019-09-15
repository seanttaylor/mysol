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

    /**
     * Add a record to the data store.
     * status (i.e. charging or discharging) 
     * @param {Object} data - Record to persist to the data store.
     * @returns {Promise} record - Promise containing the data store record.
    */
  
    function add(data) {
      return promisify(repo.add)(data);
    }

    /**
     * Update an existing record in the data store.
     * @param {String} id - Unique id of the record to update.
     * @param {Object} data - Updated record to persist to the data store.
     * @returns {Promise} object - Promise containing the data store record.
    */
  
    function update(id, body) {
      return findOne(id).then((data)=> {
        const updatedRecord = Object.assign(data, body);
        return promisify(repo.update)({ 
          _id: id, 
          ...updatedRecord
        });
      })
      
    }

    /**
     * Remove an existing record from the data store.
     * @param {String} id - Unique id of the record to remove.
     * @returns {Promise} object - Promise containing and empty object.
    */
  
    function remove(id) {
      return promisify(repo.remove)(id);
    }

    /**
     * Find all records in the data store.
     * @returns {Promise} array - Promise containing an list of all records in the data store.
    */
  
    function findAll() {
      return promisify(repo.findAll)();
    }
    
    /**
     * Find an existing record by id in the data store.
     * @param {String} id - The record to fetch from the data store.
     * @returns {Promise} object - Promise containing the specified record in the data store.
    */
   
    function findOne(id) {
      return promisify(repo.findOne)(id);
    }
  }
  
  module.exports = dbInterface;
  