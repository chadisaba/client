Ext.define('MyApp.view.override.VisitFormViewController', {
    override: 'MyApp.view.VisitFormViewController',

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
                            var studyVisitController = view.down('#studyVisitGridItemId').getController();
                            studyVisitController.initGrid([],true,_visitId);
                            view.down('#studyVisitGridItemId').getPlugin('gridediting').lockGrid(false);
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

                    view.down('#studyVisitGridItemId').getController().initGrid();

                    view.down('#studyVisitGridItemId').getPlugin('gridediting').lockGrid(false);
                }
            });

    },

    enterEditMode: function(form) {

    },

    quitEditMode: function(form, promptWin) {

    },

    onVisitFormItemIdInEdit: function(form) {

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