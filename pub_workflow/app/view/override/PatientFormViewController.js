Ext.define('MyApp.view.override.PatientFormViewController', {
    override: 'MyApp.view.PatientFormViewController',
    initForm: function(_patientId) {
        var me=this;

        var view=me.getView();
        view.down('#cityNameComboBoxEditorItemId').setEmptyText(translate('enterAtLeast4Characters'));
        var viewModel=me.getViewModel();
        var patientId=null;
        if(view.patientId)
            patientId=view.patientId;
        if(_patientId)
            patientId=_patientId;
        var patientTitleComboStore=viewModel.getStore('PatientTitleComboStore');
        patientTitleComboStore.loadData(ComboData.patientTitle);
        if(patientId)
        {
            PatientDirect.getPatientAndCityAndReferringPhy(patientId)
                .then(function(_resultObject)
                {
                    if(_resultObject.cityData)
                        viewModel.getStore('CityNameComboStore').loadData(_resultObject.cityData);

                    if(_resultObject.referringPhysicianData)
                        viewModel.getStore('ReferringPhysicianNameComboStore').loadData(_resultObject.referringPhysicianData);

                    var rec=Ext.create('MyApp.model.PatientModel',_resultObject.record);
                    view.loadRecord(rec);
                    view.getPlugin('formcheckdirty').addFieldsCnangeListener();
                });
        }
        else
        {
            // we create a new patient
            var rec=Ext.create('MyApp.model.PatientModel');
            rec.set('patientId',UUID());
            view.loadRecord(rec);
            view.getPlugin('formcheckdirty').addFieldsCnangeListener();
        }

    },

    onPatientZipCodeTextFieldItemIdChange: function(field, newValue, oldValue, eOpts) {
        //Utility.form.fillCityFromZipCode(this,"CityNameComboStore","cityNameComboBoxEditorItemId",field,newValue);
    },
    onPatientZipCodeTextFieldItemIdBlur: function(component, event, eOpts) {
        Utility.form.fillCityFromZipCode(this,"CityNameComboStore","cityNameComboBoxEditorItemId",component,component.getValue());
    },
    onCityNameComboBoxEditorItemIdChange: function(field, newValue, oldValue, eOpts) {
        CommonDirect.autoComplete(this,"CITY",newValue,"cityName",'CityNameComboStore',field,false,4);
    },
    onCityNameComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        if(record.get('cityZipCode'))
        {
             this.getView().down('#patientZipCodeTextFieldItemId').setValue(record.get('cityZipCode'));
        }
    },
    onReferringPhysicianNameComboBoxEditorItemIdChange: function(field, newValue, oldValue, eOpts) {
        var me=this;
        CommonDirect.autoComplete(me,"REFERRING_PHYSICIAN",newValue,"referringPhysicianSearch",'ReferringPhysicianNameComboStore',field,true,4);
    },
    onPatientSocialNumberTextFieldItemIdChange: function(field, newValue, oldValue, eOpts) {
        if(newValue.length==13){
            var secuKey=97 - ( ( parseInt(newValue) ) % 97 );
            this.getView().down('#patientSocialKey').setValue(secuKey);
        }
    },
    onSaveFormBtnItemIdClick: function(button, e, eOpts) {
        var me=this;
        Utility.loading.start(button);
        me.patientFormSave()
            .then(function()
            {
                Utility.loading.end(button);
            })
            .catch(function(_err)
            {
                console.error(_err);
                Ext.Msg.alert('Error', translate('saveError'));
            });
    },
    getPatientId:function()
    {
        return this.getView().getRecord().get('patientId');
    },
    patientFormSave: function() {
        var me=this;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var rec=me.getView().getRecord();
                var form=me.getView();
                form.updateRecord(rec); // update the record with the form data
                var dataToSave=rec.data;
                PatientDirect.savePatient(dataToSave)
                    .then(function()
                    {
                        resolve();
                    });
             });
         return promise;
    },
    onRadiogroupChange: function(field, newValue, oldValue, eOpts) {
        var view=this.getView();
        var patientTitleCombo=view.down('#patientTitleComboBoxEditorItemId');
        var patientPregnantCheckBox = view.down('#patientPregnantCheckBoxItemId');
        if(newValue.patientGender=="1") // 1 form H, 2 Form W
        {
            patientPregnantCheckBox.setHidden(true);
            patientPregnantCheckBox.setValue(false);
            if(patientTitleCombo.getValue()!=4)
            {
                patientTitleCombo.setValue(1);
            }
        }
        if(newValue.patientGender=="2") // 1 form H, 2 Form W
        {
            patientPregnantCheckBox.setHidden(false);
            if(patientTitleCombo.getValue()!=4 || patientTitleCombo.getValue()!=3)
            {
                patientTitleCombo.setValue(2);
            }
        }
    },
    openRefPhyWin:function(refPhyId,title)
    {
        var me=this;
        Ext.create('Common.ux.window.FullScreenWindow', {
            title:translate(title),
            items:{
                region: 'center',
                xtype:'refphyform',
                listeners:{
                    afterrender:function(_comp)
                    {
                        _comp.getController().initForm(refPhyId);
                    },
                    formSavedEvent:function(_comp,_rec)
                    {
                        var refphStore=me.getViewModel().getStore('ReferringPhysicianNameComboStore');
                        refphStore.removeAll();

                        refphStore.loadData([_rec.getData()]);
                        me.getView().down('#referringPhysicianNameComboBoxEditorItemId').select(refphStore.getAt(0));
                       // alert(_rec.get('referringPhysicianLName'));
                        //this.up('window').close();
                    },
                    quitFormEvent:function()
                    {
                        this.up('window').close();
                    }
                }
            }
        }).show();
    },
    onRefPhyComboBoxComboAddItemEvent: function(combo, text) {
        this.openRefPhyWin(null,"add form");
    },

    onRefPhyComboBoxComboEditItemEvent: function(combo, value) {
        this.openRefPhyWin(value,"edit form");

    }
});
