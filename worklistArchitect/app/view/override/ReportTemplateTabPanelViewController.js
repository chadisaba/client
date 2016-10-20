Ext.define('MyApp.view.override.ReportTemplateTabPanelViewController', {
    override: 'MyApp.view.ReportTemplateTabPanelViewController',
    
    onReportHFTemplateGridAfterRender: function(component, eOpts) {
        component.getController().initGrid();
    },

    onReportTemplateGridAfterRender: function(component, eOpts) {
        component.getController().initGrid();
    }
    
});