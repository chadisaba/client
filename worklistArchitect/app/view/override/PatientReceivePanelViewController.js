Ext.define('MyApp.view.override.PatientReceivePanelViewController', {
    override: 'MyApp.view.PatientReceivePanelViewController',
       onPatientFormIdAfterRender: function(component, eOpts) {
           this.patientView=component;
           this.patientView.down('#patientFormToolbarItemId').setHidden(true);
           component.getController().initForm(this.getView().patientId);


    },

    onVisitSimplifiedFormIdAfterRender: function(component, eOpts) {
        this.visitView=component;
      //  this.visitView.down('#patientFormToolbarItemId').setHidden(true);
        component.getController().initForm(this.getView().visitId,this.getView().patientId);
    },
    onSaveAccueilPatientBtnClick: function(button, e, eOpts) {

        Utility.loading.start(button);
        var p1=this.patientView.getController().patientFormSave();
       var  p2=this.visitView.getController().visitFormSave();
        Promise.all([p1,p2]).
        then(function(values)
        {
            Utility.loading.end(button);
        })
            .catch(function(_err)
            {
                console.error(_err);
            })

    }


});