/*
 * File: app/view/scheduler/AppointmentHasRefPhGrid.js
 *
 * This file was generated by Sencha Architect version 4.1.2.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.0.x Classic library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.0.x Classic. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.scheduler.AppointmentHasRefPhGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.scheduler.appointmenthasrefphgrid',

    requires: [
        'MyApp.view.scheduler.AppointmentHasRefPhGridViewModel',
        'MyApp.view.scheduler.AppointmentHasRefPhGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.Checkbox',
        'Ext.form.field.ComboBox',
        'Ext.XTemplate',
        'Ext.view.Table',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel'
    ],

    controller: 'scheduler.appointmenthasrefphgrid',
    viewModel: {
        type: 'scheduler.appointmenthasrefphgrid'
    },
    reference: 'visitRefPhGridRef',
    itemId: 'appointmentHasRefPhGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{AppointmentRefPhStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            hidden: true,
            dataIndex: 'referringPhysicianId',
            text: 'ID',
            editor: {
                xtype: 'textfield',
                itemId: 'referringPhysicianIdTextFieldItemId',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            dataIndex: 'patientIsOrientedBy',
            text: 'appointment is referring physician',
            editor: {
                xtype: 'checkboxfield'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'referringPhysicianSearch',
            text: 'appointment  referring physicians',
            editor: {
                xtype: 'combobox',
                itemId: 'referringPhysicianSearchComboBoxEditorItemId',
                allowBlank: false,
                selectOnFocus: true,
                displayField: 'referringPhysicianSearch',
                displayTpl: [
                    '<tpl for=".">{referringPhysicianSearch} :</tpl>'
                ],
                queryMode: 'local',
                valueField: 'referringPhysicianSearch',
                bind: {
                    store: '{ReferringPhysicianSearchComboStore}'
                },
                listeners: {
                    select: 'onReferringPhysicianSearchComboBoxEditorItemIdSelect',
                    change: 'onReferringPhysicianSearchComboBoxEditorItemIdChange'
                }
            }
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onVisitRefPhGridIdChHist',
        afterrender: 'onAppointmentHasRefPhGridIdAfterRender',
        inEdit: 'onAppointmentHasRefPhGridIdInEdit',
        resetEdit: 'onAppointmentHasRefPhGridIdResetEdit',
        saveEdit: 'onAppointmentHasRefPhGridIdSaveEdit',
        addItem: 'onAppointmentHasRefPhGridIdAddItem',
        deleteItem: 'onAppointmentHasRefPhGridIdDeleteItem',
        duplicateItem: 'onAppointmentHasRefPhGridIdDuplicateItem',
        modifyItem: 'onAppointmentHasRefPhGridIdModifyItem',
        quitEdit: 'onAppointmentHasRefPhGridIdQuitEdit',
        beforeedit: 'onAppointmentHasRefPhGridIdBeforeEdit',
        canceledit: 'onAppointmentHasRefPhGridIdCanceledit',
        containerclick: 'onAppointmentHasRefPhGridIdContainerClick',
        edit: 'onAppointmentHasRefPhGridIdEdit',
        beforecellclick: 'onAppointmentHasRefPhGridIdBeforeCellClick',
        validateedit: 'onAppointmentHasRefPhGridIdValidateedit',
        boxready: 'onAppointmentHasRefPhGridIdBoxReady'
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
        me.processSchedulerAppointmentHasRefPhGrid(config);
        if (instanceConfig) {
            me.self.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processSchedulerAppointmentHasRefPhGrid: function(config) {
        GridAddPlugins.addPlugins(this);

    }

});