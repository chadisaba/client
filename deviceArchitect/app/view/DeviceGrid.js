/*
 * File: app/view/DeviceGrid.js
 *
 * This file was generated by Sencha Architect version 3.2.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 5.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 5.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.DeviceGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.devicegrid',

    requires: [
        'MyApp.view.DeviceGridViewModel',
        'MyApp.view.DeviceGridViewController',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Hidden',
        'Ext.form.field.Date',
        'Ext.grid.column.Number',
        'Ext.form.field.Number',
        'Ext.form.field.Checkbox',
        'Ext.view.Table',
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
            dataIndex: 'deviceTypeCode',
            text: 'Type',
            editor: {
                xtype: 'combobox',
                itemId: 'deviceTypeComboBoxEditorItemId',
                allowBlank: false,
                selectOnFocus: true,
                displayField: 'deviceTypeCode',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'deviceTypeCode',
                bind: {
                    store: '{DeviceTypeComboStore}'
                },
                listeners: {
                    select: 'onDeviceTypeComboBoxEditorItemIdSelect'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'modalityCode',
            text: 'Modalité',
            editor: {
                xtype: 'combobox',
                itemId: 'modalityComboBoxEditorItemId',
                allowBlank: false,
                selectOnFocus: true,
                displayField: 'modalityCode',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'modalityCode',
                bind: {
                    store: '{ModalityComboStore}'
                },
                listeners: {
                    select: 'onModalityComboBoxEditorItemIdSelect'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'deviceName',
            text: 'Libellé',
            editor: {
                xtype: 'textfield',
                itemId: 'deviceNameTextFieldItemId',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'deviceModel',
            text: 'Modèle',
            editor: {
                xtype: 'textfield',
                itemId: 'deviceModelTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'deviceAET',
            text: 'AET',
            editor: {
                xtype: 'textfield',
                itemId: 'deviceAETTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'deviceTypeId',
            text: 'deviceTypeId',
            editor: {
                xtype: 'hiddenfield',
                itemId: 'deviceTypeIdFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            hidden: true,
            itemId: 'modalityId',
            dataIndex: 'modalityId',
            text: 'deviceTypeId',
            editor: {
                xtype: 'hiddenfield',
                itemId: 'modalityIdFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'deviceAgreementNumber',
            text: 'N Agrément',
            editor: {
                xtype: 'textfield',
                itemId: 'deviceAgreementNumberTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            width: 110,
            dataIndex: 'deviceAgreementDate',
            formatter: 'date(\'d/m/Y\')',
            text: 'Date Agr.',
            editor: {
                xtype: 'datefield',
                itemId: 'deviceAgreementDateTextFieldItemId',
                format: 'd/m/Y'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'deviceTrademark',
            text: 'Marque',
            editor: {
                xtype: 'textfield',
                itemId: 'deviceTrademarkTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            width: 110,
            dataIndex: 'deviceInstallationDate',
            formatter: 'date(\'d/m/Y\')',
            text: 'Installation',
            editor: {
                xtype: 'datefield',
                itemId: 'deviceInstallationDateTextFieldItemId',
                format: 'd/m/Y'
            }
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'devicePower',
            text: 'Puissance',
            editor: {
                xtype: 'numberfield',
                itemId: 'devicePowerTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            dataIndex: 'deviceIsSenolog',
            text: 'Senolog?',
            editor: {
                xtype: 'checkboxfield',
                itemId: 'deviceIsSenologTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'supportRenderer',
            dataIndex: 'deviceSupport',
            text: 'Support',
            editor: {
                xtype: 'combobox',
                itemId: 'deviceSupportComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'deviceSupportDisplay',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'deviceSupport',
                bind: {
                    store: '{DeviceSupportComboStore}'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            dataIndex: 'deviceLecture',
            text: 'Lecture?',
            editor: {
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