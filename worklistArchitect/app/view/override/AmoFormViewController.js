Ext.define('MyApp.view.override.AmoFormViewController', {
    override: 'MyApp.view.AmoFormViewController',
    initForm: function(_visitId,_patientId) {
        var me=this;
        var view=me.getView();
        me.hidePecFieldOnInitForm();
        me.hideTypeAssuranceOnInitForm();
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
            CommonDirect.getData('REGO',[{name:'patientId',value:_patientId},{name:'visitId',value:null}])
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
                        me.originalValues= {visitId:regoModel.get('patientId')};
                        view.loadRecord(regoModel);
                        view.getPlugin('formcheckdirty').addFieldsChangeListener();
                    }
                });
        }
    },
    hidePecFieldOnInitForm:function()
    {
        var view=this.getView();
        var forcageAldCheckBox= view.down('#forcageAldItemID');
        forcageAldCheckBox.setHidden(true);
        var droitCommunDateField=view.down('#droitCommunDateItemId');
        droitCommunDateField.setHidden(true);

    },
    hideTypeAssuranceOnInitForm:function()
    {
        var view=this.getView();
        var materniteContainer= view.down('#materniteContainerItemId');
        materniteContainer.setHidden(true);
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
                    CommonDirect.saveData(dataToSave,'REGO')
                        .then(function()
                        {
                            resolve();
                        });
                }
            });

    },
    onTypeAssComboChange: function(field, newValue, oldValue, eOpts) {

        var view=this.getView();
        this.hideTypeAssuranceOnInitForm();
       var materniteContainer= view.down('#materniteContainerItemId');

        switch (newValue)
        {
            case 'at' :
                break;
            case 'mater' :
                materniteContainer.setHidden(false);
                break;
            case 'smg' :
                break;

        }
    },

    onPecComboChange: function(field, newValue, oldValue, eOpts) {

        var view=this.getView();
        this.hidePecFieldOnInitForm();
        var forcageAldCheckBox= view.down('#forcageAldItemID');
        var droitCommunDateField=view.down('#droitCommunDateItemId');
        var valuesArray=[];

        if(!Array.isArray(newValue))
            valuesArray.push(newValue);
        else
            valuesArray=newValue;


        valuesArray.forEach(function(_item)
        {
            switch (newValue)
            {
                case 'adc' :
                    droitCommunDateField.setHidden(false);
                    break;
                case 'ald' :
                    forcageAldCheckBox.setHidden(false);
                    break;

            }
        });

    }

});