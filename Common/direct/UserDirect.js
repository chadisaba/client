var UserDirect={
    getUserByCat:function(_userCatId,fromIndexedDB)
    {
        //Creating a promise
        if(fromIndexedDB)
        {
            var promise=new Promise(
                function(resolve, reject) {
                    IndexedDB.openDB()
                        .then(
                            function()
                            {
                                IndexedDB.db.USER.where("userCatId")
                                    .equals(_userCatId)
                                    .toArray (function (_resultArray) {
                                        resolve(_resultArray);
                                    });
                            }
                        );

                });
            return promise;
        }
        else
        {
            var promise=new Promise(
                function(resolve, reject) {
                    CommonDirect.getData('USER',[{name:"userCatId",value:_userCatId}])
                        .then(function(_resultArray)
                        {
                            resolve(_resultArray);
                        })

                });
            return promise;
        }


    }
};
