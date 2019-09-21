function sseController({ api, router }) {

    router.get("/", (req, res) => {
        
        res.status(200).set({
            "connection": "keep-alive",
            "cache-control": "no-cache",
            "content-type": "text/event-stream"
        });
        
        api.setSSEResponseWriter((data)=> res.write(data));
        res.write(`data: SSE channel initialized.\n\n`);
    });

    return router;
}

module.exports = sseController;
