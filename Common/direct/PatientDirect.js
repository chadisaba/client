var PatientDirect={
savePatient:function(_patientObject)
{
  var promise = new Promise(
        function (resolve, reject) {
 var params={};
        params.table="PATIENT";
            if(_patientObject.patientLName)
                _patientObject.patientSearch=_patientObject.patientLName.toUpperCase()+" "+stringUtil.formatFName(_patientObject.patientFname);
        params.dataToBeSaved=_patientObject;
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
                    fields:['referringPhysicianLName','referringPhysicianFName']
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
                                        referringPhysicianLName:res.data[0]['ReferringPhysician.referringPhysicianLName'],
                                        referringPhysicianFName:res.data[0]['ReferringPhysician.referringPhysicianFName']
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
