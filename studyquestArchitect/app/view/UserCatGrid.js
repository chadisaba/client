/*
 * File: app/view/UserCatGrid.js
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

Ext.define('MyApp.view.UserCatGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.usercatgrid',

    requires: [
        'MyApp.view.UserCatGridViewModel',
        'MyApp.view.UserCatGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.view.Table',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel'
    ],

    controller: 'usercatgrid',
    viewModel: {
        type: 'usercatgrid'
    },
    reference: 'userCatGridRef',
    itemId: 'userCatGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{UserCatStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'userCatName',
            text: 'Name',
            editor: {
                xtype: 'textfield',
                itemId: 'userCatNameTextFieldItemId',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            dataIndex: 'userCatReadOnly',
            text: 'Read Only',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            dataIndex: 'active',
            text: 'Active',
            editor: {
                xtype: 'checkboxfield'
            }
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onUserCatGridIdChHist',
        afterrender: 'onUserCatGridIdAfterRender',
        inEdit: 'onUserCatGridIdInEdit',
        resetEdit: 'onUserCatGridIdResetEdit',
        saveEdit: 'onUserCatGridIdSaveEdit',
        addItem: 'onUserCatGridIdAddItem',
        deleteItem: 'onUserCatGridIdDeleteItem',
        modifyItem: 'onUserCatGridIdModifyItem',
        quitEdit: 'onUserCatGridIdQuitEdit',
        beforeedit: 'onUserCatGridIdBeforeEdit',
        canceledit: 'onUserCatGridIdCanceledit',
        containerclick: 'onUserCatGridIdContainerClick',
        edit: 'onUserCatGridIdEdit',
        beforecellclick: 'onUserCatGridIdBeforeCellClick',
        validateedit: 'onUserCatGridIdValidateedit'
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
        me.processUserCatGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processUserCatGrid: function(config) {
        Plugins.grid.GridEditingPlugin.configure(this);
        this.plugins.push (
                           new Plugins.grid.GridEditingPlugin({pluginId: 'gridediting'}));

    }

});