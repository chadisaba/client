Ext.define('MyApp.view.override.ActeOtherGridViewController', {
    override: 'MyApp.view.ActeOtherGridViewController',

    onActeOtherGridIdChHist: function() {

    },

    onActeOtherGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

    var params;
            
   
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('ActeOtherStore'));
        	        });
    },

    onActeOtherGridIdInEdit: function() {

    },

    onActeOtherGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('ActeOtherStore'),promptWin);

    },

   onActeOtherGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

	     var me=this;
	     var params={};
	            params.table="ACTE_OTHER";
	            params.idName="acteOtherId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            var result=[];
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        var resultArray=[];
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('ActeOtherStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
    },

    onActeOtherGridIdAddItem: function() {

        var rec = new MyApp.model.ActeOtherModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false,
            active:true
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onActeOtherGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onActeOtherGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onActeOtherGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('ActeOtherStore'),promptWin);
    },
    onActeOtherGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onActeOtherGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onActeOtherGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onActeOtherGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['acteOtherName','acteOtherCode','acteOtherAmount','acteOtherIsNgap','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onActeOtherGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onActeOtherGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(callback)
    {
        var me=this;
        var params={
        		table:"ACTE_OTHER"
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