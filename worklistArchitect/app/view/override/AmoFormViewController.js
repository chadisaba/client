Ext.define('MyApp.view.override.AmoFormViewController', {
    override: 'MyApp.view.AmoFormViewController',

    onAmoFormItemIdBoxReady: function(component, width, height, eOpts) {
        translateUtil.transForm(component);
    },
    initForm: function(_visitId,_patientId) {
        var me=this;
        me.hidePecFieldOnInitForm();
        me.hideTypeAssuranceOnInitForm();
        if(!_patientId)
            throw Error('_patientId can\'t be undefined');
        var viewModel=me.getViewModel();

        var form=this.getView();
        var regoRangGemAssureTField= form.down('#regoRangGemAssureTField');
        var regoNomAssureTField=form.down('#regoNomAssureTField');
        var regoPrenomAssureTField=form.down('#regoPrenomAssureTField');
        var regoDateNaissAssTField=form.down('#regoDateNaissAssTField');

        regoRangGemAssureTField.setFieldLabel(regoRangGemAssureTField.fieldLabel+Utility.renderer.mandatoryLabelRenderer());
        regoNomAssureTField.setFieldLabel(regoNomAssureTField.fieldLabel+Utility.renderer.mandatoryLabelRenderer());
        regoPrenomAssureTField.setFieldLabel(regoPrenomAssureTField.fieldLabel+Utility.renderer.mandatoryLabelRenderer());
        regoDateNaissAssTField.setFieldLabel(regoDateNaissAssTField.fieldLabel+Utility.renderer.mandatoryLabelRenderer());

        viewModel.getStore('TypeAssStore').loadData(ComboData.typeAssurance);
        viewModel.getStore('PecStore').loadData(ComboData.pec);
        viewModel.getStore('QualiteBenefStore').loadData(ComboData.qualiteBenef);
        var visitId=null;
        if(_visitId)
            visitId=_visitId;
        if(visitId)
        {

            CommonDirect.getData('REGO',[{name:'visitId',value:visitId}])
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
            if(!regoRec.get('visitId')){ // dans ce cas on a récupéré le rego du patient et non pas celui de la visite
                regoRec.set('visitId',_visitId);
                regoRec.set('regoId',UUID());
            }

            view.loadRecord(regoRec);
            me.originalValues=view.getValues();
        }
        else
        {
            var regoModel=Ext.create('MyApp.model.RegoModel');
            regoModel.set('regoId',UUID());
            regoModel.set('patientId',_patientId);
            regoModel.set('visitId',_visitId);
            regoModel.set('regoQualiteBenef','0');
            me.originalValues= {patientId:regoModel.get('patientId')};
            view.loadRecord(regoModel);
        }
        me.initComboAfterRecordLoading(_regoArray[0]);
        view.getPlugin('formcheckdirty').addFieldsChangeListener();

    },
    hidePecFieldOnInitForm:function()
    {
        var view=this.getView();
        var forcageAldCheckBox= view.down('#forcageAldItemId');
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

        if(_data)
        {
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
        }

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
                    dataToSave.visitId=_visitId;
                    RegoDirect.saveRego(dataToSave)
                        .then(function()
                        {
                            resolve();
                        });
                }
            });

    },
    onTypeAssComboChange: function(field, newValue, oldValue, eOpts) {


        var me=this;
        var view=me.getView();
        this.hideTypeAssuranceOnInitForm();
        var materniteContainer= view.down('#materniteContainerItemId');
         view.down('#forcageMaterniteCb').setValue(false);
        view.down('#dateMaterniteField').setValue("");
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
        me.calculTiersPayantSelonPec();
    },

    onPecComboChange: function(field, newValue, oldValue, eOpts) {

        var me=this;
        var view=me.getView();

        me.hidePecFieldOnInitForm();
        var forcageAldCheckBox= view.down('#forcageAldItemId');
        var droitCommunDateField=view.down('#droitCommunDateItemId');
        var valuesArray;

        valuesArray=newValue;

        valuesArray.forEach(function(_item)
        {
            switch (_item)
            {
                case 'adc' :
                    droitCommunDateField.setHidden(false);
                    break;
                case 'ald' :
                    forcageAldCheckBox.setHidden(false);
                    break;
            }
        });
        me.calculTiersPayantSelonPec();
        var pec=me.getPecAndTypeAssurance();
    },
    onPecComboSelect: function(combo, record, eOpts) {
        var valuesArray;
        var me=this;
        valuesArray=combo.getValue();
        var isAld=false;
        valuesArray.forEach(function(_item)
        {
            switch (_item)
            {
                case 'ald' :
                    isAld=true;
                    break;
            }
        });
        if(isAld)
        {
            Ext.Msg.confirm("Confirmation", "Etes-vous sûr(e) de vouloir forcer l'ALD?", function(btnText){
                if(btnText === "no"){
                    me.getView().down('#forcageAldItemId').setValue(false);
                    Ext.Array.remove(valuesArray,'ald');
                    combo.select(valuesArray);

                }
                else if(btnText === "yes"){
                    me.getView().down('#forcageAldItemId').setValue(true);
                   // var eventObject:ForcageALDEvent = new ForcageALDEvent("forcageALDPatientAMOEvent", true);
                }
            }, me);
        }

    },
    getPecAndTypeAssurance:function()
    {
        var me=this;
        var resultObj={};
        resultObj.isCMU=false;
        resultObj.isALD=false;
        resultObj.isAmeB=false;
        resultObj.isAmeC=false;
        resultObj.isFNS=false;
        resultObj.isInvalidite=false;
        resultObj.isDepistage=false;
        resultObj.isAccidentDroitCommun=false;
        resultObj.isMaternite=false;
        resultObj.isSMG=false;
        resultObj.isAT=false;
        resultObj.isAutreExoneration=false;
        var typeAssuranceValue=me.getView().down('#typeAssCombo').getValue();
        switch (typeAssuranceValue)
        {
            case 'mater' :
                resultObj.isMaternite=true;
                break;
            case 'at' :
                resultObj.isAT=true;
                break;
            case 'smg' :
                resultObj.isSMG=true;
                break;
        }
        var pecCombo=me.getView().down('#pecCombo');
        var valuesArray=pecCombo.getValue();
        if(valuesArray && valuesArray.length>0)
        {
            valuesArray.forEach(function(_item)
            {
                switch (_item)
                {
                    case 'adc' :
                        resultObj.isAccidentDroitCommun=true;
                        break;
                    case 'ald' :
                        resultObj.isALD=true;
                        break;
                    case 'cmu' :
                        resultObj.isCMU=true;
                        break;
                    case 'ameb' :
                        resultObj.isAmeB=true;
                        break;
                    case 'amec' :
                        resultObj.isAmeC=true;
                        break;
                    case 'fns' :
                        resultObj.isFNS=true;
                        break;
                    case 'inv' :
                        resultObj.isInvalidite=true;
                        break;
                    case 'dp' :
                        resultObj.isDepistage=true;
                        break;
                    case 'autreex' :
                        resultObj.isAutreExoneration=true;
                        break;

                }
            });
        }
        return resultObj;

    },
    checkPecAndTypeAssuranceCompatibility:function()
    {
        var me=this;
        var pec=me.getPecAndTypeAssurance();
        var result=true;
        if(pec.isCMU && (pec.isAmeB || pec.isAmeC || pec.isFNS || pec.isInvalidite ))
        {
            result=false;
        }
        else if(pec.isAmeB && (pec.isAmeC || pec.isFNS || pec.isInvalidite|| pec.isCMU ))
        {
            result=false;
        }
        else if(pec.isAmeC && (pec.isAmeB || pec.isFNS || pec.isInvalidite|| pec.isCMU || pec.isALD ))
        {
            result=false;
        }
        else if(pec.isDepistage && (pec.isAmeB || pec.isFNS || pec.isInvalidite|| pec.isCMU || pec.isALD ))
        {
            result=false;
        }
        else if(pec.isAccidentDroitCommun && (pec.isDepistage ))
        {
            result=false;
        }
        else if(pec.isFNS && (pec.isAmeB || pec.isAmeC  || pec.isInvalidite|| pec.isCMU || pec.isALD ))
        {
            result=false;
        }
        else if(pec.isInvalidite && (pec.isAccidentDroitCommun || pec.isMaternite ))
        {
            result=false;
        }
        else if(pec.isMaternite && (pec.isDepistage || pec.isAccidentDroitCommun ))
        {
            result=false;
        }
        else if(pec.isAccidentDroitCommun && (pec.isDepistage || pec.isMaternite ))
        {
            result=false;
        }
        else if(pec.isAutreExoneration && (pec.isSMG || pec.isMaternite ))
        {
            result=false;
        }
        return result;
    },
    onAmoComboItemIdChange: function(field, newValue) {
        var me=this;
        CommonDirect.autoComplete(me,"AMO",newValue,"amoName",'AmoComboStore',field,false,4);
    },
    onQualiteBenefComboChange: function(field, newValue, oldValue, eOpts) {

        var form=this.getView();
        var regoRangGemAssureTField= form.down('#regoRangGemAssureTField');
        var regoNomAssureTField=form.down('#regoNomAssureTField');
        var regoPrenomAssureTField=form.down('#regoPrenomAssureTField');
        var regoDateNaissAssTField=form.down('#regoDateNaissAssTField');

        if(newValue==='0')
        {
            regoRangGemAssureTField.setValue(null);
            regoNomAssureTField.setValue(null);
            regoPrenomAssureTField.setValue(null);
            regoDateNaissAssTField.setValue(null);
           regoRangGemAssureTField.setHidden(true);
            regoNomAssureTField.setHidden(true);
            regoPrenomAssureTField.setHidden(true);
            regoDateNaissAssTField.setHidden(true);

            regoRangGemAssureTField.allowBlank=true;
            regoNomAssureTField.allowBlank=true;
            regoPrenomAssureTField.allowBlank=true;
            regoDateNaissAssTField.allowBlank=true;
        }
        else
        {
            regoRangGemAssureTField.setHidden(false);
            regoNomAssureTField.setHidden(false);
            regoPrenomAssureTField.setHidden(false);
            regoDateNaissAssTField.setHidden(false);

            regoRangGemAssureTField.allowBlank=false;
            regoNomAssureTField.allowBlank=false;
            regoPrenomAssureTField.allowBlank=false;
            regoDateNaissAssTField.allowBlank=false;
        }

    },
    calculTiersPayantSelonPec:function(){
        var me=this;
       var  pec=me.getPecAndTypeAssurance();
       var resultObj={};
        resultObj.TPAmo=false;
        resultObj.TPAmc=false;
       if(pec.isCMU || pec.isAmeC){
           resultObj.TPAmo=true;
           resultObj.TPAmc=true;
       }
       else if(pec.isAmeB)
       {
           resultObj.TPAmc=true;
       }
       else if(pec.isAT || pec.isSMG || pec.isMaternite || pec.isALD || pec.isInvalidite|| pec.isDepistage || pec.isFNS || pec.isAutreExoneration)
       {
           resultObj.TPAmo=true;
       }

        me.fireViewEvent('tpChangedEvent',resultObj);

    }
});