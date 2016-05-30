var CityDirect={
    getCities:function(_searchValue)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var filters=[];
                var filter= {name:'cityName',value:_searchValue};
                filters.push(filter);
                var params={
                    table:"CITY",
                    filters:filters,
                    limit:20
                };
                var cityData=[];
                Server.CommonQueries.read(params,
                    function(res){
                        if(res.success){
                            resolve(res.data);
                        }
                        else{
                            reject(res.msg);
                            console.error(res.msg);
                        }
                    }
                );
             });
         return promise;
    },
      getCitiesFromIndexedDB:function(_searchValue)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                smartmedDB.cities.where("cityName")
                .startsWithIgnoreCase(_searchValue)
                .toArray (function (_resultsArray) {
              resolve(_resultsArray);
          });
            
             });
         return promise;
    },
    cityAutoComplete:function(_scope,_serachValue,_cityComboStore,_field,_fromIndexedDB,_searchLengh)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_serachValue && isNaN(_serachValue) && !stringUtil.isUUID4(_serachValue))
        {
        if(_serachValue.length>=searchLengh)
        {
            var store = me.getViewModel().getStore(_cityComboStore);
            if(_fromIndexedDB)
            {
               this.getCitiesFromIndexedDB(_serachValue.toUpperCase())
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
