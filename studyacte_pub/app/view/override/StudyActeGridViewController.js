Ext.define('MyApp.view.override.StudyActeGridViewController', {
    override: 'MyApp.view.StudyActeGridViewController',

    onStudyActeGridIdChHist: function() {

    },

    initGrid: function(_filters,_readOnlyGrid) {
        var view=this.getView();
         if (!_readOnlyGrid)
                view.getPlugin('gridediting').lockGrid(false);
      this.getResultArray(me.filters).then(
                    function (data) {
                        Utility.grid.loadGrid(view, data, view.getViewModel().getStore('StudyActeStore'));

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
	     var params={};
	            params.table="STUDY_ACTE";
	            params.idName="studyActeId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            var result=[];
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        var resultArray=[];
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('StudyActeStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
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
 // var columnsName=['name','text'];
    	
    	var columnsName=['studyActeCode','studyActeType','studyActeAmount','studyActeAmountDepassement','studyActeAssociationNonPrevu','studyActeModificators','studyActeDepense','studyActeQuantity','studyActeAdditionalAmount','studyActeAcceptedModificators','studyActeCoefficient','studyActeEntentePrealable','studyActeRefundable','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onStudyActeGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onStudyActeGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
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