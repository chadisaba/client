Ext.define('MyApp.view.override.WorklistHistoryPanelViewController', {
    override: 'MyApp.view.WorklistHistoryPanelViewController',
    onPanelAfterRender: function(component, eOpts) {

        var me=this;
        var worklistGrid=me.getView().down('#worklistGridId');
        var worklistFilterGrid=me.getView().down('#worklistFilterGridItemId');
        Plugins.grid.GridSearchPlugin.configure(worklistGrid,worklistFilterGrid);

        Ext.GlobalEvents.on('refreshWorklistEvent', function() {
            me.onGridpanelApplySearch();
        });
    },
    onGridpanelApplySearch: function() {
        var me=this;

        var searchGrid=me.getView().down('#worklistFilterGridItemId');
        var worklistGrid=me.getView().down('#worklistGridId');

        worklistGrid.getController().initGrid(false);


    }

    
});