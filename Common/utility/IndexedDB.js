/**
 * Created by fadi on 28/05/2016.
 */
// App global database instance and schema
//


var IndexedDB={

    db:null,

    openDB:function()
    {
        var me=this;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                if(!me.db){
                    me.db = new Dexie("SmartMedDB");
                    me.db.version(1).stores({
                        DOC_HAS_STUDY: "++id,docHasStudyId,studyId,studyCode,studyName,doctorId"
                    });
                    me.db.open();
                    resolve();
                }
                else {
                    resolve();
                }


             });
         return promise;


    },
     populateData:function(_tableName,_dataArray) {
         var db=this.db;
         var table=db[_tableName];
        return db.transaction("rw", table, function () {
            table.clear().
            then(function()
            {
                table.bulkAdd(_dataArray);
            })

        // Log data from DB:
       /* db.friends.orderBy('name').each(function (friend) {
            log(JSON.stringify(friend));
        });*/
    }).catch(function (e) {
        console.error("Error: "+e);
    });
}
};