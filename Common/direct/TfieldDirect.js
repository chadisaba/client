var TfieldDirect={
    getFieldsFromIndexDb:function()
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                IndexedDB.openDB()
                    .then(
                        function()
                        {
                            IndexedDB.db.TFIELD.toArray (function (_resultsArray) {
                                resolve(_resultsArray);
                            });
                        }
                    );
            });
        return promise;
    }
};
