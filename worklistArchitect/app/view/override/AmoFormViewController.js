Ext.define('MyApp.view.override.AmoFormViewController', {
    override: 'MyApp.view.AmoFormViewController',



    initForm: function(_visitId,_patientId) {

        var me=this;
        var view=me.getView();
        // var rec=view.getRecord();
        if(!_patientId)
            throw Error('_patientId can\'t be undefined');
        //rec.set('patientId',_patientId);

        me.getViewModel().getStore('TypeAssStore').loadData(ComboData.typeAssurance);
        me.getViewModel().getStore('PecStore').loadData(ComboData.pec);

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
                            me.originalValues=view.getValues();
                            studyVisitController.initGrid([],true,_visitId);
                            studyVisitGridView.getPlugin('gridediting').lockGrid(false);


                            visitRefPhGridController.initGrid([],true,_visitId);
                            visitRefPhGridView.getPlugin('gridediting').lockGrid(false);

                            view.getPlugin('formcheckdirty').addFieldsChangeListener();
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
                    me.originalValues= {visitId:visitRec.get('patientId')};
                    studyVisitController.initGrid();
                    studyVisitGridView.getPlugin('gridediting').lockGrid(false);

                    visitRefPhGridController.initGrid();
                    visitRefPhGridView.getPlugin('gridediting').lockGrid(false);
                    view.getPlugin('formcheckdirty').addFieldsChangeListener();
                }
            });

    },
    amoFormSave: function() {
        var me=this;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var    currentValues = me.getView().getValues();
                // check if the form values have been changed
                if(JSON.stringify(me.originalValues) == JSON.stringify(currentValues)){
                    // Ext.MessageBox.alert(translate('Info'),translate('no change on the form'));
                    resolve();
                }
                else
                {
                    var rec=me.getView().getRecord();
                    var form=me.getView();
                    form.updateRecord(rec); // update the record with the form data
                    var dataToSave=rec.data;
                    PatientDirect.savePatient(dataToSave)
                        .then(function()
                        {
                            resolve();
                        });
                }

            });
        return promise;
    },
    onTypeAssComboChange: function(field, newValue, oldValue, eOpts) {

    },

    onPecComboChange: function(field, newValue, oldValue, eOpts) {

    }

});