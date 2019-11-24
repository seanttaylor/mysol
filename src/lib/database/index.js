function dbInterface(bottle) {
  const db = require("../repository")();

  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at:", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
  });

  bottle.service("database", function() {
    return db;
  });
}

module.exports = dbInterface;
