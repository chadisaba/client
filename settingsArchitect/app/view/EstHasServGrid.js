/*
 * File: app/view/EstHasServGrid.js
 *
 * This file was generated by Sencha Architect
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

Ext.define('MyApp.view.EstHasServGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.esthasservgrid',

    requires: [
        'MyApp.view.EstHasServGridViewModel',
        'MyApp.view.EstHasServGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.ComboBox',
        'Ext.view.Table',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel'
    ],

    controller: 'esthasservgrid',
    viewModel: {
        type: 'esthasservgrid'
    },
    reference: 'estHasServGridRef',
    itemId: 'estHasServGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{EstHasServStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'establishmentId',
            text: 'establishmentId',
            editor: {
                xtype: 'textfield',
                itemId: 'establishmentIdTextFieldItemId',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'estHasServCode',
            text: 'code',
            editor: {
                xtype: 'textfield',
                itemId: 'estHasServCodeTextFieldItemId',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'estHasServName',
            text: 'name',
            editor: {
                xtype: 'textfield',
                itemId: 'estHasServNameTextFieldItemId',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'establishmentCode',
            text: 'establishment',
            editor: {
                xtype: 'combobox',
                itemId: 'establishmentCodeComboBoxEditorItemId',
                selectOnFocus: true,
                displayField: 'establishmentCode',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'establishmentCode',
                bind: {
                    store: '{EstablishmentCodeComboStore}'
                },
                listeners: {
                    select: 'onEstablishmentCodeComboBoxEditorItemIdSelect'
                }
            }
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onEstHasServGridIdChHist',
        afterrender: 'onEstHasServGridIdAfterRender',
        inEdit: 'onEstHasServGridIdInEdit',
        resetEdit: 'onEstHasServGridIdResetEdit',
        saveEdit: 'onEstHasServGridIdSaveEdit',
        addItem: 'onEstHasServGridIdAddItem',
        deleteItem: 'onEstHasServGridIdDeleteItem',
        duplicateItem: 'onEstHasServGridIdDuplicateItem',
        modifyItem: 'onEstHasServGridIdModifyItem',
        quitEdit: 'onEstHasServGridIdQuitEdit',
        beforeedit: 'onEstHasServGridIdBeforeEdit',
        canceledit: 'onEstHasServGridIdCanceledit',
        containerclick: 'onEstHasServGridIdContainerClick',
        edit: 'onEstHasServGridIdEdit',
        beforecellclick: 'onEstHasServGridIdBeforeCellClick',
        validateedit: 'onEstHasServGridIdValidateedit'
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
        me.processEstHasServGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processEstHasServGrid: function(config) {
        GridAddPlugins.addPlugins(this);

    }

});