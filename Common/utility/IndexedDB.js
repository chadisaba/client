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
                        DEVICE: "++id,deviceId,deviceName,modalityId,siteId",
                        STUDY: "++id,studyId,studyCode,studyName",
                        DOCTOR: "++id,doctorId,userFName,userLName,userInitiales",
                        ROOM_HAS_DEVICE: "++id,roomHasDeviceId,deviceId,deviceName,siteId",
                        ROOM: "++id,roomId,roomCode,roomName,siteId",
                        REFERRING_PHYSICIAN:"++id,referringPhysicianId,referringPhysicianFName,referringPhysicianLName,referringPhysicianTitle,referringPhysicianSearch",
                        DEVICE_HAS_STUDY: "++id,deviceHasStudyId,deviceId,studyId,siteId,deviceCode,deviceName",
                        SITE: "++id,siteId,siteCode,siteName",
                        TFIELD:'++id,tfieldName,tfieldDbName',
                        ESTABLISHMENT:'++id,establishmentId,establishmentCode,establishmentName',
                        EST_HAS_SERV:'++id,estHasServId,establishmentId,estHasServCode,estHasServName',
                        SITE_CONFIG:'++id,siteConfigId,siteId,siteConfigStartHour,siteConfigEndHour,siteConfigPyxMode,siteConfigFseIsChecked,siteConfigUidSenolog,siteConfigSenologType,siteConfigAmoDefault,siteConfigAmcDefault,siteConfigPdsMandatory,siteConfigCotFerieAuto,siteConfigCotUrgenceAuto,siteConfigCotEnfantAuto,siteConfigCotNuitAuto,siteConfigCotNuitHeureDebut,siteConfigCotNuitHeureFin',
                        CCAM_CONFIG:'++id,CCAMConfigId,CCAMConfigCode,CCAMConfigDescription',
                        CCAM_MODIFICATEURS:'++id,CCAMModificateurId,CCAMModificateurCode,CCAMModificateurCoef,CCAMModificateurAmount',
                        ACTE:'++id,acteId,acteCode,acteVersionId,actePrix',
                        ACTE_VERSION:'++id,acteVersionId,acteVersionCode,acteVersionStartDate,acteVersionEndDate',
                        APP_CONFIG:'++id,appConfigId,appConfigSeuilPav,appConfigHorsParcoursSoinsAmount',
                        GROUP_ROOM:'++id,groupRoomId,groupRoomName,groupRoomCode,groupRoomSchedulerZoom',
                        GROUP_ROOM_HAS_ROOM:'++id,groupRoomHasRoomId,groupRoomId,roomId'
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

    findById:function(_tableName,_idName,_idValue)
    {
        var db=this.db;
        var table=db[_tableName];
        return db.transaction("rw", table, function () {
            return table.where(_idName).equals(_idValue).first();
        }).catch(function (e) {
            console.error("Error: "+e);
        });
    },

    insertRecord:function(_tableName,_dataArray)
    {
        var db=this.db;
        var table=db[_tableName];
        return db.transaction("rw", table, function () {
            return table.bulkAdd(_dataArray);
        }).catch(function (e) {
            console.error("Error: "+e);
        });
    },
    deleteRecord:function(_tableName,_idValue)
    {
        var db=this.db;
        var table=db[_tableName];
        return db.transaction("rw", table, function () {
            return table.delete(_idValue);
        }).catch(function (e) {
            console.error("Error: "+e);
        });
    },
    updateRecord:function(_tableName,_idName,_idValue,_dataObject)
    {
        var db=this.db;
        var me=this;
        var table=db[_tableName];
        return db.transaction("rw", table, function () {
            return me.findById(_tableName,_idName,_idValue)
                .then (function(_result)
                {
                    if(_result && (_dataObject.id || isNaN(_dataObject.id)))
                        _dataObject.id=_result.id;
                    return table.put(_dataObject);
                }
                )
        })
            .catch(function (e) {
            console.error("Error: "+e);
        });
    },
     populateData:function(_tableName,_dataArray) {
         var db=this.db;
         var table=db[_tableName];
        return db.transaction("rw", table, function () {
            return table.clear().
            then(function()
            {
                return table.bulkAdd(_dataArray);
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
