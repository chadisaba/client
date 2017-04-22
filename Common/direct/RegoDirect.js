var RegoDirect={
saveRego:function(_regoObject)
{
  var promise = new Promise(
        function (resolve, reject) {
 var params={};
           params.regoObject=_regoObject;
          Server.Rego.saveRego(params,
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
