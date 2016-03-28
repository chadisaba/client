Ext.define('MyApp.view.override.StudyTypeGridViewController', {
    override: 'MyApp.view.StudyTypeGridViewController',

    onStudyTypeGridIdChHist: function() {

    },

    onStudyTypeGridIdAfterRender: function(component) {
        component.getPlugin('gridediting').lockGrid(false);

        component.down('#rdvColorColItemId').setEditor({
            xtype:'colorfield',
            allowBlank: false,
            width:200,
            itemId:'bicEditor',
            maxLength:8,
            enableKeyEvents:true

        });


    var params;
            params={
            id:50,
            table:"study_cat"
            };
            var studyCatComboStore=this.getViewModel().getStore('StudyCatComboStore');
            var studyCatComboStoreData=[];
            Server.CommonQueries.read(params,
            function(res){
            if(res.success){
            studyCatComboStoreData=res.data;
            studyCatComboStore.loadData(studyCatComboStoreData);
                }
                else{
                    console.error(res.msg);
                }
            });
            
        
   
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('StudyTypeStore'));
        	        });
    },

    onStudyTypeGridIdInEdit: function() {

    },

    onStudyTypeGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('StudyTypeStore'),promptWin);

    },

   onStudyTypeGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

	     var me=this;
	     var params={};
	            params.table="study_type";
	            params.idName="studyTypeId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            var result=[];
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        var resultArray=[];
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('StudyTypeStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
    },

    onStudyTypeGridIdAddItem: function() {

        var rec = new MyApp.model.StudyTypeModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false,
            studyTypeRdvColor: '#0f0'
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onStudyTypeGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onStudyTypeGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onStudyTypeGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('StudyTypeStore'),promptWin);
    },
    onStudyTypeGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onStudyTypeGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onStudyTypeGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onStudyTypeGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['studyCatId','studyTypeCode','studyTypeName','studyTypeRdvColor','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onStudyTypeGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },


    studyCatRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {

        var me=this;
        if(value)
        {
            var store=me.getViewModel().getStore('StudyCatComboStore');
            var rec=store.findRecord('studyCatId',value);
            return rec.get('studyCatName');
        }
    },
    

    onStudyTypeGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(callback)
    {
        var me=this;
        var params={
        		table:"study_type"
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
  rdvColorRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
return '<div style="line-height:30px;background-color:#'+value+';height:30px;width:100%;float:left;padding:5px;"></div>';
  }




});