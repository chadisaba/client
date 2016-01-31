Ext.define('MyApp.view.override.SiteGroupGridViewController', {
    override: 'MyApp.view.SiteGroupGridViewController',

    onSiteGroupGridIdChHist: function() {

    },

    onSiteGroupGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

   
this.getResultArray(
    function(data){
            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('SiteGroupStore'));
        });
        
        alert('10');
    },

    onSiteGroupGridIdInEdit: function() {

    },

    onSiteGroupGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('SiteGroupStore'),promptWin);

    },

   onSiteGroupGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

         // first save all data to the server side by calling ext.direct function or ajax query

       var me=this;
var params={};
       params.table="SITE_GROUP";
       params.idName="siteGroupId";
       params.dataToBeSaved=dataToBeSaved;
       params.comment=comment;
       var result=[];
       Server.CommonQueries.saveRecords(params,
           function(_result){
               if(_result.success){
                   var resultArray=[];
                   this.getResultArray(function(data){
                       Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('SiteStore'),promptWin);
                   },this);
               }
               else{
                   console.error(_result.msg);
                   Ext.MessageBox.alert("Error","save Error "+_result.msg);
               }
           },me
       );
     
        
    },

    onSiteGroupGridIdAddItem: function() {

        var rec = new MyApp.model.SiteGroupModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onSiteGroupGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onSiteGroupGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onSiteGroupGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('SiteGroupStore'),promptWin);
    },
    onSiteGroupGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onSiteGroupGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onSiteGroupGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onSiteGroupGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['siteGroupName','active','created','lastupdated'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onSiteGroupGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onSiteGroupGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
   getResultArray:function(callback)
    {

        var me=this;
        var params={
            id:50,
            table:"SITE_GROUP"
        };
        var result=[];
       // Server.Settings.Site.createDescribe(params,
        Server.CommonQueries.read(params,
            function(res){
                if(res.success){
                    callback(res.data);
                }
                else{
                    console.error(res.msg);
                }
            },me
        );

    }
    
    
 
    

});