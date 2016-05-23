Ext.define('Utility.form', {

    statics: {
        fillCityFromZipCode:function(_scope,_cityComboStoreName,_cityComboBoxItemId,_zipCodeField,_newValue)
        {
            var me=_scope;
            var viewModel = me.getViewModel();
            var cityComboStore=viewModel.getStore(_cityComboStoreName);

            var userCombo=me.getView().down('#'+_cityComboBoxItemId);
            cityComboStore.clearFilter();
            userCombo.setValue(null);
            if (_newValue.length==5){
                var filters=[];
                var filter= {name:'cityZipCode',value:_newValue};
                filters.push(filter);
                var params={
                    table:"CITY",
                    filters:filters
                };
                var groupData=[];
                Server.CommonQueries.read(params,
                    function(res){
                        if(res.success){
                            groupData=res.data;
                            cityComboStore.loadData(groupData);
                            userCombo.select(cityComboStore.getAt(0));
                        }
                        else{
                            console.log(res.msg);
                        }
                    },me
                );



            }
        },
        cityAutoComplete:function(_scope,_serachValue,_cityComboStore,_field,_searchLengh)
        {
            var me=_scope;
            var searchLengh=_searchLengh||4;
            if(_serachValue && _serachValue.length>=searchLengh && isNaN(_serachValue))
            {
                var store = me.getViewModel().getStore(_cityComboStore);
                CityDirect.getCities(_serachValue.toUpperCase())
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
});