Ext.define('MyApp.view.override.UserCatGridViewController', {
    override: 'MyApp.view.UserCatGridViewController',

    onUserCatGridIdChHist: function() {

    },

    onUserCatGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

    var params;
            
   
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('UserCatStore'));
        	        });
    },

    onUserCatGridIdInEdit: function() {

    },

    onUserCatGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('UserCatStore'),promptWin);

    },

   onUserCatGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

	     var me=this;
	     var params={};
	            params.table="user_cat";
	            params.idName="userCatId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            var result=[];
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        var resultArray=[];
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('UserCatStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
    },

    onUserCatGridIdAddItem: function() {

        var rec = new MyApp.model.UserCatModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false,
            active:true
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onUserCatGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onUserCatGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onUserCatGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('UserCatStore'),promptWin);
    },
    onUserCatGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onUserCatGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onUserCatGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onUserCatGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['userCatName','userCatReadOnly','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onUserCatGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onUserCatGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(callback)
    {
        var me=this;
        var params={
        		table:"user_cat"
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