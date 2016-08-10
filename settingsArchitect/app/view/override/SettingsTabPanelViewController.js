Ext.define('MyApp.view.override.SettingsTabPanelViewController', {
    override: 'MyApp.view.SettingsTabPanelViewController',
    onRefPhyGridIdAfterRender: function(component, eOpts) {
        component.getController().initGrid();
    },
    onTabpanelAfterRender: function(component, eOpts) {
    translateUtil.transPanel(component);
    }


});