const storageService = (function storage({ type = "default", config = {} } = {}) {
    const createPetname = require("node-petname");
    const implementationMap = {
        "default": require("./default")
        //s3: require("./s3")
    };

    console.log(createBucketName());
    const myStorageService = implementationMap[type](config);

    function createBucketName() {
        return createPetname(2).replace(" ", "-");
    }

    function createStorageBucket(bucketName = createBucketName()) {
        myStorageService.createStorageBucket(bucketName);
    }

    function listStorageBuckets() {
        myStorageService.listStorageBuckets();
    }

    function listBucketContents(bucketName) {
        myStorageService.listBucketContents(bucketName);
    }

    function getStorageBucket(bucketName) {
        myStorageService.getStorageBucket(bucketName);
    }

    function putStorageBucket(bucketName) {
        myStorageService.getStorageBucket(bucketName);
    }

    function deleteStorageBucket(bucketName) {
        myStorageService.getStorageBucket(bucketName);
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
}());

//module.exports = storage;
