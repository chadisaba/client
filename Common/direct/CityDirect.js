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
    cityAutoComplete:function(_scope,_serachValue,_cityComboStore,_field,_searchLengh)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_serachValue && _serachValue.length>=searchLengh && isNaN(_serachValue))
        {
            var store = me.getViewModel().getStore(_cityComboStore);
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
};