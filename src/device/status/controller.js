function statusController({ api, router, hal}) {

    router.get("/", (req, res) => {
        return api
        .getDeviceStatus()
        .then(data => {
            res.status(200).end(JSON.stringify(hal.of(data), null, 2));
        })
        .catch(error => {
            res.status(500).json(error);
        });
    });

    return router;
}

module.exports = statusController;
