function HTTPServer(bottle) {
    /*Use of ES5 functions required with service declarations.
     * See https://github.com/young-steveo/bottlejs/issues/103
     */
    const dependencies = ["status"];
    
    bottle.service("HTTPServer", function(status) {
        const http = require("http");
        const express = require("express");
        const app = express();
        const bodyParser = require("body-parser");
        const morgan = require("morgan");
        const cors = require("cors");
        const serverPort = 8080;

        app.use(cors());
        app.use(morgan("combined"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use("/device/status", status.controller);

        http.createServer(app).listen(serverPort, () => {
            console.log("mySōl server is listening on port %d (http://localhost:%d)", serverPort, serverPort);
        });
    }, ...dependencies);
}

module.exports = HTTPServer;
