Ext.define('MyApp.view.override.AccueilPatientPanelViewController', {
    override: 'MyApp.view.AccueilPatientPanelViewController',
    
    
     onPatientFormIdAfterRender: function(component, eOpts) {
         this.patientView=component;
           this.patientView.down('#patientFormToolbarItemId').setHidden(true);
           component.getController().initForm(this.getView().patientId);

    },

    onSavePatientBtnClick: function(button, e, eOpts) {

           var me=this;
          me.getView().setActiveItem(1);
    },

    onVisitFormIdAfterRender: function(component, eOpts) {

        this.visitView=component;
        //  this.visitView.down('#patientFormToolbarItemId').setHidden(true);
        if(this.getView().patientId)
            component.getController().initForm(this.getView().visitId,this.getView().patientId);
        else
        {
            this.getView().down('#visitFormId').setDisabled(true);
        }
    },


    onVisitFormIdStudyVisitGridEndEditEvent: function(form) {
        this.getView().down('#saveVisitBtnCtnItemId').setDisabled(false);
    },
    onVisitFormIdStudyVisitGridStartEditEvent: function(form) {
        this.getView().down('#saveVisitBtnCtnItemId').setDisabled(true);
    },
    onSaveVisitBtnClick: function(button, e, eOpts) {

    }
    
});