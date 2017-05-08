Ext.define('MyApp.view.override.AppointmentFormViewController', {
    override: 'MyApp.view.AppointmentFormViewController',

    initForm: function(button, win, close) {
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
            
            var patientNameComboStore=this.getViewModel().getStore('PatientNameComboStore');
            CommonDirect.getData("xxTableName",filtersArray)
            .then(function (_resultArray) {
             me.getViewModel().getStore('PatientNameComboStore').loadData(_resultArray);
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

    onAppointmentFormItemIdInEdit: function(form) {

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
    
    onAppointmentFormItemIdSaveEdit: function(form, promptWin, comment) {
    	  var me=this;
          me.saveForm(comment)
              .then(function(_result)
              {
                  if(promptWin.isButton)
                      Utility.loading.end(promptWin);
                      else
                      promptWin.close();

                  me.quitEditMode();
                  me.fireViewEvent('formSavedEvent');
              })
              .catch(function(_err)
              {
                  console.error(_err);
                  Ext.Msg.alert('Error', translate('saveError'));
              });  
    },

    onAppointmentFormItemIdResetEdit: function(form, promptWin) {

    },

    onAppointmentFormItemIdChHist: function(button) {

    },

    onAppointmentFormItemIdQuitEdit: function(form, promptWin) {
    	this.quitEditMode();
    }

});