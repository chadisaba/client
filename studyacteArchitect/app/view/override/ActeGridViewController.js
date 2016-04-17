Ext.define('MyApp.view.override.ActeGridViewController', {
    override: 'MyApp.view.ActeGridViewController',

    onActeGridIdChHist: function() {

    },

    onActeGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

    var params;
            
   
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('ActeStore'));
        	        });
    },

    onActeGridIdInEdit: function() {

    },

    onActeGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('ActeStore'),promptWin);

    },

   onActeGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

	     var me=this;
	     var params={};
	            params.table="xxTableName";
	            params.idName="xxTableId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            var result=[];
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        var resultArray=[];
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('ActeStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
    },

    onActeGridIdAddItem: function() {

        var rec = new MyApp.model.ActeModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onActeGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onActeGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onActeGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('ActeStore'),promptWin);
    },
    onActeGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onActeGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onActeGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onActeGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['acteCode','acteDescription','acteCodeGroupement','actePrix','acteModificateurs','acteVersion','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onActeGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onActeGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(callback)
    {
        var me=this;
        var params={
        		table:"ACTE"
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