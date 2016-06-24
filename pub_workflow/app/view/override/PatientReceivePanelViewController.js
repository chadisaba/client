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
    onVisitSimplifiedFormIdStudyVisitGridEndEditEvent: function(form) {

        this.getView().down('#saveBtnCtnItemId').setDisabled(false);
    },

    onVisitSimplifiedFormIdStudyVisitGridStartEditEvent: function(form) {
        this.getView().down('#saveBtnCtnItemId').setDisabled(true);
    },

    onSaveAccueilPatientBtnClick: function(button, e, eOpts) {

        var me=this;
        Utility.loading.start(button);
        var p1=me.patientView.getController().patientFormSave();
       var  p2=me.visitView.getController().visitFormSave();
        Promise.all([p1,p2]).
        then(function(values)
        {
            Utility.loading.end(button);
            me.visitView.getController().getStudyVisitGrid().initGrid(null,null,me.visitView.getController().getVisitId());
            me.fireEvent('visitDataSavedEvent');
        })
            .catch(function(_err)
            {
                console.error(_err);
            })

    }


});