/*
 * File: app/view/StudyTypeGrid.js
 *
 * This file was generated by Sencha Architect version 4.2.1.
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

Ext.define('MyApp.view.StudyTypeGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.studytypegrid',

    requires: [
        'MyApp.view.StudyTypeGridViewModel',
        'MyApp.view.StudyTypeGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Checkbox',
        'Ext.view.Table',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel',
        'Ext.ux.colorpick.Field'
    ],

    controller: 'studytypegrid',
    viewModel: {
        type: 'studytypegrid'
    },
    reference: 'studyTypeGridRef',
    itemId: 'studyTypeGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{StudyTypeStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            hidden: true,
            text: 'Cat ID',
            editor: {
                xtype: 'textfield',
                itemId: 'studyCatTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyCatName',
            text: 'Catégorie',
            editor: {
                xtype: 'combobox',
                itemId: 'studyCatComboBoxEditorItemId',
                allowBlank: false,
                selectOnFocus: true,
                displayField: 'studyCatName',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'studyCatName',
                bind: {
                    store: '{StudyCatComboStore}'
                },
                listeners: {
                    select: 'onStudyCatComboBoxEditorItemIdSelect'
                }
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyTypeName',
            text: 'Nom',
            editor: {
                xtype: 'textfield',
                itemId: 'studyTypeNameTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'studyTypeCode',
            text: 'Code',
            editor: {
                xtype: 'textfield',
                itemId: 'studyTypeCodeTextFieldItemId'
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: 'rdvColorRenderer',
            itemId: 'rdvColorColItemId',
            dataIndex: 'studyTypeRdvColor',
            text: 'Couleur R.D.V'
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            width: 50,
            dataIndex: 'active',
            text: 'Active',
            editor: {
                xtype: 'checkboxfield'
            }
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onStudyTypeGridIdChHist',
        afterrender: 'onStudyTypeGridIdAfterRender',
        inEdit: 'onStudyTypeGridIdInEdit',
        resetEdit: 'onStudyTypeGridIdResetEdit',
        saveEdit: 'onStudyTypeGridIdSaveEdit',
        addItem: 'onStudyTypeGridIdAddItem',
        deleteItem: 'onStudyTypeGridIdDeleteItem',
        modifyItem: 'onStudyTypeGridIdModifyItem',
        quitEdit: 'onStudyTypeGridIdQuitEdit',
        beforeedit: 'onStudyTypeGridIdBeforeEdit',
        canceledit: 'onStudyTypeGridIdCanceledit',
        containerclick: 'onStudyTypeGridIdContainerClick',
        edit: 'onStudyTypeGridIdEdit',
        beforecellclick: 'onStudyTypeGridIdBeforeCellClick',
        validateedit: 'onStudyTypeGridIdValidateedit'
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
        me.processStudyTypeGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processStudyTypeGrid: function(config) {
        Plugins.grid.GridEditingPlugin.configure(this);
        this.plugins.push (
                           new Plugins.grid.GridEditingPlugin({pluginId: 'gridediting'}));

    }

});