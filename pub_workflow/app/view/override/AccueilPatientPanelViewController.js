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
            var patientId=patientViewController.getPatientId();
            if(me.getView().visitId) // on modifie la visite
            {
                var visitId=me.getView().visitId;
                me.visitView.getController().initForm(visitId,patientId);
                me.regoView.getController().initForm(visitId,patientId);
               // me.regcView.getController().initForm(visitId,patientId);
            }
            else
            {
                // on crée une visite
                me.visitView.getController().initForm(null,patientId);
                me.regoView.getController().initForm(null,patientId);
                // me.regcView.getController().initForm(me.getView().visitId,patientId);
            }
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
       /* if(this.getView().patientId)
            component.getController().initForm(this.getView().visitId,this.getView().patientId);
        else
        {
            component.setDisabled(true);
        }*/
    },
    onAmoFormItemIdAfterRender: function(component, eOpts) {
        this.regoView=component;
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
        var visitId=visitViewController.getVisitId();
        p1.then(
            function(_result)
            {
                var regoViewController = me.regoView.getController();

                var pAmo=regoViewController.amoFormSave(visitId);
               // var pAmc=regcViewController.amcFormSave();
                Promise.all([pAmo])
                    .then(function(_resultArray)
                    {
                        Utility.loading.end(button);
                        Ext.GlobalEvents.fireEvent('refreshWorklistEvent');
                    });

            })
            .catch(function(_err)
            {
                console.error(_err);

            });
    }
    
});