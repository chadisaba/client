Ext.define('MyApp.view.override.DoctorGridViewController', {
    override: 'MyApp.view.DoctorGridViewController',

    onDoctorGridIdChHist: function() {

    },


    onDoctorGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

    var params;
            params={
            id:50,
            table:"USER"
            };
            var userInitialComboStore=this.getViewModel().getStore('UserInitialComboStore');
            var userInitialComboStoreData=[];
            Server.CommonQueries.read(params,
            function(res){
            if(res.success){
            userInitialComboStoreData=res.data;
            userInitialComboStore.loadData(userInitialComboStoreData);
                }
                else{
                    console.error(res.msg);
                }
            });
            
        
   
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('DoctorStore'));
        	        });
    },

    onDoctorGridIdInEdit: function() {

    },

    onDoctorGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('DoctorStore'),promptWin);

    },

   onDoctorGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

	     var me=this;
	     var params={};
	            params.table="DOCTOR";
	            params.idName="doctorId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('DoctorStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
    },

    onDoctorGridIdAddItem: function() {

        var rec = new MyApp.model.DoctorModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onDoctorGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onDoctorGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onDoctorGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('DoctorStore'),promptWin);
    },
    onDoctorGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onDoctorGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onDoctorGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onDoctorGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['userId','userInitiales','doctorIsSubstitute','doctoHasOptionCoordination','doctorSenologUID','doctorHasSector2','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onDoctorGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onDoctorGridIdValidateedit: function(editor, context) {
        
        var check;
      //  check=true;
         check= this.checkUserIdFunction(editor,context);// check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    onUserInitialComboBoxEditorItemIdSelect: function(combo, record, eOpts) {


        var userIdField=combo.up('roweditor').down('#userIdTextFieldItemId');
        userIdField.setValue(record.get('userId'));

    },


    checkUserIdFunction:function(editor,context)
    {

        var check;
        check=true;

      var doctorStore =this.getViewModel().getStore('DoctorStore');
        var userCombo=editor.editor.down('#userInitialComboBoxEditorItemId');



        doctorStore.each(function(doctorItem){
            if(context.record.get('id')!=doctorItem.get('id')) {
                if (doctorItem.get('userInitiales') == userCombo.value)


                    check = false;
            }

        },this);


        return check;
    },

    getResultArray:function(callback)
    {




        var me = this;
        var params = {

            tablesArray: ['USER', "DOCTOR"],
            keysArray: ['userId']

        };
        Server.CommonQueries.readJoin(params,
            function (res) {
                if (res.success) {
                    callback(res.data);
                }
                else {
                    console.error(res.msg);
                    callback(res.msg);
                }
            }, me);
    },
    /*********************** renderers****************************************************/
  /**xxComboboxRenderer**/
    
 
    

});