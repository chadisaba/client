Ext.define('MyApp.view.override.SiteConfigWindowViewController', {
    override: 'MyApp.view.SiteConfigWindowViewController',
    onFormAfterRender: function(component, eOpts) {
        var siteConfig=this.getView().siteConfig;

        component.loadRecord(siteConfig);
    },

    onFormValidateEvent: function(form, rec) {
        var siteConfig=this.getView().siteConfig;
        var siteConfigModel=rec;
        this.fireViewEvent('validateEvent',siteConfigModel);
    },

    onFormCancelEvent: function(form) {
this.getView().close();
    }
    
});