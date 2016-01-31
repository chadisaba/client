Ext.define('MyApp.view.override.SiteConfigGridViewController', {
    override: 'MyApp.view.SiteConfigGridViewController',

    onSiteConfigGridIdChHist: function() {
         this.fireViewEvent('closeWindowEvent');

    },

    onSiteConfigGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);


        
                         /*  var typeResult=[
                               {'typeId':'5','type':'break'},
                               {'typeId':'6','type':'berline'}
                           ];

                           var typeStore=this.getViewModel().getStore('TypeComboStore');
                           typeStore.loadData(typeResult);*/
   

        Utility.grid.loadGrid(component,this.getResultArray(),component.getViewModel().getStore('SiteConfigStore'));

    },

    onSiteConfigGridIdInEdit: function() {

    },

    onSiteConfigGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('SiteConfigStore'),promptWin);

    },

   onSiteConfigGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

     var success=false;
        // first save all data to the server side by calling ext.direct function or ajax query
     
        if(success){
             var resultArray=[];
            // retrieve the result from the ext.direct ou ajax call
            
            Utility.grid.saveEdit(this.getView(),resultArray,this.getView().getViewModel().getStore('SiteConfigStore'),promptWin);
            this.fireViewEvent('closeWindowEvent');
        }
       else
           {
               Ext.MessageBox.alert("Error","save Error");
           }
     
        
    },

    onSiteConfigGridIdAddItem: function() {

        var rec = new MyApp.model.SiteConfigModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onSiteConfigGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onSiteConfigGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onSiteConfigGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('SiteConfigStore'),promptWin);
    },
    onSiteConfigGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onSiteConfigGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onSiteConfigGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onSiteConfigGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['siteId','siteConfigStartHour','siteConfigEndHour','siteConfigPyxMode','siteConfigFseIsChecked','siteConfigUidSenolog','siteConfigSenologType','created','lastupdated'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onSiteConfigGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onSiteConfigGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function()
    {
       /* var result = [
            {'cat':'opel','type':'break','available':true,'comment':'','name':'Opel astra'}

        ];*/
        var result=[];
        return(result);
    }
    
 
    

});