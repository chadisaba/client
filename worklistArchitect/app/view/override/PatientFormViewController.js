Ext.define('MyApp.view.override.PatientFormViewController', {
    override: 'MyApp.view.PatientFormViewController',


    initForm: function(_patientId) {

        var me=this;

        var view=me.getView();
        view.down('#cityNameComboBoxEditorItemId').setEmptyText(translate('enterAtLeast4Characters'));
        var viewModel=me.getViewModel();
        var patientId=null;
        var visitId=null;
        if(view.patientId)
            patientId=view.patientId;
        if(_patientId)
            patientId=_patientId;

        var patientTitleComboStore=viewModel.getStore('PatientTitleComboStore');
        patientTitleComboStore.loadData(ComboData.patientTitle);

        if(visitId)
        {

        }
        else if(patientId)
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

                });
        }
        else
        {
            // we create a new patient
            var rec=Ext.create('MyApp.model.PatientModel');
            view.loadRecord(rec);
        }

    },

    onPatientZipCodeTextFieldItemIdChange: function(field, newValue, oldValue, eOpts) {
        Utility.form.fillCityFromZipCode(this,"CityNameComboStore","cityNameComboBoxEditorItemId",field,newValue);
    },
    onCityNameComboBoxEditorItemIdChange: function(field, newValue, oldValue, eOpts) {
        var me=this;
        CityDirect.cityAutoComplete(me,newValue,'CityNameComboStore',field);
    },
    onReferringPhysicianNameComboBoxEditorItemIdChange: function(field, newValue, oldValue, eOpts) {
        var me=this;
        ReferringPhysicianDirect.referringPhysicianDirectAutoComplete(me,newValue,'ReferringPhysicianNameComboStore',field);

    },
    onPatientSocialNumberTextFieldItemIdChange: function(field, newValue, oldValue, eOpts) {

        if(newValue.length==13){
            var secuKey=97 - ( ( parseInt(newValue) ) % 97 );
            this.getView().down('#patientSocialKey').setValue(secuKey);
        }
    },
    onSaveFormBtnItemIdClick: function(button, e, eOpts) {

        var me=this;

        me.patientFormSave(button);


    },
    patientFormSave: function(button) {
        var me=this;
        var rec=me.getView().getRecord();
        var form=me.getView();
        form.updateRecord(rec); // update the record with the form data
        if(!rec.get('patientId')){
            var patientId=UUID();
            rec.set('patientId',patientId);
        }
        var dataToSave=rec.data;
        Utility.loading.start(button);
        PatientDirect.savePatient(dataToSave)
            .then(function()
            {
                Utility.loading.end(button);
            })
            .catch(function(_err)
            {
                console.error(_err);
                Ext.Msg.alert('Error', 'Le patient n\'a pas été enregistrer correctement');
            });
    }




});
