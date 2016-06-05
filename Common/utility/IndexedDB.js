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
                    me.db = new Dexie("smartMedDB");
                    me.db.version(1).stores({
                        STATUS: "++id,lastUpdate",
                        DOC_HAS_STUDY: "++id,docHasStudyId,studyId,studyCode,studyName,doctorId",
                        USER: "++id,userId,userFName,userLName,userCatId",
                        CITY: "++id,cityId,cityName,cityZipCode",
                        DEVICE: "++id,deviceId,deviceCode,deviceName,modalityId",
                        STUDY: "++id,studyId,studyCode,studyName",
                        DOCTOR: "++id,doctorId,userFName,userLName",
                        ROOM_HAS_DEVICE: "++id,roomHasDeviceId,deviceId,deviceCode,deviceName,siteId",
                        ROOM: "++id,roomId,roomCode,roomName,siteId",
                        REFERRING_PHYSICIAN:"++id,referringPhysicianId,referringPhysicianFName,referringPhysicianLName,referringPhysicianTitle"

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
            });

        // Log data from DB:
       /* db.friends.orderBy('name').each(function (friend) {
            log(JSON.stringify(friend));
        });*/
    }).catch(function (e) {
        console.error("Error: "+e);
    });
}
};