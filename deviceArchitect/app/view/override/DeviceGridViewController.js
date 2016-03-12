Ext.define('MyApp.view.override.DeviceGridViewController', {
    override: 'MyApp.view.DeviceGridViewController',

    onDeviceGridIdChHist: function() {

    },

    onDeviceGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

        var params;params={
            id:50,
            table:"DEVICE_TYPE"
        };
        var deviceTypeComboStore=this.getViewModel().getStore('DeviceTypeComboStore');
        var deviceTypeComboStoreData=[];
        Server.CommonQueries.read(params,
            function(res){
                if(res.success){
                    deviceTypeComboStoreData=res.data;
                    deviceTypeComboStore.loadData(deviceTypeComboStoreData);
                }
                else{
                    console.log(res.msg);
                }
            }
        );

        params={
            id:50,
            table:"MODALITY"
        };
        var modalityComboStore=this.getViewModel().getStore('ModalityComboStore');
        var modalityComboStoreData=[];
        Server.CommonQueries.read(params,
            function(res){
                if(res.success){
                    modalityComboStoreData=res.data;
                    modalityComboStore.loadData(modalityComboStoreData);
                }
                else{
                    console.log(res.msg);
                }
            },me
        );


        var deviceSupportComboStore=this.getViewModel().getStore('DeviceSupportComboStore');
        var deviceSupportComboStoreData=[
            {'deviceSupportId':1,'deviceSupport':'Lecture'},
            {'deviceSupportId':2,'deviceSupport':'Support'}
        ];
        deviceSupportComboStore.loadData(deviceSupportComboStoreData);




        Utility.grid.loadGrid(component,this.getResultArray(),component.getViewModel().getStore('DeviceStore'));

    },

    onDeviceGridIdInEdit: function() {

    },

    onDeviceGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('DeviceStore'),promptWin);

    },

    onDeviceGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

        var success=false;
        // first save all data to the server side by calling ext.direct function or ajax query

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

        var columnsName=['deviceTypeId','modalityId','deviceName','deviceModel','deviceAET','deviceAgreementNumber','deviceAgreementDate','deviceTrademark','deviceInstallationDate','devicePower','deviceIsSenolog','deviceSupportId','deviceLecture'];
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
    getResultArray:function(callback)
    {
        var me=this;
        var params={
            table:"DEVICE"
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
    }




});