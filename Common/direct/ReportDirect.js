var ReportDirect={
saveReport:function(_reportObject,_reportHeaderObject)
{
  var promise = new Promise(
    function (resolve, reject) {
        var params={};
        params.reportObj=_reportObject;
        params.reportHeaderObj=_reportHeaderObject;
        Server.Report.saveReport(params,
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
