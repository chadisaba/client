Ext.define('MyApp.view.override.PatientHistoryPanelViewController', {
    override: 'MyApp.view.PatientHistoryPanelViewController',
    onPanelAfterRender: function(component, eOpts) {
       var me=this;
        var patientId=me.getView().patientId;
        var historyGrid=me.getView().down('#patientHistoryGrid');
         var store = historyGrid. getViewModel().getStore('PatientHistoryStore');
          store.getProxy().setMetadata({patientId:patientId});

        store.load();

    },
    onGridpanelDisplayFileContentEvent: function(gridpanel, fileContent) {
        var display=this.getView().down('#displayContentTextAreaItemId');
        display.setValue(fileContent);

    }



});