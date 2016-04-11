Ext.define('MyApp.view.override.PatientDetailSearchFormViewController', {
    override: 'MyApp.view.PatientDetailSearchFormViewController',
     onPatientSearchBtnItemIdClick: function(button, e, eOpts) {

         var me=this;
         var patientSearchStore=me.getViewModel().getStore('PatientSearchDetailStore');
         var params;
         var formValuesObject=me.getView().getValues();

         var params={
             tablesArray:['PATIENT','ADDRESS','CITY'],
             keysArray:['addressId','cityId']
         };
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
                     function(res){
                         if(res.success){
                             patientSearchStore.loadData(res.data);
                         }
                         else{
                             console.error(res.msg);

                         }
                     },me);

    },

    onTextfieldSpecialkey: function(field, e, eOpts) {

        if(e.getKey()== e.ENTER)
           this.onPatientSearchBtnItemIdClick()

    }
    
});