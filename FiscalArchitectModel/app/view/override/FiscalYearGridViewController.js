Ext.define('MyApp.view.override.FiscalYearGridViewController', {
    override: 'MyApp.view.FiscalYearGridViewController',

    onFiscalYearGridIdChHist: function() {

    },

    onFiscalYearGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

    var params;
            params={
            id:50,
            table:"SITE_GROUP"
            };
            var siteGroupNaComboStore=this.getViewModel().getStore('SiteGroupNaComboStore');
            var siteGroupNaComboStoreData=[];
            Server.CommonQueries.read(params,
            function(res){
            if(res.success){
            siteGroupNaComboStoreData=res.data;
            siteGroupNaComboStore.loadData(siteGroupNaComboStoreData);
                }
                else{
                    console.error(res.msg);
                }
            });
            
        
   
        this.getResultArray(
        	    function(data){
        	            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('FiscalYearStore'));
        	        });
    },

    onFiscalYearGridIdInEdit: function() {

    },

    onFiscalYearGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('FiscalYearStore'),promptWin);

    },

   onFiscalYearGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

	     var me=this;
	     var params={};
	            params.table="fiscal_year";
	            params.idName="fiscalYearId";
	            params.dataToBeSaved=dataToBeSaved;
	            params.comment=comment;
	            var result=[];
	            Server.CommonQueries.saveRecords(params,
	                function(_result){
	                    if(_result.success){
	                        var resultArray=[];
	                        this.getResultArray(function(data){
	                            Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('FiscalYearStore'),promptWin);
	                        },this);
	                    }
	                    else{
	                        console.error(_result.msg);
	                        Ext.MessageBox.alert("Error","save Error "+_result.msg);
	                    }
	                },me
	            );
     
        
    },

    onFiscalYearGridIdAddItem: function() {

        var rec = new MyApp.model.FiscalYearModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onFiscalYearGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onFiscalYearGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onFiscalYearGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('FiscalYearStore'),promptWin);
    },
    onFiscalYearGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onFiscalYearGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onFiscalYearGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onFiscalYearGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['siteGroupId','fiscalYearName','fiscalYearStartDate','fiscalYearEndDate','fiscalYearClosed','active','siteGroupName'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onFiscalYearGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onFiscalYearGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    onSiteGroupNaComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var siteGroupIdField=combo.up('roweditor').down('#siteGroupIdTextFieldItemId');
        siteGroupIdField.setValue(record.get('siteGroupId'));
    },

    getResultArray:function(callback)
    {

        var me = this;
        var params = {

            tablesArray: ['FISCAL_YEAR', "SITE_GROUP"],
            keysArray: ['siteGroupId']

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