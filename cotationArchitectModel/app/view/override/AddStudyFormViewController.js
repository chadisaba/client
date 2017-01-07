Ext.define('MyApp.view.override.AddStudyFormViewController', {
    override: 'MyApp.view.AddStudyFormViewController',

    initForm: function(_visitId,_replacedStudyVisitId,_studyId) {



        if(!_visitId)
            throw Error('_visitId can\'t be undefined');
        var me=this;
        me.visiteId=_visitId;


        me.studyId=_studyId;
        me.replacedStudyVisitId=_replacedStudyVisitId;

        var view=me.getView();


        var viewModel=me.getViewModel();
        var visitId=null;

        var p1=CommonDirect.getData("SITE");
        var mainTableObject={
            tableName:"DOCTOR"
        };
        var joinTablesArray=[{
            tableName:"USER"
        }];

        var studyVisitRec=Ext.create('MyApp.model.StudyVisitModel');

        studyVisitRec.set('studyVisitId',UUID());

        studyVisitRec.set('visitId',_visitId);
        //   studyVisitRec.set('deviceId',1);
        //    studyVisitRec.set('studyId',3);
        studyVisitRec.set('userId',1);

// var rec=view.getRecord();
        //   visitRec.set('siteId',parseInt(window.localStorage.getItem('smartmed-siteId')));// TODO select the user site besides the  the first site

        view.loadRecord(studyVisitRec);

    },

    onTechnicianComboboxItemIdChange: function(field, newValue, oldValue, eOpts) {

    },

    onDeviceComboboxItemIdSelect: function(combo, record, eOpts) {

    },


    onStudyComboboxItemIdChange: function(field, newValue, oldValue, eOpts) {

        //   StudyDirect.docHasstudyAutoComplete(this, newValue, "StudyComboStore", field, true, 3, this.doctorId);

        StudyDirect.docHasstudyAutoComplete(this, newValue, "StudyComboStore", field, true, 3,1);



    },

    onStudyComboboxItemIdSelect: function(combo, record, eOpts) {


        var me = this;
        var deviceStore = me.getViewModel().getStore('DeviceComboStore');
        deviceStore.removeAll();
        DeviceDirect.getDeviceBySiteAndStudy(record.get('studyId'), 1, true)
            .then(function (_resultArray) {
                if (_resultArray.length > 0) {
                    deviceStore.loadData(_resultArray);
                    var deviceCombo = me.getView().down('#deviceComboboxItemId');
                    var selectedDevice = deviceStore.first();
                    deviceCombo.select(selectedDevice);

                }

            })

    },
    onAddStudyButtonClick: function(button, e, eOpts) {
        this.visitAndeActeFormSave(button);

    },


    visitAndeActeFormSave: function(button) {

        var me=this;
        var form=me.getView();
        var rec=form.getRecord();

        console.log(rec);
        form.updateRecord(rec); // update the record with the form

        var dataToSave=rec.data;
        dataToSave.replacedStudyId=me.studyId;
        dataToSave.replacedStudyVisitId=me.replacedStudyVisitId;

        /*
         dataToSave.visitId="dd2826d3-7791-48cc-a116-335c41b9723c";
         dataToSave.studyId=3;
         dataToSave.deviceId=1;
         dataToSave.userId=1;
         dataToSave.studyVisitId=UUID();*/
        //  var visitRec=Ext.create('MyApp.model.VisitModel');

        VisitDirect.saveStudyVisitAndActe(dataToSave)
            .then(function(_result)
            {
                me.fireViewEvent('quitFormEvent');
            })
            .catch(function(_err)
            {
                console.error(_err);
            })

    }

});