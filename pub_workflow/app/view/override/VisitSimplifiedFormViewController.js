Ext.define('MyApp.view.override.VisitSimplifiedFormViewController', {
    override: 'MyApp.view.VisitSimplifiedFormViewController',

    initForm: function(_visitId,_patientId) {
        var me=this;

        if(!_patientId)
        {
            Ext.Msg.alert('Error', 'PatientId cannot be null');
            return;
        }
        var view=me.getView();
        var viewModel=me.getViewModel();
        var visitId=null;

        if(view.visitId)
            visitId=view.visitId;

        if(_visitId)
            visitId=_visitId;

        var visitRec;
        var studyVisitArray=[];
         if(visitId)
        {
            var p1=VisitDirect.getVisit(visitId);
            var p2=VisitDirect.getStudyVisit(visitId);
            Promise.all([p1,p2])
                .then(function(_valuesArray)
                {
                    visitRec=Ext.create('MyApp.model.VisitModel',_valuesArray[0]);
                    studyVisitArray=_valuesArray[1];
                    viewModel.getStore('StudyVisitStore').loadData(studyVisitArray);
                });
        }
        else
        {
            // we create a new patient
            var visitRec=Ext.create('MyApp.model.VisitModel');
            view.loadRecord(visitRec);
        }

    },
    visitFormSave: function(button) {
        var me=this;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {

                var rec=me.getView().getRecord();
                var form=me.getView();
                form.updateRecord(rec); // update the record with the form data
                rec.set('patientId',me.patientId);
                if(!rec.get('visitId')){
                    var visitId=UUID();
                    rec.set('visitId',visitId);
                }
                var dataToSave=rec.data;
                VisitDirect.saveVisit(dataToSave)
                    .then(function()
                    {
                        resolve();
                    })
             });
         return promise;
    },
    onVisitSimplifiedFormItemIdAfterRender: function(component, eOpts) {

    },


    onVisitSimplifiedFormItemIdSaveEdit: function(form, promptWin, comment) {


    },


    onVisitSimplifiedFormItemIdChHist: function(button) {

    },

    onVisitSimplifiedFormItemIdQuitEdit: function(form, promptWin) {

    }

});