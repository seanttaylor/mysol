function storage({ type = "default", config = {} } = {}) {
    const createPetname = require("node-petname");
    const implementationMap = {
        "default": require("./default")
        //s3: require("./s3")
    };

    const myStorageService = implementationMap[type](config);

    function createBucketName() {
        return createPetname(2).replace(" ", "-");
    }

    function createStorageBucket(bucketName = createBucketName()) {
        return myStorageService.createStorageBucket(bucketName);
    }

    function listStorageBuckets() {
        return myStorageService.listStorageBuckets();
    }

    function listBucketContents(bucketName) {
        myStorageService.listBucketContents(bucketName);
    }

    function getStorageBucket(bucketName) {
        //myStorageService.getStorageBucket(bucketName);
    }

    function putStorageBucket(bucketName, file) {
        myStorageService.putStorageBucket(bucketName, file);
    }

    function deleteStorageBucket(bucketName) {
        myStorageService.deleteStorageBucket(bucketName);
    }

    function getBucketItem(bucketName, itemId) {
        myStorageService.getBucketItem(bucketName, itemId);
    }

    function deleteBucketItem(bucketName, itemId) {
        myStorageService.deleteBucketItem(bucketName, itemId);
    }

    return {
        createStorageBucket,
        listStorageBuckets,
        listBucketContents,
        getBucketItem,
        deleteBucketItem,
        getStorageBucket,
        deleteStorageBucket,
        putStorageBucket
    }
}

module.exports = storage;
