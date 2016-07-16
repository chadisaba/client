var StudyDirect={



     searchDocHasStudyFromIndexedDB:function(_searchValue,_doctorId)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                if(!_doctorId)
                    reject("getStudyByNameFromIndexedDB : the doctorId is required");
                IndexedDB.openDB()
                    .then(
                    function()
                    {
                        IndexedDB.db.DOC_HAS_STUDY.where("studyName")
                            .startsWithIgnoreCase(_searchValue).or('studyCode').startsWithIgnoreCase(_searchValue)
                            .and(function(_study) { return _study.doctorId == _doctorId;})
                            .toArray (function (_resultsArray) {
                                resolve(_resultsArray);
                            });
                    }
                );

            
             });
         return promise;
    },
    searchStudyFromIndexedDB:function(_searchValue)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                IndexedDB.openDB()
                    .then(
                        function()
                        {
                            IndexedDB.db.STUDY.where("studyName")
                                .startsWithIgnoreCase(_searchValue).or('studyCode').startsWithIgnoreCase(_searchValue)
                                .toArray (function (_resultsArray) {
                                    resolve(_resultsArray);
                                });
                        }
                    );


            });
        return promise;
    },
     docHasstudyAutoComplete:function(_scope,_searchValue,_studyComboStoreName,_field,_fromIndexedDB,_searchLengh,_doctorId)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_searchValue && isNaN(_searchValue) && !stringUtil.isUUID4(_searchValue)&&(_field.getRawValue().indexOf(":")<0))
        {
        if(_searchValue.length>=searchLengh)
        {
            var store = me.getViewModel().getStore(_studyComboStoreName);
            if(_fromIndexedDB)
            {
               this.searchDocHasStudyFromIndexedDB(_searchValue,_doctorId)
                .then(
                    function(_resultData)
                    {
                        store.clearFilter();
                        store.removeAll();
                        store.loadData(_resultData);

                        store.filterBy(
                            function(_rec)
                        {
                            var resultFilter=false;
                            if(_rec.get('studyCode').toUpperCase().indexOf(_searchValue.toUpperCase())>=0)
                                resultFilter=true;
                            if(_rec.get('studyName').toUpperCase().indexOf(_searchValue.toUpperCase())>=0)
                                resultFilter=true;

                            return resultFilter;
                        }

                );
                        _field.expand();


                    });   
            }
          /*  else{
                CommonDirect.getData("STUDY",[{name:"studyName",value:_searchValue}])
                .then(
                    function(_resultData)
                    {
                        store.clearFilter();
                        store.removeAll();
                        store.loadData(_resultData);

                        store.filter({
                            property: 'studyName',
                            anyMatch: true,
                            value   : _searchValue
                        });
                        _field.expand();


                    });
            }*/

        }
    }
    }
};
