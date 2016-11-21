var VisitDirect={
saveVisit:function(_visitObject)
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

    saveVisitAndStudyVisit:function(_visitObject,_studiesVisitArray,_studiesArray,_worklistDoctor)
    {
        var promise = new Promise(
            function (resolve, reject) {
                var params={
                    visitObj:_visitObject,
                    studyVisitDataToBeSaved:_studiesVisitArray,
                    studiesArray:_studiesArray,
                    worklistDoctor:_worklistDoctor
                };
                Server.Visit.saveVisitAndStudyVisit(params,
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
    saveVisitAndStudyVisitAndRefPh:function(_visitObject,_studiesVisitArray,_studiesArray,_worklistDoctor,_visitRefPhDataObject,_refPhArray)
    {
        var promise = new Promise(
            function (resolve, reject) {
                var params={
                    visitObj:_visitObject,
                    studyVisitDataToBeSaved:_studiesVisitArray,
                    studiesArray:_studiesArray,
                    worklistDoctor:_worklistDoctor,
                    visitRefPhDataToBeSaved:_visitRefPhDataObject,
                    refPhArray:_refPhArray
                };
                Server.Visit.saveVisitAndStudyVisitAndRefPh(params,
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
    getPatientAndCityAndReferringPhy:function(_patientId)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var mainTableObject={};
                mainTableObject.tableName='PATIENT';
                mainTableObject.filters=[{name:'patientId',value:_patientId}];
                var joinTablesArray=[];
                joinTablesArray.push({
                    tableName:'city',
                    required:false,
                    fields:['cityName']
                },{tableName:'referring_physician',
                    required:false,
                    fields:['referringPhysicianName']
                });

                var params = {
                    mainTableObject: mainTableObject,
                    joinTablesArray: joinTablesArray

                };
                Server.CommonQueries.readJoin(params,
                    function (res) {
                        if (res.success) {

                            if(res.data.length>0)
                            {
                                if(res.data[0].cityId){
                                    var cityData=[];
                                    cityData.push({
                                        cityId:res.data[0].cityId,
                                        cityName:res.data[0]['City.cityName']
                                    });

                                }
                                if(res.data[0].referringPhysicianId){
                                    var referringPhysicianData=[];
                                    referringPhysicianData.push({
                                        referringPhysicianId:res.data[0].referringPhysicianId,
                                        referringPhysicianSearch:res.data[0]['ReferringPhysician.referringPhysicianSearch']
                                    });
                                }
                                resolve({
                                    cityData:cityData,
                                    referringPhysicianData:referringPhysicianData,
                                    record:res.data[0]
                                });
                            }
                            else{
                                console.error('PatientForm : the patientId is mandatory');
                                reject('PatientForm : the patientId is mandatory');

                            }
                        }
                        else {
                            console.error(res.msg);
                            reject(res.msg);

                        }
                    });
             });
         return promise;
    }
};
