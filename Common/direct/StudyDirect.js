var StudyDirect={

    studyDirectAutoComplete:function(_scope,_searchValue,_comboStore,_field,_searchLengh)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_searchValue && _searchValue.length>=searchLengh && isNaN(_searchValue)&& !stringUtil.isUUID4(_searchValue))
        {
            var store = me.getViewModel().getStore(_comboStore);
            var filters=[];
            var filter= {name:'studyName',value:_searchValue};
            filters.push(filter);

            CommonDirect.getData("STUDY",filters)
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
        }
    },
     getStudyByCodeFromIndexedDB:function(_searchValue,_doctorId)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                smartmedDB.study.where("studyCode")
                .startsWithIgnoreCase(_searchValue)
                .and(function(_study) { return _study.doctorId == _doctorId; })
                .toArray (function (_resultsArray) {
                resolve(_resultsArray);
                });

          });

         return promise;
    },
     getStudyByNameFromIndexedDB:function(_searchValue,_doctorId)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                smartmedDB.study.where("studyName")
                .startsWithIgnoreCase(_searchValue)
                .and(function(_study) { return _study.doctorId == _doctorId; })
                .toArray (function (_resultsArray) {
              resolve(_resultsArray);
          });
            
             });
         return promise;
    },
     studyAutoComplete:function(_scope,_searchValue,_studyComboStoreName,_field,_fromIndexedDB,_searchLengh,_doctorId)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_searchValue && isNaN(_searchValue) && !stringUtil.isUUID4(_searchValue)&&(_field.getRawValue().indexOf("-")<0))
        {
        if(_searchValue.length>=searchLengh)
        {
            var store = me.getViewModel().getStore(_studyComboStoreName);
            if(_fromIndexedDB)
            {
               me.getStudyByNameFromIndexedDB(_searchValue,_doctorId)
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
            }
            else{
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
            }
            
        }
    }
    }
};
