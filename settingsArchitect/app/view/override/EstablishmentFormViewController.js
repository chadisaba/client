Ext.define('MyApp.view.override.EstablishmentFormViewController', {
    override: 'MyApp.view.EstablishmentFormViewController',

    onEstablishmentFormIdBoxReady: function(component, width, height, eOpts) {
    translateUtil.transForm(component);
        Plugins.form.AddAsterixPlugin.addAsterix(component);

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
        if(formId)
        {
            var filtersArray=[
                {
                    name:'establishmentId',value:_formId
                }
            ];
            // we retreive the record by id from the database

            var mainTableObject={
                tableName:'ESTABLISHMENT',
                filters:filtersArray
            };
            var joinTablesArray=[];
            joinTablesArray.push({
                tableName:'city',
                required:false,
                fields:['cityName']
            });
            // we retreive the record by id from the database
            CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray).
                then (function(_result)
            {
                if(_result[0].cityId) {
                    var cityData = [];
                    cityData.push({
                        cityId: _result[0].cityId,
                        cityName: _result[0]['City.cityName']
                    });

                    viewModel.getStore('CityComboStore').loadData(cityData);
                }
                 rec=Ext.create('MyApp.model.EstablishmentModel',_result[0]);
                me.firstCityLoad=true;
                 view.loadRecord(rec);
                 if(view.getPlugin('formediting'))
                	 me.enterEditMode();
            })
        }
        else
        {
            // we create a new record
             rec=Ext.create('MyApp.model.EstablishmentModel');
            rec.set('establishmentId',UUID());
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

    onEstablishmentFormItemIdInEdit: function(form) {

    },

    saveForm:function(comment){
        var me=this;
        var promise=new Promise(
            function(resolve, reject) {
                var form=me.getView();
                var rec=form.getRecord();
                form.updateRecord(rec); // update the record with the form
                var dataToSave=rec.data;
                CommonDirect.saveData(dataToSave,'ESTABLISHMENT',comment)
                    .then(function(_res)
                    {
                        IndexedDB.updateRecord("ESTABLISHMENT","establishmentId",rec.get('establishmentId'), dataToSave).
                        then(function(_result)
                        {
                            resolve(_result);
                        });

                    });

             });
         return promise;
    },

    onEstablishmentFormItemIdSaveEdit: function(form, promptWin, comment) {
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
    },

    onEstablishmentFormItemIdResetEdit: function(form, promptWin) {

    },

    onEstablishmentFormItemIdChHist: function(button) {

    },

    onEstablishmentFormItemIdQuitEdit: function(form, promptWin) {
    	this.quitEditMode();
    },
    onZipCodeTextFieldChange: function(field, newValue, oldValue, eOpts) {
        if(!this.firstCityLoad)
            Utility.form.fillCityFromZipCode(this,"CityComboStore","cityComboBoxEditorItemId",field,newValue);
        this.firstCityLoad=false;

    }



});