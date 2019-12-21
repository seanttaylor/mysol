function historyController({ api, router, hal }) {

    router.get("/", (req, res) => {
        return api
            .getEventHistory(req.query["startdate"], req.query["enddate"])
            .then(data => {
                data
                res.status(200).end(JSON.stringify(hal.of(data), null, 2));
            })
            .catch(error => {
                res.status(500).json(error);
            });
    });

    router.get("/replay", (req, res) => {
        return api
            .onReplayEventHistory(req)
            .then(data => {
                res.status(200).end(JSON.stringify(hal.of(data), null, 2));
            })
            .catch(error => {
                res.status(500).json(error);
            });
    });

    return router;
}

module.exports = historyController;
