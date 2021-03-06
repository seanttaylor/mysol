/**
 * serviceName#HTTPServer
 * serviceDescription: Creates an Express server, enabling device control over
 * HTTP.
 */

function HTTPServer(bottle) {
  /* Use of ES5 functions required with service declarations.
   * See https://github.com/young-steveo/bottlejs/issues/103
   */
  const dependencies = ["status", "sse", "history"];

  bottle.service("HTTPServer", function(status, sse, history) {
    const http = require("http");
    const express = require("express");
    const app = express();
    const bodyParser = require("body-parser");
    const morgan = require("morgan");
    const cors = require("cors");
    const serverPort = 8081;

    app.use(cors());
    app.use(morgan("combined"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    app.use("/device/status", status.controller);
    app.use("/device/sse", sse.controller);
    app.use("/device/events", history.controller);
    app.use(defaultErrorController);

    function defaultErrorController(err, req, res, next) {
      console.error(err.stack);
      res.status(500).send();
    }

    http.createServer(app).listen(serverPort, () => {
      console.log("mySōl server is listening on port %d (http://localhost:%d)", serverPort, serverPort);
    });
  }, ...dependencies);
}

module.exports = HTTPServer;
