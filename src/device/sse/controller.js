function sseController({ router }) {

    router.get("/", (req, res) => {
        
        res.status(200).set({
            "connection": "keep-alive",
            "cache-control": "no-cache",
            "content-type": "text/event-stream"
        });
        
        res.write(`data: Hello World \n\n\n`);
    });

    return router;
}

module.exports = sseController;
