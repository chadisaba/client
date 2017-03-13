Ext.define('MyApp.view.override.PaymentFormViewController', {
    override: 'MyApp.view.PaymentFormViewController',

    onPaymentFormItemIdBoxReady: function(component, width, height, eOpts) {
        translateUtil.transForm(component);

    },
    
    initForm: function(_formId) {
        var me=this;
        var view=me.getView();
        if(view.getPlugin('formediting'))
            view.getPlugin('formediting').quitEditMode();
        
        var viewModel=me.getViewModel();
        var formId=null;
        if(_formId)
            formId=_formId;

        var rec;
        
        
            filtersArray=[{
            name:"",
            value:""
            }];// if you filters are not nedded delete the filtersArray
            
            var paymentMethodCodeComboStore=this.getViewModel().getStore('PaymentMethodCodeComboStore');
            CommonDirect.getData("xxTableName",filtersArray)
            .then(function (_resultArray) {
             me.getViewModel().getStore('PaymentMethodCodeComboStore').loadData(_resultArray);
             });
        filtersArray=[{
            name:"",
            value:""
            }];// if you filters are not nedded delete the filtersArray
            
            var cashBoxCodeComboStore=this.getViewModel().getStore('CashBoxCodeComboStore');
            CommonDirect.getData("xxTableName",filtersArray)
            .then(function (_resultArray) {
             me.getViewModel().getStore('CashBoxCodeComboStore').loadData(_resultArray);
             });
        
        
       // TODO change patientId by the id Name ,tableName by the table name
        if(formId)
        {
            var filtersArray=[
                {
                    patientId:_formId
                }
            ];
            // we retreive the record by id from the database
            CommonDirect.getData('tableName',filtersArray).
                then (function(_result)
            {
                //TODO change PatientModel
                 rec=Ext.create('MyApp.model.PatientModel',_result[0]);
                 view.loadRecord(rec);
                 if(view.getPlugin('formediting'))
                	 me.enterEditMode();

            })
        }
        else
        {
            // we create a new record
            // TODO change PatientModel

             rec=Ext.create('MyApp.model.PatientModel');
            rec.set('patientId',UUID());
            rec.set('active',true);
            view.loadRecord(rec);
            if(view.getPlugin('formediting'))
            	me.enterEditMode();

        }
       


    },

    enterEditMode: function(form) {
    	this.getView().getPlugin('formediting').enterEditMode(this.getView());
    },

    quitEditMode: function(form, promptWin) {
    	this.fireViewEvent('quitFormEvent');
    },

    onPaymentFormItemIdInEdit: function(form) {

    },

    saveForm:function(comment){
        var me=this;
        var promise=new Promise(
            function(resolve, reject) {
                var form=me.getView();
                var rec=form.getRecord();
                form.updateRecord(rec); // update the record with the form
                var dataToSave=rec.data;
                // TODO : change the table name
                CommonDirect.saveData(dataToSave,'tableName',comment)
                    .then(function(_result)
                    {
                        resolve(_result);
                    });

             });
         return promise;
    },
    
    onPaymentFormItemIdSaveEdit: function(form, promptWin, comment) {
    	  var me=this;
          me.saveForm(comment)
              .then(function(_result)
              {
                  if(promptWin.isButton)
                      Utility.loading.end(promptWin);
                      else
                      promptWin.close();

                  me.fireViewEvent('formSavedEvent',form.getRecord());
                  me.quitEditMode();
                  
              })
              .catch(function(_err)
              {
                  console.error(_err);
                  Ext.Msg.alert('Error', translate('saveError'));
              });  
    },r

    onPaymentFormItemIdResetEdit: function(form, promptWin) {

    },

    onPaymentFormItemIdChHist: function(button) {

    },

    onPaymentFormItemIdQuitEdit: function(form, promptWin) {
    	this.quitEditMode();
    }

});