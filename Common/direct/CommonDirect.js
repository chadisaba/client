var CommonDirect={
    saveData:function(_dataObject,_tableName,_comment)
    {
        var promise = new Promise(
            function (resolve, reject) {
                var params={};
                params.table=_tableName;
                params.dataToBeSaved=_dataObject;
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
    },
    
       getDataFromIndexedDB:function(_searchValue,_searchFieldName)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                smartmedDB.cities.where(_searchFieldName)
                .startsWithIgnoreCase(_searchValue)
                .toArray (function (_resultsArray) {
              resolve(_resultsArray);
          });
            
             });
         return promise;
    },
    
    getDataById:function(_IdName,_idValue,_tableName)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var params;
                params={
                    table:_tableName,
                    filters:[{name:_IdName,value:_idValue}]
                };
                Server.CommonQueries.read(params,
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
        return promise;
    },
    getData:function(_tableName,_filtersArray)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var params;
                params={
                    table:_tableName
                };
                if(_filtersArray)
                params.filters=_filtersArray;
                Server.CommonQueries.read(params,
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
        return promise;
    },
      autoComplete:function(_scope,_searchValue,_searchFieldName,_comboStore,_field,_fromIndexedDB,_searchLengh)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_searchValue&& isNaN(_serachValue) && !stringUtil.isUUID4(_serachValue))
        {
        if(_searchValue.length>=searchLengh)
        {
            var store = me.getViewModel().getStore(_cityComboStore);
            if(_fromIndexedDB)
            {
               this.getCitiesFromIndexedDB(_searchValue,_searchFieldName)
                .then(
                    function(_resultData)
                    {
                        store.clearFilter();
                        store.removeAll();
                        store.loadData(_resultData);

                        store.filter({
                            property: _searchFieldName,
                            anyMatch: true,
                            value   : _searchValue
                        });
                        _field.expand();
                    });   
            }
            else{
              this.getData(_searchValue)
                .then(
                    function(_resultData)
                    {
                        store.clearFilter();
                        store.removeAll();
                        store.loadData(_resultData);

                        store.filter({
                            property: _searchFieldName,
                            anyMatch: true,
                            value   : _searchValue
                        });
                        _field.expand();


                    });  
            }
            
        }
        }
        else
        return _searchValue;
    }
};
