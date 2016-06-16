var CommonDirect={
    saveData:function(_dataObject,_tableName,_comment)
    {
        var promise = new Promise(
            function (resolve, reject) {
                var params={};
                params.table=_tableName;
                params.dataToBeSaved=_dataObject;
                params.comment=_comment||null;
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

    saveDataArray:function(_dataToBySaved,_tableName,_idName,_comment)
    {
        var promise = new Promise(
            function (resolve, reject) {
                var params={};
                params.table=_tableName;
                params.dataToBeSaved=_dataToBySaved;
                params.idName=_idName;
                params.comment=_comment||null;
                Server.CommonQueries.saveRecords(params,
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

    searchDataFromIndexedDB:function(_searchValue,_searchFieldName,_tableName)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                IndexedDB.openDB()
                    .then(
                        function()
                        {
                            IndexedDB.db[_tableName].where(_searchFieldName)
                                .startsWithIgnoreCase(_searchValue)
                                .toArray (function (_resultsArray) {
                                    resolve(_resultsArray);
                                });
                        }
                    );
            
             });
         return promise;
    },
    gethDataFromIndexedDB:function(_tableName)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                IndexedDB.openDB()
                    .then(
                        function()
                        {
                            IndexedDB.db[_tableName]
                                .toArray (function (_resultsArray) {
                                    resolve(_resultsArray);
                                });
                        }
                    );

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
    getData:function(_tableName,_filtersArray,_limit)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var params;
                params={
                    table:_tableName,
                    limit:_limit||100
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
    getDataWidthJoin:function(mainTableObject,joinTablesArray)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var params = {
                    mainTableObject: mainTableObject,
                    joinTablesArray: joinTablesArray

                };
                Server.CommonQueries.readJoin(params,
                    function (res) {
                        if (res.success) {
                            resolve(res.data);
                        }
                        else {
                            console.error(res.msg);
                            reject(res.msg);
                        }
                    });
            });
         return promise;
    },
      autoComplete:function(_scope,_tableName,_searchValue,_searchFieldName,_comboStoreName,_field,_fromIndexedDB,_searchLengh)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_searchValue&& isNaN(_searchValue) && !stringUtil.isUUID4(_searchValue)&& (_field.getValue()!=_field.getRawValue()))
        {
        if(_searchValue.length>=searchLengh)
        {
            var store = me.getViewModel().getStore(_comboStoreName);
            if(_fromIndexedDB)
            {
               this.getDataFromIndexedDB(_searchValue,_searchFieldName)
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
                var filtersArray=[{name:_searchFieldName,value:_searchValue}];
              this.getData(_tableName,filtersArray)
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
