Ext.define('MyApp.view.override.WorklistFiltreGridPanelViewController', {
    override: 'MyApp.view.WorklistFiltreGridPanelViewController',
    onGridpanelAfterRender: function(component, eOpts) {

      //  Ext.GlobalEvents.on('worklistGridAfterRenderEvent',this.createSearchColumnsHandler,this);
    }


});