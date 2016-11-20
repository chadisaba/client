Ext.define('MyApp.view.override.VisitFormViewController', {
    override: 'MyApp.view.VisitFormViewController',

    initForm: function(_visitId,_patientId) {

        var me=this;
        var view=me.getView();
        // var rec=view.getRecord();
        if(!_patientId)
            throw Error('_patientId can\'t be undefined');
        //rec.set('patientId',_patientId);

        var studyVisitGridView = view.down('#studyVisitGridItemId');
        var studyVisitController = studyVisitGridView.getController();

        var visitRefPhGridView=view.down('#visitRefPhGridId');
        var visitRefPhGridController = visitRefPhGridView.getController();

        studyVisitGridView.mask();
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
                    doctorsDataArray[i].userInitiales=doctorsDataArray[i]['User.userInitiales'];

                }
                var doctorStore = viewModel.getStore('DoctorComboStore');
                doctorStore.loadData(doctorsDataArray);

                var visitRec=Ext.create('MyApp.model.VisitModel');
                if(visitId)
                {
                    CommonDirect.getDataById("visitId",visitId,'VISIT')
                        .then(function(_resultValue)
                        {
                            var timeArray=_resultValue[0]['visitTime'].split(":");
                            _resultValue[0].visitTime=timeArray[0]+":"+timeArray[1];
                            var visitRec=new MyApp.model.VisitModel(_resultValue[0]);

                            view.loadRecord(visitRec);

                            studyVisitController.initGrid([],true,_visitId);
                            studyVisitGridView.getPlugin('gridediting').lockGrid(false);


                            visitRefPhGridController.initGrid([],true,_visitId);
                          visitRefPhGridView.getPlugin('gridediting').lockGrid(false);

                            view.getPlugin('formcheckdirty').addFieldsCnangeListener();
                        });
                }

                else
                {
                    // we create a new visit

                    visitRec.set('visitId',UUID());
                    visitRec.set('visitDate',new Date());
                    visitRec.set('visitTime',new Date());
                    visitRec.set('siteId',parseInt(window.localStorage.getItem('smartmed-siteId')));// TODO select the user site besides the  the first site

                    visitRec.set('patientId',_patientId);

                    visitRec.set('doctorId',doctorStore.first().get('doctorId'));// select the first doctor
                    view.loadRecord(visitRec);

                    studyVisitController.initGrid();
                    studyVisitGridView.getPlugin('gridediting').lockGrid(false);

                    visitRefPhGridController.initGrid();
                    visitRefPhGridView.getPlugin('gridediting').lockGrid(false);
                    view.getPlugin('formcheckdirty').addFieldsCnangeListener();
                }
            });

    },

    enterEditMode: function(form) {

    },

    quitEditMode: function(form, promptWin) {

    },

    onVisitFormItemIdInEdit: function(form) {

    },
    visitFormSave: function(button){
        var me=this;
        //Creating a promise
        return new Promise(
            function(resolve, reject) {
                var form=me.getView();
                var rec=form.getRecord();
                form.updateRecord(rec); // update the record with the formvisitFormSave
                var dataToSave=rec.data;
                var visitTimeHour=dataToSave.visitTime.getHours();
                var visitTimeMinutes=dataToSave.visitTime.getMinutes();
                dataToSave.visitTime=visitTimeHour+":"+visitTimeMinutes;

                var studyVisitCtr = me.getStudyVisitGrid().getController();
                var studyVisitDataToBeSaved=studyVisitCtr.getDataToBeSaved();
                studyVisitDataToBeSaved.forEach(
                    function(_item)
                    {
                        _item.visitId=rec.get('visitId');
                    });
                var studiesArray=studyVisitCtr.getStudiesArray();

                var worklistDoctor=form.down("#doctorComboBoxEditorItemId").getSelection().get('userInitiales');
                VisitDirect.saveVisitAndStudyVisit(dataToSave,studyVisitDataToBeSaved,studiesArray,worklistDoctor)
                    .then(function(_result)
                    {
                        resolve();
                    })
                    .catch(function(_err)
                    {
                        console.error(_err);
                        reject();
                    });
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
    onVisitFormItemIdSaveEdit: function(form, promptWin, comment) {

    },

    onVisitFormItemIdResetEdit: function(form, promptWin) {

    },

    onVisitFormItemIdChHist: function(button) {

    },

    onVisitFormItemIdQuitEdit: function(form, promptWin) {

    },
    onDoctorComboBoxEditorItemIdChange: function(field, newValue, oldValue, eOpts) {
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