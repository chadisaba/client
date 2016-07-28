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
        if(this.getView().patientId)
            component.getController().initForm(this.getView().visitId,this.getView().patientId);
        else
        {
            this.getView().down('#visitSimplifiedFormId').setDisabled(true);
        }
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
        var patientViewController = me.patientView.getController();
        var p1=patientViewController.patientFormSave();
        if(me.getView().patientId)
        {
            var p2=me.visitView.getController().visitFormSave();
            Promise.all([p1,p2]).
                then(function(values)
                {
                    Utility.loading.end(button);
                    var visitController = me.visitView.getController();
                    visitController.getStudyVisitGrid().getController().initGrid(null,null,visitController.getVisitId());
                    me.fireEvent('visitDataSavedEvent');
                })
                .catch(function(_err)
                {
                    console.error(_err);
                })
        }
        else
        {
            p1.then(function()
            {
                Utility.loading.end(button);
                me.getView().patientId= me.patientView.getController().getPatientId();
                me.visitView.getController().initForm(null,me.getView().patientId);
                me.visitView.setDisabled(false);
            }
            )
        }
    }


});