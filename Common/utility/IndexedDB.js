/**
 * Created by fadi on 28/05/2016.
 */
var IndexedDB={
    db:null,
    openDb:function () {
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
        // Better use "this" than "req" to get the result to avoid problems with
        // garbage collection.
        // db = req.result;
        this.db = this.result;
        console.log("openDb DONE");
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    }
    },
    add:function(_dataArray,_tableName,_objectIdName) {
        var me=this;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                _dataArray
                var request = me.db.transaction([_tableName], "readwrite")
                    .objectStore(_tableName)
                    .add(_data);

                request.onsuccess = function(event) {
                    resolve(true);
                };

                request.onerror = function(event) {
                    reject("Unable to add data\r\nPrasad is already exist in your database! ");
                };
            });
        return promise;
},
    findById:function(_objectIdValue,_tableName) {

        //Creating a promise
        var promise = new Promise(
            function (resolve, reject) {
                var transaction = db.transaction(_tableName);
                var objectStore = transaction.objectStore(_tableName);
                var request = objectStore.get(_objectIdValue);

                request.onerror = function (event) {
                    reject("Unable to retrieve daa from database!");
                };

                request.onsuccess = function (event) {
                    if (request.result) {
                        resolve(request.result);
                    }
                    else {
                        reject("couldn't be found in your database!");
                    }
                };

            });
        return promise;
    },
    findAll:function(_objectIdName,_tableName) {

        //Creating a promise
        var promise = new Promise(
            function (resolve, reject) {
                var objectStore = db.transaction(_tableName).objectStore(_tableName);

                var resultArray=[];
                var object={};
                objectStore.openCursor().onsuccess = function(event) {
                    var cursor = event.target.result;

                    if (cursor) {
                        object={};
                        object[_objectIdName]=cursor.key;
                        for(var key  in cursor.value){
                            if(!cursor.value.hasOwnProperty(key)) continue;
                            object[key]=cursor.value[key];
                        }

                        resultArray.push[object];

                        cursor.continue();
                    }

                    else {
                        resolve(resultArray);
                    }
                };

            });
        return promise;
    },
    delete:function (_tableName,_idToDelete) {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var request = db.transaction([_tableName], "readwrite")
                    .objectStore(_tableName)
                    .delete(_idToDelete);

                request.onsuccess = function(event) {
                    resolve(true);
                };

             });
         return promise;
}

};