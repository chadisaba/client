Ext.define('MyApp.view.override.WorklistHistoryPanelViewController', {
    override: 'MyApp.view.WorklistHistoryPanelViewController',
    onPanelAfterRender: function(component, eOpts) {

        var me=this;
        var worklistGrid=me.getView().down('#worklistGridId');
        var worklistFilterGrid=me.getView().down('#worklistFilterGridItemId');
        Plugins.grid.GridSearchPlugin.configure(worklistGrid,worklistFilterGrid);
    },
    onGridpanelApplySearch: function() {
        var me=this;

        var searchGrid=me.getView().down('#worklistFilterGridItemId');
        var worklistGrid=me.getView().down('#worklistGridId');
        var filtersArray=Plugins.grid.GridSearchPlugin.getRemoteFilter(searchGrid);
        worklistGrid.getController().initGrid(false,filtersArray);


    }

    
});