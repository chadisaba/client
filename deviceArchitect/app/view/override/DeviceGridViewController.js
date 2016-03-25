Ext.define('MyApp.view.override.DeviceGridViewController', {
    override: 'MyApp.view.DeviceGridViewController',

    onDeviceGridIdChHist: function() {

    },

    onDeviceGridIdAfterRender: function(component, eOpts) {
        component.getPlugin('gridediting').lockGrid(false);

        var params;
        params={
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
            }
        );


        var deviceSupportComboStore=this.getViewModel().getStore('DeviceSupportComboStore');
        var deviceSupportComboStoreData=[
            {'deviceSupport':0,'deviceSupportDisplay':'Aucun'},
            {'deviceSupport':1,'deviceSupportDisplay':'Lecture'},
            {'deviceSupport':2,'deviceSupportDisplay':'Support'}
        ];
        deviceSupportComboStore.loadData(deviceSupportComboStoreData);



        this.getResultArray(
            function(data){
                Utility.grid.loadGrid(component,data,component.getViewModel().getStore('DeviceStore'));
            });
    },

    onDeviceGridIdInEdit: function() {

    },

    onDeviceGridIdResetEdit: function(gridpanel,promptWin) {
        Utility.grid.resetEdit(this.getView(),this.getResultArray(),this.getView().getViewModel().getStore('DeviceStore'),promptWin);

    },

    onDeviceGridIdSaveEdit: function(gridpanel, promptWin, dataToBeSaved, comment) {

        var me=this;
        var params={};
        params.table="DEVICE";
        params.idName="deviceId";
        params.dataToBeSaved=dataToBeSaved;
        params.comment=comment;
        var result=[];
        Server.CommonQueries.saveRecords(params,
            function(_result){
                if(_result.success){
                    this.getResultArray(function(data){
                        Utility.grid.saveEdit(me.getView(),data,me.getView().getViewModel().getStore('DeviceStore'),promptWin);
                    },this);
                }
                else{
                    console.error(_result.msg);
                    Ext.MessageBox.alert("Error","save Error "+_result.msg);
                }
            },me
        );


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

        var columnsName=['deviceTypeId','modalityId','deviceName','deviceModel','deviceAET','deviceAgreementNumber','deviceAgreementDate','deviceTrademark','deviceInstallationDate','devicePower','deviceIsSenolog','deviceSupport','deviceLecture'];
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

            tablesArray:["DEVICE",'DEVICE_TYPE','MODALITY'],
            keysArray:['deviceTypeId','modalityId']
    };
        Server.CommonQueries.readJoin(params,
            function(res){
                if(res.success){
                    callback(res.data);
                }
                else{
                    console.error(res.msg);
                    callback(res.msg);
                }
            },me);
    },

    onDeviceTypeComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var deviceTypeIdField=combo.up('roweditor').down('#deviceTypeIdFieldItemId');
        deviceTypeIdField.setValue(record.get('deviceTypeId'));
    },

    onModalityComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var modalityIdField=combo.up('roweditor').down('#modalityIdFieldItemId');
        modalityIdField.setValue(record.get('modalityId'));
    },

    /*********************** renderers****************************************************/

    supportRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Utility.renderer.retreiveTextFromStore(value,'deviceSupport','deviceSupportDisplay','DeviceSupportComboStore',this);
    }

});