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

            var params={table:'info',filters:filters};
            Server.CommonQueries.read(params,
                function(res){
                    if(res.success){
                        var rec=Ext.create('MyApp.model.InfoModel',{infoAlertLevel:1});
                        if(res.data.length>0)
                            rec=Ext.create('MyApp.model.InfoModel',res.data[0]);
                        me.getView().loadRecord(rec);

                        me.getView().getPlugin('formediting').enterEditMode(me.getView());
                    }
                    else{
                        console.error(res.msg);
                    }
                }   );
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
        var params={};
        params.table="INFO";
        params.dataToBeSaved=me.getView().getValues();

        if(me.visitId){
            params.idName="visitId";
            params.idValue=me.visitId;
            params.dataToBeSaved.visitId=me.visitId;
        }
        if(me.patientId) {
            params.idName = "patientId";
            params.idValue = me.patientId;
            params.dataToBeSaved.patientId=me.patientId;
        }

            if(params.idName)
            {
                Server.CommonQueries.deleteThenInsert(params,
                    function(_result){
                        if(_result.success){

                            Utility.loading.end(saveBtn);
                            me.quitEditMode();
                        }
                        else{
                            console.error(_result.msg);
                            Ext.MessageBox.alert("Error","save Error "+_result.msg);
                        }
                    },me
                );

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