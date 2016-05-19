Ext.define('MyApp.view.override.DeviceTypeGridViewController', {
    override: 'MyApp.view.DeviceTypeGridViewController',

    onDeviceTypeGridIdChHist: function() {

    },

    onDeviceTypeGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

    var params;
            
   
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('DeviceTypeStore'));
        	        });
    },

    onDeviceTypeGridIdInEdit: function() {

    },

    onDeviceTypeGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('DeviceTypeStore'),promptWin);

    },

   onDeviceTypeGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

	     var me=this;
	     var params={};
	            params.table="DEVICE_TYPE";
	            params.idName="deviceTypeId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            var result=[];
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        var resultArray=[];
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('DeviceTypeStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
    },

    onDeviceTypeGridIdAddItem: function() {

        var rec = new MyApp.model.DeviceTypeModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onDeviceTypeGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onDeviceTypeGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onDeviceTypeGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('DeviceTypeStore'),promptWin);
    },
    onDeviceTypeGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onDeviceTypeGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onDeviceTypeGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onDeviceTypeGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['deviceTypeName','deviceTypeCode','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onDeviceTypeGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onDeviceTypeGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(callback)
    {
        var me=this;
        var params={
        		table:"DEVICE_TYPE"
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