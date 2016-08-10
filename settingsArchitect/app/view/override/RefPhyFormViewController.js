Ext.define('MyApp.view.override.RefPhyFormViewController', {
    override: 'MyApp.view.RefPhyFormViewController',

    initForm: function(_formId) {
        var me=this;
        var view=me.getView();
        var viewModel=me.getViewModel();
        var formId=null;
        if(_formId)
            formId=_formId;

        var rec;
       // TODO change patientId by the id Name ,tableName by the table name
        if(formId)
        {
            var filtersArray=[
                {
                    patientId:_formId
                }
            ];
            // we retreive the record by id from the database
            CommonDirect.getData('tableName',filtersArray).
                then (function(_result)
            {
                //TODO change PatientModel
                 rec=Ext.create('MyApp.model.PatientModel',_result[0]);

            })
        }
        else
        {
            // we create a new record
            // TODO change PatientModel

             rec=Ext.create('MyApp.model.PatientModel');
            rec.set('patientId',UUID());

        }
        view.loadRecord(rec);

    },

    enterEditMode: function(form) {

    },

    quitEditMode: function(form, promptWin) {

    },

    onRefPhyFormItemIdAfterRender: function(component, eOpts) {
    	component.getPlugin('formediting').quitEditMode();
    },

    onRefPhyFormItemIdInEdit: function(form) {

    },

    onRefPhyFormItemIdSaveEdit: function(form, promptWin, comment) {

    },

    onRefPhyFormItemIdResetEdit: function(form, promptWin) {

    },

    onRefPhyFormItemIdChHist: function(button) {

    },

    onRefPhyFormItemIdQuitEdit: function(form, promptWin) {

    }

});