var DeviceDirect= {
    getDeviceBySiteAndStudy: function (_studyId, _siteId,_fromIndexedDB){
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                if(_fromIndexedDB)
                {
                    if(!_studyId)
                        reject("getDeviceBySiteAndStudyFromIndexedDB : the _studyId is required");
                    if(!_siteId)
                        reject("getDeviceBySiteAndStudyFromIndexedDB : the _siteId is required");
                    IndexedDB.openDB()
                        .then(
                            function()
                            {
                                IndexedDB.db.DEVICE_HAS_STUDY.where("siteId")
                                    .equals(_siteId)
                                    .and(function(_device) { return _device.studyId == _studyId;})
                                    .toArray (function (_resultsArray) {
                                        resolve(_resultsArray);
                                    });
                            }
                        );
                }
                else{
                    console.error('getDeviceBySiteAndStudy : not implmented fonction');
                    reject();
                   /* CommonDirect.getData("STUDY_HAS_DEVICE",_filters,_limit)
                        .then(function(_resultData)
                        {
                            resolve(_resultData);
                        });  */
                }
             });
         return promise;

}
};
