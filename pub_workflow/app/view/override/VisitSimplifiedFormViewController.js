Ext.define('MyApp.view.override.VisitSimplifiedFormViewController', {
    override: 'MyApp.view.VisitSimplifiedFormViewController',

    initForm: function(_visitId,_patientId) {
        var me=this;
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
            // we modify the visit


                var p1=CommunDirect.getData("VISIT",[{name:'visitId',value:_visitId}]);
                var p2=CommunDirect.getData("study_visit",[{name:'visitId',value:_visitId}]);
                var p3=CommunDirect.getData("SITE");
                Promise.all([p1,p2,p3])
                    .then(function(_valuesArray)
                    {
                        viewModel.getStore('SiteStore').loadData(_valuesArray[2]);
                        visitRec=Ext.create('MyApp.model.VisitModel',_valuesArray[0]);
                        view.loadRecord(visitRec);
                        studyVisitArray=_valuesArray[1];
                        viewModel.getStore('StudyVisitStore').loadData(studyVisitArray);
                    });


            }
         else
         {
             if(!_patientId)
             {
                 Ext.Msg.alert('Error', 'PatientId cannot be null');
             }
             else
             {
                 // we create a new visit
                 CommunDirect.getData("SITE")
                     .then(function(_resultArray)
                     {
                         viewModel.getStore('SiteComboStore').loadData(_resultArray);
                         var visitRec=Ext.create('MyApp.model.VisitModel');
                         visitRec.set('visitId',UUID());
                         visitRec.set('patientId',_patientId);
                         visitRec.set('visitDate',new Date());
                         visitRec.set('visitTime',Ext.Date.format(new Date(), 'H:i'));

                         view.loadRecord(visitRec);
                     });

             }

         }
    },
    visitFormSave: function() {
        var me=this;
        //Creating a promise
        var promise=new Promise(
            function(resolve, reject) {
                var rec=me.getView().getRecord();
                var form=me.getView();
                form.updateRecord(rec); // update the record with the form data
                var dataToSave=rec.data;
                dataToSave.visitTime=Ext.Date.format(dataToSave.visitTime, 'H:i');
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

    },
    onAddStudyComboItemIdChange: function(field, newValue, oldValue, eOpts) {
    StudyDirect.studyDirectAutoComplete(this,newValue,"StudyComboStore",field);
    }


});