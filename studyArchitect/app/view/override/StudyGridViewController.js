Ext.define('MyApp.view.override.StudyGridViewController', {
    override: 'MyApp.view.StudyGridViewController',

    onStudyGridIdChHist: function() {

    },

    onStudyGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

    var params;
            params={
            id:50,
            table:"study_type"
            };
            var studyTypeComboStore=this.getViewModel().getStore('StudyTypeComboStore');
            var studyTypeComboStoreData=[];
            Server.CommonQueries.read(params,
            function(res){
            if(res.success){
            studyTypeComboStoreData=res.data;
            studyTypeComboStore.loadData(studyTypeComboStoreData);
                }
                else{
                    console.error(res.msg);
                }
            });
            
        
   
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('StudyStore'));
        	        });
    },

    onStudyGridIdInEdit: function() {

    },

    onStudyGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('StudyStore'),promptWin);

    },

   onStudyGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

	     var me=this;
	     var params={};
	            params.table="study";
	            params.idName="studyId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            var result=[];
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        var resultArray=[];
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('StudyStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
    },

    onStudyGridIdAddItem: function() {

        var rec = new MyApp.model.StudyModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);


    },

    onStudyGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onStudyGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onStudyGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('StudyStore'),promptWin);
    },
    onStudyGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onStudyGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onStudyGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onStudyGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['studyTypeId','studyCode','studyName','studyFtNumber','studyDuration','studyDaysNbToSendSms','studyIsDosimetry','studyIsInjected','studyGenerateDicomWL','studyMultiSegment','active','studyInvoiceCat'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onStudyGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onStudyGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(callback)
    {
        var me=this;
        var params={
        		table:"study"
        };
        var result=[];
        Server.CommonQueries.read(params,
                function(res){
                    if(res.success){
                    	callback(res.data);
                    }
                    else{
                        console.error(res.msg);
                        callback(res.msg);
                    }
                });
    },
    /*********************** renderers****************************************************/
  /**xxComboboxRenderer**/
    
 
    

});