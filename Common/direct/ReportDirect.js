var ReportDirect={
saveReport:function(_reportObject,_reportHeaderObject,_selectedStudyArray)
{
  var promise = new Promise(
    function (resolve, reject) {
        var params={};
        params.reportObj=_reportObject;
        params.reportHeaderObj=_reportHeaderObject;
        params.reportStudyArray=_selectedStudyArray;
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
