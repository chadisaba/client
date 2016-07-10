Ext.define('MyApp.view.override.WorklistPanelViewController', {
    override: 'MyApp.view.WorklistPanelViewController',
    onPanelAfterRender: function(component, eOpts) {

        var me=this;
        var worklistGrid=me.getView().down('#worklistGridId');
       var  worklistFilterGrid=me.getView().down('#worklistFilterGridItemId');
        Plugins.grid.GridSearchPlugin.configure(worklistGrid,worklistFilterGrid);
    },
    onGridpanelApplySearch: function(searchObject) {
        console.error(searchObject);

        var worklistGrid=me.getView().down('#worklistGridId');
        var worklistStore=worklistGrid.getStore();
        worklistStore.clearFilter();
        worklistStore.filterBy(function(rec, id) {
            for (var filterRow in searchObject) {

                for (var filter in filterRow) {
                   // if(rec.)
                }
            }

            /*if (Ext.Array.indexOf(newValue,rec.get('STATE')) >= 0)
                return true;
            else
                return false;*/
        });



    }

});