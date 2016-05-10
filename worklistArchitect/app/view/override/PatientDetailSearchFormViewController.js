Ext.define('MyApp.view.override.PatientDetailSearchFormViewController', {
    override: 'MyApp.view.PatientDetailSearchFormViewController',
     onPatientSearchBtnItemIdClick: function(button, e, eOpts) {

         Utility.loading.start(this.getView())
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
                             Utility.loading.end(this.getView());
                         }
                         else{
                             console.error(res.msg);
                             Utility.loading.end(this.getView());

                         }
                     },me);

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

        Ext.create('Ext.window.Window', {

            title:"Historique du patient "+record.get('patientLName')+" "+record.get('patientFname'),


            layout: {
                type: 'border',
                padding: 5
            },
            tools:[{
                type:'refresh',
                tooltip: 'Refresh form Data',
                // hidden:true,
                handler: function(event, toolEl, panelHeader) {
                    // refresh logic
                }
            },
                {
                    type:'help',
                    tooltip: 'Get Help',
                    callback: function(panel, tool, event) {
                        // show help here
                    }
                }],
            maximizable: true,
            maximized:true,
            height:30,
            width:500,

            /*anim: {
             endOpacity: 1,
             easing: 'easeIn',
             duration: .9
             },*/
            listeners: {
                /* show: function(w){
                 w.getEl().fadeIn(w.anim);
                 w.getEl().shadow.el.fadeIn(w.anim);
                 },*/
                minimize: function (window, opts) {

                    /*  window.collapse();
                     window.setWidth(150);
                     window.alignTo(Ext.getBody(), 'bl-bl');*/
                }
            },
            items:{
                region: 'center',
                xtype:'patienthistorytabpanel',
                patientId:record.get('patientId')

            }
        }).show();
    }

    
});