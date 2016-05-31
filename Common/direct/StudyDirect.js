var StudyDirect={

    studyDirectAutoComplete:function(_scope,_serachValue,_comboStore,_field,_searchLengh)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_serachValue && _serachValue.length>=searchLengh && isNaN(_serachValue)&& !stringUtil.isUUID4(_serachValue))
        {
            var store = me.getViewModel().getStore(_comboStore);
            var filters=[];
            var filter= {name:'studyName',value:_serachValue};
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
                            value   : _serachValue
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
     studyAutoComplete:function(_scope,_serachValue,_studyComboStore,_field,_fromIndexedDB,_searchLengh)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_serachValue && isNaN(_serachValue) && !stringUtil.isUUID4(_serachValue))
        {
        if(_serachValue.length>=searchLengh)
        {
            var store = me.getViewModel().getStore(_studyComboStore);
            if(_fromIndexedDB)
            {
               this.getCitiesFromIndexedDB(_serachValue)
                .then(
                    function(cityData)
                    {
                        store.clearFilter();
                        store.removeAll();
                        store.loadData(cityData);

                        store.filter({
                            property: 'cityName',
                            anyMatch: true,
                            value   : _serachValue
                        });
                        _field.expand();


                    });   
            }
            else{
              this.getCities(_serachValue.toUpperCase())
                .then(
                    function(cityData)
                    {
                        store.clearFilter();
                        store.removeAll();
                        store.loadData(cityData);

                        store.filter({
                            property: 'cityName',
                            anyMatch: true,
                            value   : _serachValue
                        });
                        _field.expand();


                    });  
            }
            
        }
    }
    }
};
