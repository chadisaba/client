Ext.define('MyApp.view.override.PatientFormViewController', {
    override: 'MyApp.view.PatientFormViewController',


    initForm: function(button, win, close) {

        var me=this;

        var view=me.getView();
        var viewModel=me.getViewModel();
        var patientId=null;
        var visitId=null;
        if(view.patientId)
            patientId=view.patientId;


        var patientTitleComboStore=viewModel.getStore('PatientTitleComboStore');
        patientTitleComboStore.loadData(ComboData.patientTitle);

        if(visitId)
        {

        }
        else if(patientId)
        {



                    var mainTableObject={};
                    mainTableObject.tableName='PATIENT';
                    mainTableObject.filters=[{name:'patientId',value:patientId}];
                    var joinTablesArray=[];
                    joinTablesArray.push({
                        tableName:'City',
                        required:false,
                        fields:['cityName']
                    },{tableName:'ReferringPhysician',
                        required:false,
                        fields:['referringPhysicianName']
                    });

                    var params = {
                        mainTableObject: mainTableObject,
                        joinTablesArray: joinTablesArray

                    };
                    Server.CommonQueries.readJoin(params,
                        function (res) {
                            if (res.success) {

                                if(res.data.length>0)
                                {
                                    if(res.data[0].cityId){
                                        var cityData=[];
                                        cityData.push({
                                            cityId:res.data[0].cityId,
                                            cityName:res.data[0]['City.cityName']
                                        });
                                        viewModel.getStore('CityNameComboStore').loadData(cityData);
                                    }
                                    if(res.data[0].referringPhysicianId){
                                        var ReferringPhysicianData=[];
                                        ReferringPhysicianData.push({
                                            referringPhysicianId:res.data[0].referringPhysicianId,
                                            referringPhysicianName:res.data[0]['ReferringPhysician.referringPhysicianSearch']
                                        });
                                        viewModel.getStore('ReferringPhysicianNameComboStore').loadData(ReferringPhysicianData);
                                    }
                                    var rec=Ext.create('MyApp.model.PatientModel',res.data[0]);
                                    view.loadRecord(rec);
                                    view.getPlugin('formediting').enterEditMode(view);
                                }
                                else{
                                    console.error('PatientForm : the patientId is mandatory');
                                }
                            }
                            else {
                                console.error(res.msg);
                            }
                        }, me);
        }
        else
        {
            // we create a new patient
            var rec=Ext.create('MyApp.model.PatientModel');
            view.loadRecord(rec);
        }

    },




    onPatientFormItemIdAfterRender: function(component, eOpts) {
    	//component.getPlugin('formediting').quitEditMode();
        this.initForm();
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
    onSaveFormBtnItemIdClick: function(button, e, eOpts) {

        var me=this;

        var rec=me.getView().getRecord();
        var form=me.getView();
        form.updateRecord(rec); // update the record with the form data

        if(!rec.patientId){
            var patientId=UUID();
            rec.set('patientId',patientId);
        }

        var dataToSave=rec.data;

       // Utility.loading.start(button);

        var params={};
        params.table="PATIENT";
        dataToSave.patientSearch=dataToSave.patientLName.toUpperCase()+" "+stringUtil.formatFName(dataToSave.patientFname);

        params.dataToBeSaved=dataToSave;

        Server.CommonQueries.createRecord(params,
            function(_result){
                if(_result.success){
                   // Utility.loading.end(button);
                }
                else{
                    console.error(_result.msg);
                    Ext.MessageBox.alert("Error","save Error "+_result.msg);
                   // Utility.loading.end(button);
                }
            },me
        );

    }




});