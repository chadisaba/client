Ext.define('MyApp.view.override.InfoFormViewController', {
    override: 'MyApp.view.InfoFormViewController',
    initForm: function() {
        var me=this;
        var patientId;
        var visitId;
        if((visitId= me.getView().visitId)||(patientId=me.getView().patientId))
        {
            if(visitId)
                me.visitId=visitId;
            if(patientId)
                me.patientId=patientId;

            var filters=[{name:'visitId',value:visitId}];
            if(patientId=me.getView().patientId)
                filters=[{name:'patientId',value:me.getView().patientId}];

            CommonDirect.getData("INFO",filters,1)
                .then(
                    function(_result)
                {
                    var rec=Ext.create('MyApp.model.InfoModel',{infoAlertLevel:1});
                    if(_result.length>0)
                        rec=Ext.create('MyApp.model.InfoModel',_result[0]);
                    else
                        rec.set('infoId',UUID());

                    me.getView().loadRecord(rec);

                    me.getView().getPlugin('formediting').enterEditMode(me.getView());
                })
                    .catch(function(_err)
                    {
                        console.error(_err.msg);
                    });

        }
        else
            console.error('infoForm : the patientId or visitId are mandatory');

    },
    quitEditMode: function() {
        this.fireViewEvent('closeInfoWinEvent');
    },

    onInfoFormItemIdAfterRender: function(component) {
        component.getPlugin('formediting').quitEditMode();
        this.initForm();
    },
    onInfoFormItemIdInEdit: function(form) {

    },
    onInfoFormItemIdSaveEdit: function(form,saveBtn) {
        var me=this;

        var form=me.getView();
        var rec=form.getRecord();

        form.updateRecord(rec); // update the record with the form


        if(me.visitId){
            rec.set('visitId',me.visitId);
        }
        if(me.patientId) {
            rec.set('patientId',me.patientId);
        }
        var dataToSave=rec.data;

            if(me.visitId || me.patientId)
            {
                CommonDirect.saveData(dataToSave,'INFO',"")
                    .then(function(_result)
                    {
                        Utility.loading.end(saveBtn);
                        me.quitEditMode();
                    })
                    .catch(function(_err)
                    {
                        console.error(_err.msg);
                        Ext.MessageBox.alert("Error","save Error "+_err.msg);
                    });

            }
            else
                console.error('infoForm onInfoFormItemIdSaveEdit function : the patientId or visitId are mandatory');


    },

    onInfoFormItemIdResetEdit: function(form, promptWin) {

    },

    onInfoFormItemIdChHist: function(button) {

    },

    onInfoFormItemIdQuitEdit: function(form, promptWin) {

        this.quitEditMode();
    }

});