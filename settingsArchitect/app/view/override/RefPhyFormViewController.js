Ext.define('MyApp.view.override.RefPhyFormViewController', {
    override: 'MyApp.view.RefPhyFormViewController',

    initForm: function(_formId) {
        var me=this;
        var view=me.getView();
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
                if(_result.cityId) {
                    var cityData = [];
                    cityData.push({
                        cityId: _result[0].cityId,
                        cityName: _result[0]['City.cityName']
                    });

                    viewModel.getStore('CityNameComboStore').loadData(cityData);
                }


                    rec=Ext.create('MyApp.model.RefPhyModel',_result[0]);
                if(cityData)
                    viewModel.getStore('CityNameComboStore').loadData(cityData);


                view.loadRecord(rec);
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

    onRefPhyFormItemIdSaveEdit: function(form, promptWin, comment) {

        var me=this;

        var form=me.getView();
        var rec=form.getRecord();
        form.updateRecord(rec); // update the record with the form
        var dataToSave=rec.data;
            CommonDirect.saveData(dataToSave,'REFERRING_PHYSICIAN',"")
                .then(function(_result)
                {
                    Utility.loading.end(saveBtn);
                    me.quitEditMode();
                })
                .catch(function(_err)
                {
                    console.error(_err.msg);
                    Ext.MessageBox.alert("Error","save Error "+_err.msg);
                });
    },

    onRefPhyFormItemIdResetEdit: function(form, promptWin) {

    },

    onRefPhyFormItemIdChHist: function(button) {

    },

    onRefPhyFormItemIdQuitEdit: function(form, promptWin) {

        this.quitEditMode();
    }

});