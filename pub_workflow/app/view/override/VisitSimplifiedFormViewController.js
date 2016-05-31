Ext.define('MyApp.view.override.VisitSimplifiedFormViewController', {
    override: 'MyApp.view.VisitSimplifiedFormViewController',

    initForm: function(_visitId) {
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
            view.down('#studyVisitGridItemId').getPlugin('gridediting').lockGrid(false);
        }


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

    }

});