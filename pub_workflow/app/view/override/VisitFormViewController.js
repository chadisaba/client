Ext.define('MyApp.view.override.VisitFormViewController', {
    override: 'MyApp.view.VisitFormViewController',

    initForm: function(_visitId,_patientId,_establishmentId,_rdvObject,_ftArray) {

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

        /*** fill combobox stores* ************/
        var PdsStore = viewModel.getStore('VisitPdsComboStore');
        PdsStore.loadData(ComboData.pds);


        var p1=CommonDirect.gethDataFromIndexedDB("SITE");
        var p2=CommonDirect.gethDataFromIndexedDB('DOCTOR');
        var p3=CommonDirect.gethDataFromIndexedDB("ESTABLISHMENT");
        var p4=CommonDirect.gethDataFromIndexedDB("EST_HAS_SERV");
        Promise.all([p1,p2,p3,p4])
            .then(function(_resultArray)
            {
                var siteStore = viewModel.getStore('SiteComboStore');
                siteStore.loadData(_resultArray[0]);

                var doctorStore = viewModel.getStore('DoctorComboStore');
                doctorStore.loadData(_resultArray[1]);

                var etabStore = viewModel.getStore('EstablishmentComboStore');
                etabStore.loadData(_resultArray[2]);

                var estServStore = viewModel.getStore('EstHasServComboStore');
                estServStore.loadData(_resultArray[3]);

                var visitRec=Ext.create('MyApp.model.VisitModel');
                if(_visitId)
                {
                    CommonDirect.getDataById("visitId",_visitId,'VISIT')
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

                    var  visitId=UUID();
                    visitRec.set('visitId',visitId);
                    visitRec.set('visitDate',new Date());
                    visitRec.set('visitTime',new Date());
                    visitRec.set('siteId',parseInt(window.localStorage.getItem('smartmed-siteId')));// TODO select the user site besides the  the first site



                    visitRec.set('doctorId',doctorStore.first().get('doctorId'));// select the first doctor

                    var selectAmo=parseInt(window.localStorage.getItem('smartmed-siteConfigAmoDefault'));
                    var selectAmc=parseInt(window.localStorage.getItem('smartmed-siteConfigAmcDefault'));
                    var pdsMandatory=parseInt(window.localStorage.getItem('smartmed-siteConfigPdsMandatory'));


                    if(selectAmo)
                         visitRec.set('visitIsAmo',true);
                    if(selectAmc)
                        visitRec.set('visitIsAmc',true);


                        var pdsCombo = view.down('#visitPdsComboBoxEditorItemId');
                        pdsCombo.allowBlank=false;
                        pdsCombo.setFieldLabel(pdsCombo.fieldLabel+'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>');



                    // s'il s'agit d'un accueil depuis Hprim ou hl7 l'établissement du patient peut être connu
                    if(_establishmentId)
                        visitRec.set('establishmentId',_establishmentId);

                    // S'il s'agit d'un accueil depuis un RDV
                    if(_rdvObject)
                    {
                        visitRec.set('doctorId',_rdvObject.doctorId);
                        if(_rdvObject.remplacantId)
                             visitRec.set('remplacantId',_rdvObject.remplacantId);

                        studyVisitController.initGrid([],true,_visitId,_rdvObject.studyVisitDataArray);
                        studyVisitGridView.getPlugin('gridediting').lockGrid(false);


                        if(_rdvObject.refPhArray)
                        {
                            visitRefPhGridController.initGrid([],true,_visitId);
                            visitRefPhGridView.getPlugin('gridediting').lockGrid(false);
                        }
                        else
                        {
                            visitRefPhGridController.initGrid([],true,_visitId,_rdvObject.refPhArray);
                            visitRefPhGridView.getPlugin('gridediting').lockGrid(false);
                        }

                    }
                    else
                    {
                        studyVisitController.initGrid();
                        studyVisitGridView.getPlugin('gridediting').lockGrid(false);
                        visitRefPhGridController.initGrid();
                        visitRefPhGridView.getPlugin('gridediting').lockGrid(false);

                    }
                    view.loadRecord(visitRec);
                    me.originalValues= {visitId:visitRec.get('patientId')};
                    view.getPlugin('formcheckdirty').addFieldsChangeListener();
                }
            });

    },

    enterEditMode: function(form) {

    },

    quitEditMode: function(form, promptWin) {

    },

    onVisitFormItemIdInEdit: function(form) {

    },
    visitFormValidate:function()
    {
        var errorMsg='';


    },
    visitFormSave: function(button){
        var me=this;
        //Creating a promise
        return new Promise(
            function(resolve, reject) {
                var form=me.getView();
                var rec=form.getRecord();
                form.updateRecord(rec); // update the record with the formvisitFormSave

                // check if the visit form values have been changed
                var  currentValues = form.getValues();
                if(JSON.stringify(me.originalValues) == JSON.stringify(currentValues)){
                    dataToSave=null;
                }
                else{

                    var dataToSave=rec.data;
                    var visitTimeHour=dataToSave.visitTime.getHours();
                    var visitTimeMinutes=dataToSave.visitTime.getMinutes();
                    dataToSave.visitTime=visitTimeHour+":"+visitTimeMinutes;
                }




                /** getting study visit data to save****/
                var studyVisitCtr = me.getStudyVisitGrid().getController();
                var studyVisitDataToBeSaved=studyVisitCtr.getDataToBeSaved();
                studyVisitDataToBeSaved.forEach(
                    function(_item)
                    {
                        _item.visitId=rec.get('visitId');
                    });
                var studiesArray=studyVisitCtr.getStudiesArray();

                var worklistDoctor=form.down("#doctorComboBoxEditorItemId").getSelection().get('userInitiales');

                /** getting visit referring physician data to save****/
                var visitRefPhCtr = me.getVisitRefPhGrid().getController();
                var visitRefPhDataToBeSaved=visitRefPhCtr.getDataToBeSaved();
                visitRefPhDataToBeSaved.forEach(
                    function(_item)
                    {
                        _item.visitId=rec.get('visitId');
                    });

                var refphArray=visitRefPhCtr.getRefPhArray();

                VisitDirect.saveVisitAndStudyVisitAndRefPh(dataToSave,studyVisitDataToBeSaved,studiesArray,worklistDoctor,
                    visitRefPhDataToBeSaved,
                    refphArray,rec.get('visitId'),rec.get('patientId'),rec.get('siteId'))
                    .then(function(_result)
                    {
                        me.originalValues=me.getView().getValues();
                        // refresh visit referring phycisan grid
                        visitRefPhCtr.initGrid([],true,rec.get('visitId'));
                        // refresh study visit grid
                        studyVisitCtr.initGrid([],true,rec.get('visitId'));
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
    getVisitRefPhGrid:function()
    {
        return this.getView().down('#visitRefPhGridId');
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
    },
    onVisitIsHospitalizedCbItemIdChange: function(field, newValue, oldValue, eOpts)
    {
        var me=this;
        var form=me.getView();
       form.down('#visitHospitVisitNumberItemId').setValue('');
    },
    onVisitPdsComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var me=this;
        me.fireViewEvent('selectPdsEvent',combo.getValue());
    },


});