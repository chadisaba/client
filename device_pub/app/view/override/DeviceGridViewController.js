Ext.define('MyApp.view.override.DeviceGridViewController', {
    override: 'MyApp.view.DeviceGridViewController',

    onDeviceGridIdChHist: function() {

    },

    onDeviceGridIdAfterRender: function(component) {
        translateUtil.transGrid(component);

        component.getPlugin('gridediting').lockGrid(false);

        var deviceTypeComboStore=this.getViewModel().getStore('DeviceTypeComboStore');
          CommonDirect.getData("DEVICE_TYPE")
                      .then(function(_resultData)
                      {
                          deviceTypeComboStore.loadData(_resultData);
                      });

        var modalityComboStore=this.getViewModel().getStore('ModalityComboStore');
          CommonDirect.getData("MODALITY")
                      .then(function(_resultData)
                      {
                          modalityComboStore.loadData(_resultData);
                      });

        var siteComboStore=this.getViewModel().getStore('SiteComboStore');
        CommonDirect.getData("SITE")
            .then(function(_resultData)
            {
                siteComboStore.loadData(_resultData);
            });


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

                var mainTableObject={};
                mainTableObject.tableName='DEVICE';
                var joinTablesArray=[];
                joinTablesArray.push({tableName:'DEVICE_TYPE'},{tableName:'MODALITY'},{tableName:'SITE'});
                var params = {
                    mainTableObject: mainTableObject,
                    joinTablesArray: joinTablesArray
                };
                Server.CommonQueries.readJoin(params,
                    function (res) {
                        if (res.success) {
                            for (var i = 0; i < res.data.length; i++) {
                                res.data[i].deviceTypeCode=res.data[i]['DeviceType.deviceTypeCode'];
                                res.data[i].modalityCode=res.data[i]['Modality.modalityCode'];
                                res.data[i].siteCode=res.data[i]['Site.siteCode'];
                               // res.data[i].siteName=res.data[i]['Site.modalityCode'];
                            }
                            callback(res.data);
                        }
                        else {
                            console.error(res.msg);
                            callback(res.msg);
                        }
                    }, me);
    },

    onDeviceTypeComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var deviceTypeIdField=combo.up('roweditor').down('#deviceTypeIdFieldItemId');
        deviceTypeIdField.setValue(record.get('deviceTypeId'));
    },

    onModalityComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var modalityIdField=combo.up('roweditor').down('#modalityIdFieldItemId');
        modalityIdField.setValue(record.get('modalityId'));
    },

    onSiteComboBoxEditorItemIdSelect: function(combo, record, eOpts) {
        var siteIdField=combo.up('roweditor').down('#siteIdTextFieldItemId');
        siteIdField.setValue(record.get('siteId'));
    },

    /*********************** renderers****************************************************/

    supportRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Utility.renderer.retreiveTextFromStore(value,'deviceSupport','deviceSupportDisplay','DeviceSupportComboStore',this);
    }

});