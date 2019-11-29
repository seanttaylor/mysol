const fileStore = (function defaultFileStorage() {
    const fs = require("fs");
    const { join } = require("path");
    const { lstatSync, readdirSync } = fs

    function _getDirectories(dir) {
        return readdirSync(dir)
            .map(name => join(dir, name)).filter(_isDirectory)
            .map(path => path.slice(path.lastIndexOf("/") + 1, path.length));
    }

    /**
     * Checks whether source path is a directory.
     * @param {String} source - a file path
     * @returns {Boolean} - indicates whether a path is a directory.
     */

    function _isDirectory(source) {
        return lstatSync(source).isDirectory();
    }

    /**
     * Creates a new storage bucket.
     * @returns {Object} - object containing list of bucket names and number of
     * buckets.
     */

    function createStorageBucket(bucketName) {
        const timestamp = new Date().toISOString();

        try {
            fs.mkdirSync(`${__dirname}/buckets/${bucketName}`);
            console.log(`CREATED storageBucket: (${bucketName})`);
            return {
                error: null,
                status: "created",
                bucketName,
                createdAt: timestamp
            };
        }
        catch (e) {
            return {
                error: e.message,
                status: "not_created",
                bucketName: null,
                createdAt: null
            }

        }

    }

    /**
     * Returns list of storage buckets.
     * @returns {Object} - object containing list of bucket names and number of
     * buckets.
     */

    function listStorageBuckets() {
        const buckets = _getDirectories(`${__dirname}/buckets`);
        return {
            error: null,
            status: "ok",
            buckets,
            size: buckets.length,
        }
    }

    /**
     * Returns list of items inside bucket.
     * @returns {Object} - object containing list and number of bucket items.
     */

    function listBucketContents(bucketName) {
        try {
            const contents = readdirSync(`${__dirname}/buckets/${bucketName}`)
                .map(name => join(bucketName, name));

            return {
                error: null,
                status: "ok",
                contents,
                size: contents.length
            }
        }
        catch (e) {
            console.error(e);
            return {
                error: e.message,
                status: "not_found",
                contents: null,
                size: null
            }
        }
    }

    function putStorageBucket(bucketName, fileName, data) {

    }

    return {
        createStorageBucket,
        listStorageBuckets,
        listBucketContents,
        putStorageBucket
    }
}());

console.log(fileStore.listBucketContents("altered-beast"));

//module.exports = defaultFileStorage;
