var ReportDirect={
saveReport:function(_reportObject,_reportHeaderObject,_selectedStudyArray)
    {
        return new Promise(
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
    },
    getReportBodyAndHeaderContent:function(_reportId)
    {
        return new Promise(
            function (resolve, reject) {
                var params={};
                params.reportId=_reportId;
                Server.Report.getReportBodyAndHeaderContent(params,
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
    },
    getInfoToFillReportFields:function(_visitId,_visitStudyArray)
    {
        //Creating a promise
        return new Promise(
            function(resolve, reject) {

                var params;
                params={
                    visitId:_visitId,
                    visitStudyArray:_visitStudyArray
                };
                Server.Report.getInfosForReportTemplateFields(params,
                    function(res){
                        if(res.success){
                            resolve(res.data);
                        }
                        else{
                            console.error(res.msg);
                            reject(res.msg);
                        }
                    }
                )
            });
    },
    getReportTemplateContentByStudyAndDoctor:function(_studyId,_doctorId)
    {
        return new Promise(
            function(resolve, reject) {

                var params;
                params={
                    studyId:_studyId,
                    doctorId:_doctorId
                };
                Server.Report.getReportTemplateContentByStudyAndDoctor(params,
                    function(res){
                        if(res.success){
                            resolve(res.data);
                        }
                        else{
                            console.error(res.msg);
                            reject(res.msg);
                        }
                    }
                )
            });



    },
    getReportKeywordContent:function(_reportKeywordId)
    {
        return new Promise(
            function(resolve, reject) {
                var params;
                params={
                    reportKeywordId:_reportKeywordId
                };
                Server.Report.getReportKeywordContent(params,
                    function(res){
                        if(res.success){
                            resolve(res.data);
                        }
                        else{
                            console.error(res.msg);
                            reject(res.msg);
                        }
                    }
                )
            });
    }
};
