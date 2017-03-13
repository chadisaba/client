var StudyVisitHasActeDirect={
    saveStudyVisitHasActe:function(_studyVisitHasActeArray,_visitId,_status)
    {
        return new Promise(
            function (resolve, reject) {
                var params={
                    studyVisitHasActeDataToBeSaved:_studyVisitHasActeArray,
                    visitId:_visitId,
                    status:_status
                };
                Server.StudyVisitHasActe.saveStudyVisitHasActe(params,
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
