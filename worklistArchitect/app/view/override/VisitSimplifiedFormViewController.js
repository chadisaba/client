Ext.define('MyApp.view.override.VisitSimplifiedFormViewController', {
    override: 'MyApp.view.VisitSimplifiedFormViewController',
    initForm: function(_visitId,_patientId) {
        var me=this;
        var view=me.getView();
        // var rec=view.getRecord();
        if(!_patientId)
            throw Error('_patientId can\'t be undefined');
        //rec.set('patientId',_patientId);

        view.down("#studyVisitGridItemId").mask();
        var viewModel=me.getViewModel();
        var visitId=null;
        if(_visitId)
            visitId=_visitId;


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
                {
                    var siteStore = viewModel.getStore('SiteComboStore');
                    siteStore.loadData(_resultArray[0]);
                }

                var doctorsDataArray=_resultArray[1];
                for (var i = 0; i < doctorsDataArray.length; i++) {
                    doctorsDataArray[i].userLName=doctorsDataArray[i]['User.userLName'];
                    doctorsDataArray[i].userFName=doctorsDataArray[i]['User.userFName'];
                }
                var doctorStore = viewModel.getStore('DoctorComboStore');
                doctorStore.loadData(doctorsDataArray);

                if(visitId)
                {
                    CommonDirect.getDataById("visitId",visitId,'VISIT')
                        .then(function(_resultValue)
                        {
                            visitRec=Ext.create('MyApp.model.VisitModel',_resultValue);
                            view.loadRecord(visitRec);
                            var studyVisitFilters=[{
                                name:"visitId",value:_visitId
                            }];
                            view.down('#studyVisitGridItemId').getController().initGrid(studyVisitFilters);
                            view.down('#studyVisitGridItemId').getPlugin('gridediting').lockGrid(false);
                        });
                }
                else
                {
                    // we create a new visit
                    var visitRec=Ext.create('MyApp.model.VisitModel');
                    visitRec.set('visitId',UUID());
                    visitRec.set('visitDate',new Date());
                    visitRec.set('visitTime',new Date());
                    visitRec.set('siteId',parseInt(window.localStorage.getItem('smartmed-siteId')));// TODO select the user site besides the  the first site

                    visitRec.set('patientId',_patientId);

                    visitRec.set('doctorId',doctorStore.first().get('doctorId'));// select the first doctor
                    view.loadRecord(visitRec);

                    view.down('#studyVisitGridItemId').getController().initGrid();

                    view.down('#studyVisitGridItemId').getPlugin('gridediting').lockGrid(false);
                }
            });
    },
    getStudyVisitGrid:function()
    {
        return this.getView().down('#studyVisitGridItemId');
    },
    getVisitId:function()
    {
        return this.getView().getRecord().get('visitId')
    },
    visitFormSave: function(button) {
        var me=this;
        var rec=me.getView().getRecord();
        var form=me.getView();
        form.updateRecord(rec); // update the record with the form
        var dataToSave=rec.data;
        var visitTimeHour=dataToSave.visitTime.getHours();
        var visitTimeMinutes=dataToSave.visitTime.getMinutes();
        dataToSave.visitTime=visitTimeHour+":"+visitTimeMinutes;
        if(button)
            Utility.loading.start(button);

        var studyVisitCtr = me.getStudyVisitGrid().getController();
        var studyVisitDataToBeSaved=studyVisitCtr.getDataToBeSaved();
        studyVisitDataToBeSaved.forEach(
            function(_item)
            {
                _item.visitId=rec.get('visitId');
            });
        var studiesArray=studyVisitCtr.getStudiesArray();
        VisitDirect.saveVisitAndStudyVisit(dataToSave,studyVisitDataToBeSaved,studiesArray)
            .then(function(_result)
            {
                if(button)
                    Utility.loading.end(button);
            })
            /* VisitDirect.saveVisit(dataToSave)
             .then(function()
             {
             var dataToSave=me.getView().down('#studyVisitGridItemId').getController().getDataToBeSaved();

             dataToSave.forEach(
             function(_item)
             {
             _item.visitId=visitId;
             });
             CommonDirect.saveDataArray(dataToSave,"STUDY_VISIT","studyVisitId")
             .then(function(){
             if(button)
             Utility.loading.end(button);
             })

             })*/

            .catch(function(_err)
            {
                console.error(_err);
                Ext.Msg.alert('Error', translate('saveError'));
            });
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
            this.getView().down("#studyVisitGridItemId").mask();

    },
    onSiteIdComboBoxItemIdChange: function(field, newValue, oldValue, eOpts) {
        if(newValue){
            this.getView().down("#studyVisitGridItemId").getController().setSiteId(newValue);
        }
    },
    onStudyVisitGridItemIdStudyVisitGridEndEditEvent: function(gridpanel) {

        this.getView().down("#visitFieldSetItemId").unmask();
        this.fireViewEvent('studyVisitGridEndEditEvent');
    },

    onStudyVisitGridItemIdStudyVisitGridStartEditEvent: function(gridpanel) {
        this.getView().down("#visitFieldSetItemId").mask();
        this.fireViewEvent('studyVisitGridStartEditEvent');
    }



});