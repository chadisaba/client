var MigrationDirect={

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
    getData:function(_tableName,_filtersArray,_limit)
    {
        //Creating a promise
        return new Promise(
            function(resolve, reject) {
                let params;
                params={
                    table:_tableName,
                    limit:_limit||100
                };
                params.database="_migrate";
                if(_filtersArray)
                    params.filters=me.convertDateToString(_filtersArray);

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
    },
    getDataWidthJoin:function(mainTableObject,joinTablesArray)
    {
        //Creating a promise
        var me=this;
        var promise=new Promise(
            function(resolve, reject) {
                var params = {
                    mainTableObject: mainTableObject,
                    joinTablesArray: joinTablesArray

                };
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
    }

};
