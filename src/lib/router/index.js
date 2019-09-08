function router(bottle) {
    const express = require("express");
    bottle.service("router", function() {
        return express;
    });

}
module.exports = router;
