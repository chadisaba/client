Ext.define('MyApp.view.override.AccueilPatientPanelViewController', {
    override: 'MyApp.view.AccueilPatientPanelViewController',


     onPatientFormIdAfterRender: function(component, eOpts) {
         this.patientView=component;
           this.patientView.down('#patientFormToolbarItemId').setHidden(true);
           component.getController().initForm(this.getView().patientId);

    },

    onSavePatientBtnClick: function(button, e, eOpts) {

        var me=this;
        Utility.loading.start(button);
        var patientViewController = me.patientView.getController();
        var p1=patientViewController.patientFormSave();
        p1.then(
            function(_result)
        {
            me.getView().setActiveItem(1);
            Utility.loading.end(button);
        })
            .catch(function(_err)
            {
               console.error(_err);

            });

    },

    onVisitFormIdAfterRender: function(component, eOpts) {

        this.visitView=component;
        //  this.visitView.down('#patientFormToolbarItemId').setHidden(true);
        if(this.getView().patientId)
            component.getController().initForm(this.getView().visitId,this.getView().patientId);
        else
        {
            component.setDisabled(true);
        }
    },


    onVisitFormIdStudyVisitGridEndEditEvent: function(form) {
        this.getView().down('#saveVisitBtnCtnItemId').setDisabled(false);
    },
    onVisitFormIdStudyVisitGridStartEditEvent: function(form) {
        this.getView().down('#saveVisitBtnCtnItemId').setDisabled(true);
    },
    onSaveVisitBtnClick: function(button, e, eOpts) {
        var me=this;
        Utility.loading.start(button);
        var visitViewController = me.visitView.getController();
        var p1=visitViewController.visitFormSave();
        p1.then(
            function(_result)
            {
                Utility.loading.end(button);
                Ext.GlobalEvents.fireEvent('refreshWorklistEvent');
            })
            .catch(function(_err)
            {
                console.error(_err);

            });
    }
    
});