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
    }
};
