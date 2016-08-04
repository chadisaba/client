Ext.define('MyApp.view.override.DevicePanelViewController', {
    override: 'MyApp.view.DevicePanelViewController',
    onTabpanelAfterRender: function(component, eOpts) {

        translateUtil.transPanel(component);
    }


});