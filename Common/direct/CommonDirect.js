var CommonDirect={
    convertDateToString:function(_filtersArray)
    {
        _filtersArray.forEach(function(_filter)
        {
         if(_filter.value instanceof Date)
             if(_filter.isTime)
                 _filter.value.toISOString();
            else
                 _filter.value=Ext.Date.format(_filter.value,'Y-m-d');
        });
        return _filtersArray;

    },
    saveData:function(_dataObject,_tableName,_comment)
    {
        return new Promise(
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
                                IndexedDB.db[_tableName]
                                .where(_searchFieldName)
                                .startsWithIgnoreCase(_searchValue)
                               /* if(_searchFieldName)
                                    obj.or(_searchFieldName2).startsWithIgnoreCase(_searchValue);*/
                                .toArray(
                                    function (_resultsArray) {
                                    resolve(_resultsArray);
                                });
                        }
                    );
            
             });
         return promise;
    },
    searchDataWithTwoCriteriaFromIndexedDB:function(_searchValue,_searchFieldName1,_tableName,_searchFieldName2)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                IndexedDB.openDB()
                    .then(
                        function()
                        {
                            IndexedDB.db[_tableName]
                                .where(_searchFieldName1)
                                .startsWithIgnoreCase(_searchValue)
                                .or(_searchFieldName2)
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
    gethDataFromIndexedDBWithWhere:function(_tableName,_searchFieldName,_searchValue)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                IndexedDB.openDB()
                    .then(
                        function()
                        {
                            IndexedDB.db[_tableName]
                                .where(_searchFieldName)
                                .equals(_searchValue)
                                .toArray (function (_resultsArray) {
                                    resolve(_resultsArray);
                                });
                        }
                    );

            });
        return promise;
    },

    getAssociatedAndAvailable:function(params)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                Server.CommonQueries.getAssociatedAndAvailable(params,
                    function(res){
                        if(res.success){
                            resolve(res.data)
                        }
                        else{
                            reject(res.msg);

                        }
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

    deleteRecordById:function(_tableName,_IdName,_idValue)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var params;
                params={
                    table:_tableName,
                    recordIdName:_IdName,
                    recordIdValue:_idValue
                };
                Server.CommonQueries.deleteRecordById(params,
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
    getData:function(_tableName,_filtersArray,_limit,_fieldsArray,_order)
    {
        //Creating a promise
        var me=this;
        var promise=new Promise(

            function(resolve, reject) {

                var params;


                params={
                    table:_tableName,
                    limit:_limit||100
                };
                if(_filtersArray)
                    params.filters=me.convertDateToString(_filtersArray);
                if(_fieldsArray && _fieldsArray.length>0)
                    params.fieldsArray=_fieldsArray;
                if(_order)
                    params.order=_order;
                   // _filtersArray=


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
    getDataWidthJoin:function(mainTableObject,joinTablesArray,_limit)
    {
        //Creating a promise
        var me=this;
        var promise=new Promise(
            function(resolve, reject) {
                var params = {
                    mainTableObject: mainTableObject,
                    joinTablesArray: joinTablesArray

                };
                if(_limit) params.limit=_limit;

                if(params.mainTableObject.filters)
                    params.mainTableObject.filters=me.convertDateToString(params.mainTableObject.filters);

                joinTablesArray.forEach(function(_joinTable)
                {
                    if(_joinTable.filtersArray)
                        _joinTable.filtersArray=me.convertDateToString(_joinTable.filtersArray);
                });
                if(params.mainTableObject.filters)
                    params.mainTableObject.filters=me.convertDateToString(params.mainTableObject.filters);

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

      autoComplete:function(_scope,_tableName,_searchValue,_searchFieldName,_comboStoreName,_field,_fromIndexedDB,_searchLengh,_searchFieldName2,_inGridEditor)
        {
        var me=_scope;
        var searchLengh=_searchLengh||4;
            var inGridEditor=_inGridEditor||false;
            var newCond=true;
            if(inGridEditor)
                 newCond=(_field.getRawValue().indexOf(":")<0);

        if(_searchValue&& isNaN(_searchValue) && !stringUtil.isUUID4(_searchValue)&&newCond)
        {
        if(_searchValue.length>=searchLengh)
        {
            var store = me.getViewModel().getStore(_comboStoreName);
            if(_fromIndexedDB)
            {
                var p;
                if(_searchFieldName2)
                    p=this.searchDataWithTwoCriteriaFromIndexedDB(_searchValue,_searchFieldName,_tableName,_searchFieldName2);
                    else
                     p=this.searchDataFromIndexedDB(_searchValue,_searchFieldName,_tableName);
                p.then(
                    function(_resultData)
                    {
                        store.clearFilter();
                        store.removeAll();
                        if(_resultData.length>0) {
                            store.loadData(_resultData);
                            store.filterBy(
                                function(_rec)
                                {
                                    var resultFilter=false;
                                    if(_rec.get(_searchFieldName).toUpperCase().indexOf(_searchValue.toUpperCase())>=0)
                                        resultFilter=true;
                                    if(_searchFieldName2)
                                    {
                                        if(_rec.get(_searchFieldName2).toUpperCase().indexOf(_searchValue.toUpperCase())>=0)
                                            resultFilter=true;
                                    }
                                    return resultFilter;
                                }

                            );
                            _field.expand();
                        }
                        else
                        {
                            _field.setValue("");
                        }
                    });
            }
            else{
                var filtersArray=[{name:_searchFieldName,value:_searchValue.replace('_',""),compare:'startBy'}];
              this.getData(_tableName,filtersArray)
                .then(
                    function(_resultData)
                    {
                        store.clearFilter();
                        store.removeAll();
                        if(_resultData.length>0)
                        {
                            store.loadData(_resultData);
                            store.filter({
                                property: _searchFieldName,
                                anyMatch: true,
                                value   : _searchValue.replace('_',"")
                            });
                            _field.expand();
                        }
                        else
                        {
                            _field.setValue("");
                        }
                    });
            }
        }
        }
        else
        return _searchValue;
    }
};
