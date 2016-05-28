Ext.define('MyApp.view.override.PatientReceivePanelViewController', {
    override: 'MyApp.view.PatientReceivePanelViewController',
       onPatientFormIdAfterRender: function(component, eOpts) {
           this.patientView=component;
           this.patientView.down('#patientFormToolbarItemId').setHidden(true);
           component.getController().initForm(this.getView().patientId);


    },

    onVisitSimplifiedFormIdAfterRender: function(component, eOpts) {
        component.getController().initForm(this.getView().visitId);
    },
    onSaveAccueilPatientBtnClick: function(button, e, eOpts) {

        this.patientView.getController().patientFormSave(button);
    }


});