function statusController({ api, router }) {

    router.get("/", (req, res) => {
        return api
        .getDeviceStatus()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    });

    return router;
}

module.exports = statusController;
