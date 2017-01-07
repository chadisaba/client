var SiteDirect={
saveSite:function(_visitObject)
{
  var promise = new Promise(
        function (resolve, reject) {
 var params={};
        params.table="VISIT";
           params.dataToBeSaved=_visitObject;
          Server.CommonQueries.saveRecord(params,
            function(_result){
                if(_result.success){
                    resolve(_result.data);
                }
                else{
                    console.error(_result.msg);
                    reject(_result.msg);
                }
            }
        );
});
return promise;
},
    getSite:function(_siteId)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var params;
                        params={
                            table:"SITE",
                            filters:[{name:'siteId',value:_siteId}]
                        };
                           Server.CommonQueries.read(params,
                            function(res){
                                if(res.success){
                                    resolve(res.data);
                                }
                                else{
                                    console.error(res.msg);
                                    reject(res.msg);
                                }
                            }
                        )
             });
         return promise;
    },
    getSitesFromIndexDb:function()
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                IndexedDB.openDB()
                    .then(
                        function()
                        {
                            IndexedDB.db.SITE.toArray (function (_resultsArray) {
                                    resolve(_resultsArray);
                                });
                        }
                    );
            });
        return promise;
    },


    getSiteConfigByIdFromIndexDb:function(_siteId)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                IndexedDB.openDB()
                    .then(
                        function()
                        {

                            IndexedDB.db.SITE_CONFIG.where("siteId")
                                .equals(_siteId)
                                .toArray (function (_resultsArray) {
                                    resolve(_resultsArray);
                                });


                        }
                    );
            });
        return promise;
    },





    getSites:function()
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var params;
                params={
                    table:"SITE"
                };
                Server.CommonQueries.read(params,
                    function(res){
                        if(res.success){
                            resolve(res.data);
                        }
                        else{
                            console.error(res.msg);
                            reject(res.msg);
                        }
                    }
                )
            });
        return promise;
    }
};
