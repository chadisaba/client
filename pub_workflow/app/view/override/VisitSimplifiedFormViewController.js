Ext.define('MyApp.view.override.VisitSimplifiedFormViewController', {
    override: 'MyApp.view.VisitSimplifiedFormViewController',

    initForm: function(button, win, close) {

        var me=this;

        var view=me.getView();
        var viewModel=me.getViewModel();
        var visitId=null;
        if(view.visitId)
            visitId=view.visitId;

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

    onVisitSimplifiedFormItemIdAfterRender: function(component, eOpts) {

        this.initForm();
    },


    onVisitSimplifiedFormItemIdSaveEdit: function(form, promptWin, comment) {

    },


    onVisitSimplifiedFormItemIdChHist: function(button) {

    },

    onVisitSimplifiedFormItemIdQuitEdit: function(form, promptWin) {

    }

});