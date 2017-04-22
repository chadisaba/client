var RegcDirect={
saveRegc:function(_regcObject)
{
  var promise = new Promise(
        function (resolve, reject) {
            var params={};
           params.regcObject=_regcObject;
          Server.Regc.saveRegc(params,
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

    getRegcAndMutuelle:function(_patientId,_visitId)
    {
       return new Promise(
            function (resolve, reject) {
                var params={};
                params.patientId=_patientId;
                params.visitId=_visitId;
                Server.Regc.getRegcAndMutuelle(params,
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
    }

};
