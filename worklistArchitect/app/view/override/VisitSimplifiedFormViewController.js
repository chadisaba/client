Ext.define('MyApp.view.override.VisitSimplifiedFormViewController', {
    override: 'MyApp.view.VisitSimplifiedFormViewController',

    initForm: function(_visitId) {
        var me=this;
        var view=me.getView();
        view.down("#studyVisitGridItemId").mask();
        var viewModel=me.getViewModel();
        var visitId=null;
        if(view.visitId)
            visitId=view.visitId;

        if(_visitId)
            visitId=_visitId;

        var visitRec;
        var studyVisitArray=[];


        var p1=CommonDirect.getData("SITE");
        var mainTableObject={
            tableName:"DOCTOR"
        };
        var joinTablesArray=[{
           tableName:"USER"
        }];
        var p2=CommonDirect.getDataWidthJoin(mainTableObject,joinTablesArray);
        Promise.all([p1,p2])
            .then(function(_resultArray)
            {
                if(_resultArray[0].length>0)
                    viewModel.getStore('SiteComboStore').loadData(_resultArray[0]);

                var doctorsDataArray=_resultArray[1];
                for (var i = 0; i < doctorsDataArray.length; i++) {
                    doctorsDataArray[i].userLName=doctorsDataArray[i]['User.userLName'];
                    doctorsDataArray[i].userFName=doctorsDataArray[i]['User.userFName'];
                }
                    viewModel.getStore('DoctorComboStore').loadData(doctorsDataArray);

                if(visitId)
                {
                    VisitDirect.getVisit(visitId)
                        .then(function(_resultValue)
                        {
                            visitRec=Ext.create('MyApp.model.VisitModel',_resultValue);
                            var studyVisitFilters=[{
                                name:"visitId",value:_visitId
                            }];
                            view.down('#studyVisitGridItemId').getController().initGrid(studyVisitFilters);
                        });
                }
                else
                {
                    // we create a new patient
                    var visitRec=Ext.create('MyApp.model.VisitModel');
                    view.loadRecord(visitRec);
                    view.down('#studyVisitGridItemId').getController().initGrid();

                    view.down('#studyVisitGridItemId').getPlugin('gridediting').lockGrid(false);
                }
            });
    },
    visitFormSave: function(button) {
        var me=this;
        var rec=me.getView().getRecord();
        var form=me.getView();
        form.updateRecord(rec); // update the record with the form data
        if(!rec.get('visitId')){
            var visitId=UUID();
            rec.set('visitId',visitId);
        }
        var dataToSave=rec.data;
        if(button)
             Utility.loading.start(button);

        VisitDirect.saveVisit(dataToSave)
            .then(function()
            {
                if(button)
                    Utility.loading.end(button);
            })
            .catch(function(_err)
            {
                console.error(_err);
                Ext.Msg.alert('Error', translate('saveError'));
            });
    },
    onVisitSimplifiedFormItemIdAfterRender: function(component, eOpts) {

        this.initForm();
    },


    onVisitSimplifiedFormItemIdSaveEdit: function(form, promptWin, comment) {

    },


    onVisitSimplifiedFormItemIdChHist: function(button) {

    },

    onVisitSimplifiedFormItemIdQuitEdit: function(form, promptWin) {

    },

    onDoctorComboBoxItemIdChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            this.getView().down("#studyVisitGridItemId").unmask();
            this.getView().down("#studyVisitGridItemId").getController().setDoctorId(newValue);
        }
        else
            this.getView().down("#studyVisitGridItemId").mask()

    }



});