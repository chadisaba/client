Ext.define('MyApp.view.override.AmoFormViewController', {
    override: 'MyApp.view.AmoFormViewController',
    initForm: function(_regoId,_visitId,_patientId) {
        var me=this;
        var view=me.getView();
        if(!_patientId)
            throw Error('_patientId can\'t be undefined');
        var viewModel=me.getViewModel();

        viewModel.getStore('TypeAssStore').loadData(ComboData.typeAssurance);
        viewModel.getStore('PecStore').loadData(ComboData.pec);
        var regoId=null;
        if(_regoId)
            regoId=_regoId;
        if(regoId)
        {
            CommonDirect.getDataById("regoId",regoId,'REGO')
                .then(function(_resultValue)
                {
                    var regoRec=new MyApp.model.RegoModel(_resultValue[0]);
                    view.loadRecord(regoRec);
                    me.originalValues=view.getValues();
                    view.getPlugin('formcheckdirty').addFieldsChangeListener();
                });
        }
        else
        {
            // we create a new visit
            var regoModel=Ext.create('MyApp.model.RegoModel');
            regoModel.set('regoId',UUID());
            regoModel.set('patientId',_patientId);
            regoModel.set('visitId',_visitId);
            me.originalValues= {visitId:visitRec.get('patientId')};
            view.getPlugin('formcheckdirty').addFieldsChangeListener();
        }
    },
    amoFormSave: function() {
        var me=this;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var    currentValues = me.getView().getValues();
                // check if the form values have been changed
                if(JSON.stringify(me.originalValues) == JSON.stringify(currentValues)){
                    // Ext.MessageBox.alert(translate('Info'),translate('no change on the form'));
                    resolve();
                }
                else
                {
                    var rec=me.getView().getRecord();
                    var form=me.getView();
                    form.updateRecord(rec); // update the record with the form data
                    var dataToSave=rec.data;
                    CommonDirect.saveData(dataToSave)
                        .then(function()
                        {
                            resolve();
                        });
                }
            });
        return promise;
    },
    onTypeAssComboChange: function(field, newValue, oldValue, eOpts) {

    },

    onPecComboChange: function(field, newValue, oldValue, eOpts) {

    }

});