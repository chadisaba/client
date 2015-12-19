Ext.define('MyApp.view.override.MyGridViewController', {
    override: 'MyApp.view.MyGridViewController',

    onMyGridIdChHist: function() {

    },

    onMyGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);


        
                           var typeResult=[
                               {'typeId':'5','type':'break'},
                               {'typeId':'6','type':'berline'}
                           ];

                           var typeStore=this.getViewModel().getStore('TypeComboStore');
                           typeStore.loadData(typeResult);
   

        Utility.grid.loadGrid(component,this.getResultArray(),component.getViewModel().getStore('MyStore'));

    },

    onMyGridIdInEdit: function() {

    },

    onMyGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('MyStore'),promptWin);

    },

   onMyGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

     var success=false;
        // first save all data to the server side by calling ext.direct function or ajax query
     
        if(success){
             var resultArray=[];
            // retrieve the result from the ext.direct ou ajax call
            
            Utility.grid.saveEdit(this.getView(),resultArray,this.getView().getViewModel().getStore('MyStore'),promptWin);
        }
       else
           {
               Ext.MessageBox.alert("Error","save Error");
           }
     
        
    },

    onMyGridIdAddItem: function() {

        var rec = new MyApp.model.MyModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onMyGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onMyGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onMyGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('MyStore'),promptWin);
    },
    onMyGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onMyGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onMyGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onMyGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['client','subscription','lot','portifilio','goArea','priceType','marketCodification','marketCode','flow','marketCode1','priceType1','securitySubType','typeCoursRef','issuerCountry','marketRef','flow1','market1','priceType1','flow2','market2','market2','flow3','market3','priceType3','creationDate'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onMyGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onMyGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function()
    {
        var result = [
            {'cat':'opel','type':'break','available':true,'comment':'','name':'Opel astra'}

        ];
        return(result);
    }
    
 
    

});