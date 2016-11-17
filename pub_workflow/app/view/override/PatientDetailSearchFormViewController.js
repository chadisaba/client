Ext.define('MyApp.view.override.PatientDetailSearchFormViewController', {
    override: 'MyApp.view.PatientDetailSearchFormViewController',

     onPatientSearchBtnItemIdClick: function(button, e, eOpts) {

         var me=this;
         var view=me.getView();
         Utility.loading.start(view);

         view.down('#nouveauPatientBtnItemId').setDisabled(true);
         view.down('#accueilPatientBtnItemId').setDisabled(true);
         view.down('#historiquePatientBtnItemId').setDisabled(true);
         var patientSearchStore=me.getViewModel().getStore('PatientSearchDetailStore');
         var formValuesObject=view.getValues();

         var mainTableObject={};
         mainTableObject.tableName='PATIENT';
         var mainFilters=[];
         if(formValuesObject.patientLName)
             mainFilters.push({name:"patientLName",value:formValuesObject.patientLName,startBy:true});
         if(formValuesObject.patientFname)
             mainFilters.push({name:"patientFname",value:formValuesObject.patientFname,startBy:true});
         if(formValuesObject.patientBirthday)
             mainFilters.push({name:"patientBirthday",value:formValuesObject.patientBirthday});
         if(formValuesObject.patientSocialNumber)
             mainFilters.push({name:"patientSocialNumber",value:formValuesObject.patientSocialNumber});
         if(formValuesObject.patientSocialKey)
             mainFilters.push({name:"patientSocialKey",value:formValuesObject.patientSocialKey});


         var mainTableObject={
             tableName:'PATIENT',
             filters:mainFilters
         };
         var joinTablesArray=[];
         joinTablesArray.push({tableName:'CITY',
             required:false,
             fieldsArray:[
                 'cityName'
             ]
         });

         CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray)
             .then(function(_result)
             {
                 for (var i = 0; i < _result.length; i++) {
                     _result[i].cityName=_result[i]['City.cityName'];
                 }
                 patientSearchStore.loadData(_result);
                 view.down('#nouveauPatientBtnItemId').setDisabled(false);
                 Utility.loading.end(view);
             }

         )
             .catch(function(_err)
             {
                 console.error(_err);
                 Utility.loading.end(view);
             });
    },

    onTextfieldSpecialkey: function(field, e, eOpts) {

        if(e.getKey()== e.ENTER)
           this.onPatientSearchBtnItemIdClick()

    },
    onDatefieldSpecialkey: function(field, e, eOpts) {
        if(e.getKey()== e.ENTER)
            this.onPatientSearchBtnItemIdClick();
    },

    receiveExistingPatient:function(record)
    {
        var me=this;
        Ext.create('Common.ux.window.FullScreenWindow', {

            title:translate("recieving")+" "+record.get('patientLName')+ " "+record.get('patientFname'),
            items:{
                region: 'center',
                xtype:'accueilpatientpanel',
                patientId:record.get('patientId'),
                header:false
                /*plugins:[
                 new Plugins.form.FormEditingPlugin({
                 withValidation: false,
                 showConfirmationOnSave: true
                 })]*/
            },
            listeners:{
                afterrender:function(_comp)
                {
                    me.getView().up('#searchPatientWindowItemId').close();
                }
            }
        }).show();
    },
    onPatientSearchGridItemIdItemDblClick: function(dataview, record, item, index, e, eOpts) {

     this.receiveExistingPatient(record);

    },
    onPatientSearchGridItemIdSelectionChange: function(model, selected, eOpts) {
        var view=this.getView();
        view.down('#accueilPatientBtnItemId').setDisabled(false);
        view.down('#historiquePatientBtnItemId').setDisabled(false);

    },
    onNouveauPatientBtnItemIdClick: function(button, e, eOpts) {

        var me=this;
        Ext.create('Common.ux.window.FullScreenWindow',{
            // animateTarget:'comboSearchPatient',
            title:translate('patientInformations'),//"Informations du patient",
            items:{
                region: 'center',
                xtype:'patientreceivepanel'
                /*plugins:[
                    new Plugins.form.FormEditingPlugin({
                    withValidation: false,
                    showConfirmationOnSave: true
                })]*/
            },
            listeners:{
                afterrender:function(_comp)
                {
                    me.getView().up('#searchPatientWindowItemId').close();
                }
            }
        }).show();
    },
    onAccueilPatientBtnItemIdClick: function(button, e, eOpts)
    {
        var grid=this.getView().down('#searchGridItemId');
        if(grid.getSelectionModel().hasSelection())
        {
            var selectedRec=grid.getSelectionModel().getSelection()[0];
            this.receiveExistingPatient(selectedRec);
        }

    },

    onHistoriquePatientBtnItemIdClick: function(button, e, eOpts) {

    },
    onFichePatientBtnItemIdClick: function(button, e, eOpts) {

    }

    
});
