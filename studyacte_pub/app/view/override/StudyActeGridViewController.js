Ext.define('MyApp.view.override.StudyActeGridViewController', {
    override: 'MyApp.view.StudyActeGridViewController',

    onStudyActeGridIdChHist: function() {

    },
    initGrid: function(_filters,_readOnlyGrid) {
        var view=this.getView();
        var me=this;
         if (!_readOnlyGrid)
                view.getPlugin('gridediting').lockGrid(false);
        me.filters=_filters;
        var myMask = new Ext.LoadMask({
    msg    : translate('chargementEnCours...'),
    target : view
});

myMask.show();
        
      this.getResultArray(me.filters).then(
                    function (data) {
                        Utility.grid.loadGrid(view, data, view.getViewModel().getStore('StudyActeStore'));

                    view.getPlugin('gridediting').enterEditMode();
                        myMask.hide();
                    }
                );
    },
    onStudyActeGridIdInEdit: function() {

    },

    onStudyActeGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('StudyActeStore'),promptWin);

    },
   onStudyActeGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

        var me=this;
        CommonDirect.saveDataArray(dataToBeSaved, "STUDY_ACTE", comment)
            .then(function(_result)
            {
                promptWin.close();
                gridpanel.getPlugin('gridediting').quitEditMode();
	            me.refreshGrid();
             
            })
            .catch(function(_err)
            {
                console.error(_err);
            });
        
    },
     refreshGrid: function () {
        this.initGrid(this.filters);
    },
    onStudyActeGridIdAddItem: function() {

        var rec = new MyApp.model.StudyActeModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false,
            active:true
        });
        Utility.grid.addItem(this.getView(),rec);
    },
    onStudyActeGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },
    onStudyActeGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },
    onStudyActeGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('StudyActeStore'),promptWin);
    },
    onStudyActeGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },
    onStudyActeGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onStudyActeGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onStudyActeGridIdEdit: function(editor,context) {
    	
    	var columnsName=['studyActeCode','studyActeType','studyActeAmount','studyActeAmountDepassement','studyActeAssociationNonPrevu','studyActeModificators','studyActeDepense','studyActeQuantity','studyActeAdditionalAmount','studyActeAcceptedModificators','studyActeCoefficient','studyActeEntentePrealable','studyActeRefundable','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onStudyActeGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onStudyActeGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(filters)
    {
          var me = this;

        var promise = new Promise(
            function (resolve, reject) {
            
                CommonDirect.getData('STUDY_ACTE',filters)
                    .then(
                        function (_result) {
                         
                            resolve(_result);
                        })
                    .catch(function (_err) {
                        console.error(_err);
                        reject(_err);
                    });

            }
        );
        return promise;
    } 

});