Ext.define('MyApp.view.override.UserGridViewController', {
    override: 'MyApp.view.UserGridViewController',

    onUserGridIdChHist: function() {

    },

    onUserGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);


        /*
                           var typeResult=[
                               {'typeId':'5','type':'break'},
                               {'typeId':'6','type':'berline'}
                           ];

                           var typeStore=this.getViewModel().getStore('TypeComboStore');
                           typeStore.loadData(typeResult);


        Utility.grid.loadGrid(component,this.getResultArray(),component.getViewModel().getStore('UserGridStore'));
        */this.getResultArray(
            function(data){
                Utility.grid.loadGrid(component,data,component.getViewModel().getStore('UserGridStore'));
            });
    },

    onUserGridIdInEdit: function() {

    },

    onUserGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('UserGridStore'),promptWin);

    },

   onUserGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

     var success=false;
        // first save all data to the server side by calling ext.direct function or ajax query
     
      /*  if(success){
             var resultArray=[];
            // retrieve the result from the ext.direct ou ajax call
            
            Utility.grid.saveEdit(this.getView(),resultArray,this.getView().getViewModel().getStore('UserGridStore'),promptWin);
        }
       else
           {
               Ext.MessageBox.alert("Error","save Error");
           }
     */
       var me = this;
       var params={};
       params.table="USER";
       params.idName="userId";
       params.dataToBeSaved=dataToBeSaved;
       params.comment=comment;
       var result=[];
       Server.commonQueries.saveRecords(params,
            function (_result){
                if(_result.success){
                    var resultarray=[];
                    this.getResultArray(function(data){
                        Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('UserGridStore'),promptWin);
                    },this);
                }
                else{
                    console.error(_result.msg);
                    Ext.MessageBox.alert("Error","Save Error"+_result.msg);
                }
            },me
       );

    },

    onUserGridIdAddItem: function() {

        var rec = new MyApp.model.UserGridModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onUserGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onUserGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onUserGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('UserGridStore'),promptWin);
    },
    onUserGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onUserGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onUserGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onUserGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['addressId','userFName','userLName','userLogin','userPass','userInitiales','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onUserGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onUserGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(callback)
   /* {
        var result = [
            {'cat':'opel','type':'break','available':true,'comment':'','name':'Opel astra'}

        ];
        return(result);}*/ {

        var me = this;
        var params = {
            id: 50,
            table:"USER"
        };
        var result = [];
        // Server.Settings.Site.createDescribe(params,
        Server.CommonQueries.read(params,
            function (res) {
                if (res.success) {
                    callback(res.data);
                }
                else {
                    console.log(res.msg);
                }
            }, me
        );


    },

});