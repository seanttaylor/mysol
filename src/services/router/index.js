/**
 * serviceName#routerService
 * serviceDescription: Wrapper for Express API. Used by other service to create
 * Express Router objects.
 */

function router(bottle) {
    const express = require("express");
    bottle.service("router", function() {
        return express;
    });

}
module.exports = router;
