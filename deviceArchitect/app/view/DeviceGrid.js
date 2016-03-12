Ext.define('MyApp.view.DeviceGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.devicegrid',

    requires: [
        'MyApp.view.DeviceGridViewModel',
        'MyApp.view.DeviceGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.Text',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel'
    ],

    controller: 'devicegrid',
    viewModel: {
        type: 'devicegrid'
    },
    reference: 'deviceGridRef',
    itemId: 'deviceGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{DeviceStore}'
    },
    columns: [
              
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceTypeId',
            text: 'Type'
                     ,allowBlank: false
                     ,editor: {
                        xtype: 'combobox',
                        displayField: 'deviceTypeCode',
                        itemId: 'deviceTypeComboBoxEditorItemId',
                        forceSelection: true,
                        queryMode: 'combobox',
                          
                       
                        selectOnFocus: true,
                        valueField: 'deviceTypeId'       
                         ,allowBlank: false,
                        bind: {
                                store: '{DeviceTypeComboStore}'
                                 }
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'modalityId',
            text: 'Modalité'
                     ,allowBlank: false
                     ,editor: {
                        xtype: 'combobox',
                        displayField: 'modalityCode',
                        itemId: 'modalityComboBoxEditorItemId',
                        forceSelection: true,
                        queryMode: 'combobox',
                          
                       
                        selectOnFocus: true,
                        valueField: 'modalityId'       
                         ,allowBlank: false,
                        bind: {
                                store: '{ModalityComboStore}'
                                 }
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceName',
            text: 'Libellé'
                     ,allowBlank: false
                     ,editor: {
                        xtype: 'textfield'
                         ,allowBlank: false
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceModel',
            text: 'Modèle'
                    
                     ,editor: {
                        xtype: 'textfield'
                        
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceAET',
            text: 'AET'
                    
                     ,editor: {
                        xtype: 'textfield'
                        
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceAgreementNumber',
            text: 'N Agrément'
                    
                     ,editor: {
                        xtype: 'textfield'
                        
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceAgreementDate',
            text: 'Date Agr.'
                    
                     ,editor: {
                        xtype: 'textfield'
                        
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceTrademark',
            text: 'Marque'
                    
                     ,editor: {
                        xtype: 'textfield'
                        
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceInstallationDate',
            text: 'Installation'
                    
                     ,editor: {
                        xtype: 'textfield'
                        
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'devicePower',
            text: 'Puissance'
                    
                     ,editor: {
                        xtype: 'textfield'
                        
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceIsSenolog',
            text: 'Senolog?'
                    
                     ,editor: {
                        xtype: 'textfield'
                        
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceSupportId',
            text: 'Support'
                    
                     ,editor: {
                        xtype: 'combobox',
                        displayField: 'deviceSupport',
                        itemId: 'deviceSupportComboBoxEditorItemId',
                        forceSelection: true,
                        queryMode: 'combobox',
                          
                       
                        selectOnFocus: true,
                        valueField: 'deviceSupportId'       
                        ,
                        bind: {
                                store: '{DeviceSupportComboStore}'
                                 }
                }
        },
                   
                {
            xtype: 'gridcolumn',
            dataIndex: 'deviceLecture',
            text: 'Lecture?'
                    
                     ,editor: {
                                    xtype: 'checkboxfield'
                                     }
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onDeviceGridIdChHist',
        afterrender: 'onDeviceGridIdAfterRender',
        inEdit: 'onDeviceGridIdInEdit',
        resetEdit: 'onDeviceGridIdResetEdit',
        saveEdit: 'onDeviceGridIdSaveEdit',
        addItem: 'onDeviceGridIdAddItem',
        deleteItem: 'onDeviceGridIdDeleteItem',
        modifyItem: 'onDeviceGridIdModifyItem',
        quitEdit: 'onDeviceGridIdQuitEdit',
        beforeedit: 'onDeviceGridIdBeforeEdit',
        canceledit: 'onDeviceGridIdCanceledit',
        containerclick: 'onDeviceGridIdContainerClick',
        edit: 'onDeviceGridIdEdit',
        beforecellclick: 'onDeviceGridIdBeforeCellClick',
        validateedit: 'onDeviceGridIdValidateedit'
    },
    plugins: [
        {
            ptype: 'rowediting',
            pluginId: 'rowEdit',
            autoCancel: false,
            clicksToMoveEditor: 0,
            errorSummary: false
        }
    ],
    selModel: {
        selType: 'rowmodel',
        mode: 'MULTI'
    },

    initConfig: function(instanceConfig) {
        var me = this,
            config = {};
        me.processDeviceGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processDeviceGrid: function(config) {
        Plugins.grid.GridEditingPlugin.configure(this);
        this.plugins.push (
                           new Plugins.grid.GridEditingPlugin({pluginId: 'gridediting'}));

    }

});