var ReferringPhysicianDirect={
    getReferringPhysician:function(_searchValue)
    {
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var filters=[];
                var filter= {name:'referringPhysicianLName',value:_searchValue};
                filters.push(filter);
                var params={
                    table:"referring_physician",
                    filters:filters,
                    limit:20
                };
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
    referringPhysicianDirectAutoComplete:function(_scope,_serachValue,_cityComboStore,_field,_searchLengh)
    {
        var me=_scope;
        var searchLengh=_searchLengh||4;
        if(_serachValue && _serachValue.length>=searchLengh && isNaN(_serachValue)&& !stringUtil.isUUID4(_serachValue))
        {
            var store = me.getViewModel().getStore(_cityComboStore);
            this.getReferringPhysician(_serachValue)
                .then(
                    function(_resultData)
                    {
                        store.clearFilter();
                        store.removeAll();
                        if(_resultData.length>0)
                        {
                            store.loadData(_resultData);
                            store.filter({
                                property: 'referringPhysicianLName',
                                anyMatch: true,
                                value   : _serachValue
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
};