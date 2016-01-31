Ext.define('MyApp.view.override.DeviceGridViewController', {
    override: 'MyApp.view.DeviceGridViewController',

    onDeviceGridIdChHist: function() {

    },

    onDeviceGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);


        
             /*              var typeResult=[
                               {'typeId':'5','type':'break'},
                               {'typeId':'6','type':'berline'}
                           ];

                           var typeStore=this.getViewModel().getStore('TypeComboStore');
                           typeStore.loadData(typeResult);
   

        Utility.grid.loadGrid(component,this.getResultArray(),component.getViewModel().getStore('DeviceStore'));
*/


        this.getResultArray(function(data){
            Utility.grid.loadGrid(component,data,component.getViewModel().getStore('DeviceStore'));
        },this);

    },

    onDeviceGridIdInEdit: function() {

    },

    onDeviceGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('DeviceStore'),promptWin);

    },

   onDeviceGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

     var success=true;
        // first save all data to the server side by calling ext.direct function or ajax query
     console.log(dataToBeSaved);
        if(success){
             var resultArray=[];
            // retrieve the result from the ext.direct ou ajax call
            
            Utility.grid.saveEdit(this.getView(),resultArray,this.getView().getViewModel().getStore('DeviceStore'),promptWin);
        }
       else
           {
               Ext.MessageBox.alert("Error","save Error");
           }
     
        
    },

    onDeviceGridIdAddItem: function() {

        var rec = new MyApp.model.DeviceModel({
            added: true,
            modified: false,
            addedAndValidated:false,
            toDelete: false
        });
        Utility.grid.addItem(this.getView(),rec);
    },

    onDeviceGridIdDeleteItem: function() {
        Utility.grid.deleteItem(this.getView());
    },

    onDeviceGridIdModifyItem: function() {
        Utility.grid.modifyItem(this.getView());
    },

    onDeviceGridIdQuitEdit: function(gridpanel,promptWin) {
        Utility.grid.quitEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('DeviceStore'),promptWin);
    },
    onDeviceGridIdBeforeEdit: function(editor,context) {
        return (Utility.grid.beforeEdit(editor,context));
    },

 

    onDeviceGridIdCanceledit: function(editor,context) {
        return(Utility.grid.cancelEdit(editor,context));
    },

    onDeviceGridIdContainerClick: function(dataview, e, eOpts) {
        return(Utility.grid.gridContainerClick(this.getView()));
    },

    onDeviceGridIdEdit: function(editor,context) {
 // var columnsName=['name','text'];
    	
    	var columnsName=['deviceName','deviceModel','deviceAET','active'];
        Utility.grid.edit(editor, context, columnsName);
    },

    onDeviceGridIdBeforeCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        Utility.grid.viewBeforeCellClick(this.getView());
    },
    

    onDeviceGridIdValidateedit: function(editor, context) {
        
        var check;
        check=true;
        // check= checkFunction(); check if all required data in the form editor
        
        return(Utility.grid.validateedit(editor,context,check));
    },
    getResultArray:function(shadi)
    {
      /*  var result = [
            {'cat':'opel','type':'break','available':true,'comment':'','name':'Opel astra'}

        ];
        return(result);*/

        var me=this;
        var params={
            table:"DEVICE",
            id:50
        };



        Server.CommonQueries.read(params,
            function(res){
                if(res.success){
                    shadi(res.data);

                }
                else{
                    console.log(res.msg);
                }
            },me
        );
    }
    
 
    

});