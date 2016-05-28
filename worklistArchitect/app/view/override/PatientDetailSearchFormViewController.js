Ext.define('MyApp.view.override.PatientDetailSearchFormViewController', {
    override: 'MyApp.view.PatientDetailSearchFormViewController',

     onPatientSearchBtnItemIdClick: function(button, e, eOpts) {

         var view=this.getView();
         Utility.loading.start(view);

         view.down('#nouveauPatientBtnItemId').setDisabled(true);
         view.down('#accueilPatientBtnItemId').setDisabled(true);
         view.down('#historiquePatientBtnItemId').setDisabled(true);

         var me=this;
         var mainTableObject={};
         mainTableObject.tableName='PATIENT';
         var joinTablesArray=[];
         joinTablesArray.push({tableName:'CITY',
             required:false,
             fieldsArray:[
                 'cityName'
             ]
         });

         var params = {
             mainTableObject: mainTableObject,
             joinTablesArray: joinTablesArray
         };

         var patientSearchStore=me.getViewModel().getStore('PatientSearchDetailStore');
         var formValuesObject=view.getValues();

         params.filters=[];
         if(formValuesObject.patientLName)
             params.filters.push({name:"patientLName",value:formValuesObject.patientLName,startBy:true});
         if(formValuesObject.patientFname)
             params.filters.push({name:"patientFname",value:formValuesObject.patientFname,startBy:true});
         if(formValuesObject.patientBirthday)
             params.filters.push({name:"patientBirthday",value:formValuesObject.patientBirthday});
         if(formValuesObject.patientSocialNumber)
             params.filters.push({name:"patientSocialNumber",value:formValuesObject.patientSocialNumber});
         if(formValuesObject.patientSocialKey)
             params.filters.push({name:"patientSocialKey",value:formValuesObject.patientSocialKey});


         Server.CommonQueries.readJoin(params,
             function (res) {
                 if (res.success) {
                     for (var i = 0; i < res.data.length; i++) {
                         res.data[i].cityName=res.data[i]['City.cityName'];
                     }
                     patientSearchStore.loadData(res.data);
                     view.down('#nouveauPatientBtnItemId').setDisabled(false);
                     Utility.loading.end(view);
                 }
                 else {
                     console.error(res.msg);
                     Utility.loading.end(view);
                 }
             }, me);
    },

    onTextfieldSpecialkey: function(field, e, eOpts) {

        if(e.getKey()== e.ENTER)
           this.onPatientSearchBtnItemIdClick()

    },
    onDatefieldSpecialkey: function(field, e, eOpts) {
        if(e.getKey()== e.ENTER)
            this.onPatientSearchBtnItemIdClick();
    },
    onPatientSearchGridItemIdItemDblClick: function(dataview, record, item, index, e, eOpts) {


        /*Ext.create('Common.ux.window.FullScreenWindow', {

            // animateTarget:'comboSearchPatient',
            title:"Historique du patient "+record.get('patientLName')+" "+record.get('patientFname'),
            items:{
                region: 'center',
                xtype:'patienthistorytabpanel',
                patientId:record.get('patientId')
            }
        }).show();*/
        Ext.create('Common.ux.window.FullScreenWindow', {

            // animateTarget:'comboSearchPatient',
            title:"Accueil de"+record.get('patientLName')+ " "+record.get('patientFname'),
            items:{
                region: 'center',
                xtype:'patientreceivepanel',
                patientId:record.get('patientId')

                /*plugins:[
                    new Plugins.form.FormEditingPlugin({
                    withValidation: false,
                    showConfirmationOnSave: true
                })]*/
            }
        }).show();

    },
    onPatientSearchGridItemIdSelectionChange: function(model, selected, eOpts) {
        var view=this.getView();
        view.down('#accueilPatientBtnItemId').setDisabled(false);
        view.down('#historiquePatientBtnItemId').setDisabled(false);

    },
    onNouveauPatientBtnItemIdClick: function(button, e, eOpts) {

        Ext.create('Common.ux.window.FullScreenWindow', {

            // animateTarget:'comboSearchPatient',
            title:"Informations du patient",
            items:{
                region: 'center',
                xtype:'patientreceivepanel'

                /*plugins:[
                    new Plugins.form.FormEditingPlugin({
                    withValidation: false,
                    showConfirmationOnSave: true
                })]*/
            }
        }).show();
    },

    onAccueilPatientBtnItemIdClick: function(button, e, eOpts) {

var me=this;
var grid=me.getView().down('#PatientSearchGridItemId');

Ext.create('Common.ux.window.FullScreenWindow', {

            // animateTarget:'comboSearchPatient',
            title:"Informations du patient",
            items:{
                region: 'center',
                xtype:'patientreceivepanel'


                /*plugins:[
                    new Plugins.form.FormEditingPlugin({
                    withValidation: false,
                    showConfirmationOnSave: true
                })]*/
            }
        }).show();
    },

    onHistoriquePatientBtnItemIdClick: function(button, e, eOpts) {

    },
    onFichePatientBtnItemIdClick: function(button, e, eOpts) {

    }

    
});
