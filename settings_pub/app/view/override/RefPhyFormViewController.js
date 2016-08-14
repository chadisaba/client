Ext.define('MyApp.view.override.RefPhyFormViewController', {
    override: 'MyApp.view.RefPhyFormViewController',

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
        me.getViewModel().getStore('ReferringPhysicianTitleComboStore').loadData(ComboData.title);
        me.getViewModel().getStore('ReferringPhysicianGenderComboStore').loadData(ComboData.gender);
        if(formId)
        {
            var filtersArray=[
                {
                    name:'referringPhysicianId',value:_formId
                }
            ];
            // we retreive the record by id from the database

            var mainTableObject={
                tableName:'REFERRING_PHYSICIAN',
                filters:filtersArray
            };
            var joinTablesArray=[];
            joinTablesArray.push({
                tableName:'city',
                required:false,
                fields:['cityName']
            });

            CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray).
            then(function(_result)
            {
                if(_result[0].cityId) {
                    var cityData = [];
                    cityData.push({
                        cityId: _result[0].cityId,
                        cityName: _result[0]['City.cityName']
                    });
                  //  _result[0]['cityName']= _result[0]['City.cityName'];
                    viewModel.getStore('CityNameComboStore').loadData(cityData);
                }


                rec=Ext.create('MyApp.model.RefPhyModel',_result[0]);
                view.loadRecord(rec);
                if(view.getPlugin('formediting'))
                     me.enterEditMode();

            }) .catch(function(_err)
            {
                console.error(_err);
            });
        }
        else
        {
            // we create a new record
            rec=Ext.create('MyApp.model.RefPhyModel');
            rec.set('referringPhysicianId',UUID());
            view.loadRecord(rec);
            if(view.getPlugin('formediting'))
                 me.enterEditMode();
        }
    },

    enterEditMode: function() {
        this.getView().getPlugin('formediting').enterEditMode(this.getView());
    },

    quitEditMode: function() {
        this.fireViewEvent('quitFormEvent');
    },
    onRefPhyFormItemIdInEdit: function(form) {

    },

    saveForm:function(comment){
        var me=this;
        var promise=new Promise(
            function(resolve, reject) {
                var form=me.getView();
                var rec=form.getRecord();
                form.updateRecord(rec); // update the record with the form
                var dataToSave=rec.data;
                CommonDirect.saveData(dataToSave,'REFERRING_PHYSICIAN',comment)
                    .then(function(_result)
                    {
                        resolve(_result);
                    });

             });
         return promise;
    },
    onRefPhyFormItemIdSaveEdit: function(form, promptWin, comment) {
        var me=this;
        me.saveForm(comment)
            .then(function(_result)
            {
                if(promptWin.isButton)
                    Utility.loading.end(promptWin);
                    else
                    promptWin.close();

                me.quitEditMode();
            })
            .catch(function(_err)
            {
                console.error(_err);
                Ext.Msg.alert('Error', translate('saveError'));
            });
    },

    onRefPhyZipCodeChange: function(field, newValue, oldValue, eOpts) {
        Utility.form.fillCityFromZipCode(this,"CityNameComboStore","cityNameComboBoxEditorItemId",field,newValue);
    },

    onRefPhyFormItemIdResetEdit: function(form, promptWin) {

    },

    onRefPhyFormItemIdChHist: function(button) {

    },

    onRefPhyFormItemIdQuitEdit: function(form, promptWin) {

        this.quitEditMode();
    }

});