Ext.define('MyApp.view.override.PatientHistoryGridViewController', {
    override: 'MyApp.view.PatientHistoryGridViewController',
    
      onGridpanelAfterRender: function(component, eOpts) {

          var store = this.getViewModel().getStore('PatientHistoryStore');
          store.getProxy().setMetadata({patientId:this.getView().up('window').patientId});
        store.load();
    }
    
});