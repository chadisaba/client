var ReferringPhysicianDirect={
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
    }
};