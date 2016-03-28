Ext.define('MyApp.view.override.PatientHistoryPanelViewController', {
    override: 'MyApp.view.PatientHistoryPanelViewController',
    onPanelAfterRender: function(component, eOpts) {
       var me=this;
        if(me.getView().patientId)
        var patientId=me.getView().patientId;
        else
            var patientId=me.getView().up().patientId;
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