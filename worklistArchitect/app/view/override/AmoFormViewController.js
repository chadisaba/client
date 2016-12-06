Ext.define('MyApp.view.override.AmoFormViewController', {
    override: 'MyApp.view.AmoFormViewController',
    initForm: function(_visitId,_patientId) {
        var me=this;
        var view=me.getView();
        if(!_patientId)
            throw Error('_patientId can\'t be undefined');
        var viewModel=me.getViewModel();

        viewModel.getStore('TypeAssStore').loadData(ComboData.typeAssurance);
        viewModel.getStore('PecStore').loadData(ComboData.pec);
        var visitId=null;
        if(_visitId)
            visitId=_visitId;
        if(visitId)
        {

            CommonDirect.getData('REGO',{name:'visitId',value:visitId})
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
            // we create a new rego
            // Check if a rego existe for the current patient
            CommonDirect.getData('REGO',{name:'patientId',value:_patientId},{name:'visitId',value:null})
                .then(function(_resultValue)
                {
                    if(_resultValue.length)
                    {
                        var regoRec=new MyApp.model.RegoModel(_resultValue[0]);
                        view.loadRecord(regoRec);
                        me.originalValues=view.getValues();
                        view.getPlugin('formcheckdirty').addFieldsChangeListener();
                    }
                    else
                    {
                        var regoModel=Ext.create('MyApp.model.RegoModel');
                        regoModel.set('regoId',UUID());
                        regoModel.set('patientId',_patientId);
                        regoModel.set('visitId',_visitId);
                        me.originalValues= {visitId:visitRec.get('patientId')};
                        view.getPlugin('formcheckdirty').addFieldsChangeListener();
                    }
                });
        }
    },
    amoFormSave: function() {
        var me=this;
        //Creating a promise
        return new Promise(
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

    },
    onTypeAssComboChange: function(field, newValue, oldValue, eOpts) {

    },

    onPecComboChange: function(field, newValue, oldValue, eOpts) {

    }

});