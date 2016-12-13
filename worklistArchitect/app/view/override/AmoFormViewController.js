Ext.define('MyApp.view.override.AmoFormViewController', {
    override: 'MyApp.view.AmoFormViewController',


    initForm: function(_visitId,_patientId) {
        var me=this;
        me.hidePecFieldOnInitForm();
        me.hideTypeAssuranceOnInitForm();
        if(!_patientId)
            throw Error('_patientId can\'t be undefined');
        var viewModel=me.getViewModel();

        viewModel.getStore('TypeAssStore').loadData(ComboData.typeAssurance);
        viewModel.getStore('PecStore').loadData(ComboData.pec);
        viewModel.getStore('QualiteBenefStore').loadData(ComboData.qualiteBenef);
        var visitId=null;
        if(_visitId)
            visitId=_visitId;
        if(visitId)
        {

            CommonDirect.getData('REGO',{name:'visitId',value:visitId})
                .then(function(_resultValue)
                {
                    me.loadRegoRecord(_resultValue,_patientId,_visitId);
                });
        }
        else
        {
            // we create a new rego
            // Check if a rego existe for the current patient
            CommonDirect.getData('REGO',[{name:'patientId',value:_patientId},{name:'visitId',value:null}])
                .then(function(_resultValue)
                {
                    me.loadRegoRecord(_resultValue,_patientId,_visitId);
                });
        }
    },
    loadRegoRecord:function(_regoArray,_patientId,_visitId)
    {
        var me=this;
        var view=me.getView();
        if(_regoArray.length)
        {
            var regoRec=new MyApp.model.RegoModel(_regoArray[0]);
            view.loadRecord(regoRec);
            me.originalValues=view.getValues();
        }
        else
        {
            var regoModel=Ext.create('MyApp.model.RegoModel');
            regoModel.set('regoId',UUID());
            regoModel.set('patientId',_patientId);
            regoModel.set('visitId',_visitId);
            me.originalValues= {visitId:regoModel.get('patientId')};
            view.loadRecord(regoModel);
        }
        me.initComboAfterRecordLoading(_regoArray[0]);
        view.getPlugin('formcheckdirty').addFieldsChangeListener();

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
    initComboAfterRecordLoading:function(_data)
    {
        var me=this;
        var view=me.getView();
        var typeAssurance=view.down('#typeAssCombo');

        if(_data.regoAt)
            typeAssurance.setValue('at');
        else if(_data.regoMaternite)
            typeAssurance.setValue('mater');
        else if(_data.regoSmg)
            typeAssurance.setValue('smg');

        var pecCombo=view.down('#pecCombo');
        var pecArray=[];
        if(_data.regoCmu)
            pecArray.push('cmu');
        if(_data.regoDepistage)
            pecArray.push('dep');
        if(_data.regoInvalidite)
            pecArray.push('inv');
        if(_data.regoAme)
            pecArray.push('ameb');
        if(_data.regoAmeComp)
            pecArray.push('amec');
        if(_data.regoAld)
            pecArray.push('ald');
        if(_data.regoAccDroitCommun)
            pecArray.push('adc');
        if(_data.regoAutrePec)
            pecArray.push('autreex');
        if(_data.regoFns)
            pecArray.push('fns');

        if(pecArray.length)
            pecCombo.setValue(pecArray);
    },
    amoFormSave: function(_visitId) {
        var me=this;
        if(!_visitId)
            throw  new Error('_visitId can\'t bee null');
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

                    var typeAssuranceValue=form.down('#typeAssCombo').getValue();
                    var pecArrayValues=form.down('#pecCombo').getValue();
                    dataToSave.regoAt=false;
                    dataToSave.regoMaternite=false;
                    dataToSave.regoSmg=false;
                    switch (typeAssuranceValue)
                    {
                        case 'at' :
                            dataToSave.regoAt=true;
                            break;
                        case 'mater' :
                            dataToSave.regoMaternite=true;
                            break;
                        case 'smg' :
                            dataToSave.regoSmg=true;
                            break;

                    }
                    var pecArray=[];
                    if(!Array.isArray(pecArrayValues))
                        pecArray.push(pecArrayValues);
                    else
                        pecArray=pecArrayValues;

                    dataToSave.regoCmu=false;
                    dataToSave.regoDepistage=false;
                    dataToSave.regoInvalidite=false;
                    dataToSave.regoAme=false;
                    dataToSave.regoAmeComp=false;
                    dataToSave.regoAld=false;
                    dataToSave.regoAccDroitCommun=false;
                    dataToSave.regoAutrePec=false;
                    dataToSave.regoFns=false;
                    pecArray.forEach(function(_item)
                    {
                        switch (_item)
                        {
                            case 'cmu' :
                                dataToSave.regoCmu=true;
                                break;
                            case 'dep' :
                                dataToSave.regoDepistage=true;
                                break;
                            case 'inv' :
                                dataToSave.regoInvalidite=true;
                                break;
                            case 'ameb' :
                                dataToSave.regoAme=true;
                                break;
                            case 'amec' :
                                dataToSave.regoAmeComp=true;
                                break;
                            case 'ald' :
                                dataToSave.regoAld=true;
                                break;
                            case 'adc' :
                                dataToSave.regoAccDroitCommun=true;
                                break;
                            case 'autreex' :
                            dataToSave.regoAutrePec=true;
                            break;
                            case 'fns' :
                                dataToSave.regoFns=true;
                                break;

                        }
                    });

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

    },
    onAmoComboItemIdChange: function(field, newValue, oldValue, eOpts) {
        var me=this;
        CommonDirect.autoComplete(me,"AMO",newValue,"amoName",'AmoComboStore',field,true,4);
    }

});