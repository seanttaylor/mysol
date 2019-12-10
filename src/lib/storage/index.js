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
        return myStorageService.listBucketContents(bucketName);
    }

    function getStorageBucket(bucketName) {
        //myStorageService.getStorageBucket(bucketName);
    }

    function putStorageBucket() {
        return myStorageService.putStorageBucket.apply(null, arguments);
    }

    function deleteStorageBucket(bucketName) {
        return myStorageService.deleteStorageBucket(bucketName);
    }

    function getBucketItem(bucketName, itemId) {
        return myStorageService.getBucketItem.apply(null, arguments);
    }

    function deleteBucketItem(bucketName, itemId) {
        return myStorageService.deleteBucketItema.apply(null, arguments);
    }

    return {
        createStorageBucket,
        listStorageBuckets,
        listBucketContents,
        getBucketItem,
        deleteBucketItem,
        deleteStorageBucket,
        getStorageBucket,
        putStorageBucket
    }
}

module.exports = storage;
