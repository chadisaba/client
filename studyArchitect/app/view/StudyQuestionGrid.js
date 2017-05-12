/*
 * File: app/view/StudyQuestionGrid.js
 *
 * This file was generated by Sencha Architect version 4.1.2.
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

Ext.define('MyApp.view.StudyQuestionGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.studyquestiongrid',

    requires: [
        'MyApp.view.StudyQuestionGridViewModel',
        'MyApp.view.StudyQuestionGridViewController',
        'Ext.grid.column.Column',
        'Ext.form.field.TextArea',
        'Ext.form.field.Checkbox',
        'Ext.view.Table',
        'Ext.grid.plugin.RowEditing',
        'Ext.selection.RowModel'
    ],

    controller: 'studyquestiongrid',
    viewModel: {
        type: 'studyquestiongrid'
    },
    reference: 'studyQuestionGridRef',
    itemId: 'studyQuestionGridId',
    resizable: false,
    title: '',
    forceFit: true,

    bind: {
        store: '{StudyQuestionStore}'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            flex: 1,
            dataIndex: 'studyQuestText',
            text: 'Questions',
            editor: {
                xtype: 'textareafield',
                itemId: 'studyQuestTextTextFieldItemId',
                allowBlank: false
            }
        },
        {
            xtype: 'gridcolumn',
            renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
                return Utility.renderer.checkBoxRenderer(value);
            },
            width: 75,
            dataIndex: 'active',
            text: 'Activé',
            editor: {
                xtype: 'checkboxfield'
            }
        }
    ],
    listeners: {
        select: 'select',
        chHist: 'onStudyQuestionGridIdChHist',
        afterrender: 'onStudyQuestionGridIdAfterRender',
        inEdit: 'onStudyQuestionGridIdInEdit',
        resetEdit: 'onStudyQuestionGridIdResetEdit',
        saveEdit: 'onStudyQuestionGridIdSaveEdit',
        addItem: 'onStudyQuestionGridIdAddItem',
        deleteItem: 'onStudyQuestionGridIdDeleteItem',
        modifyItem: 'onStudyQuestionGridIdModifyItem',
        quitEdit: 'onStudyQuestionGridIdQuitEdit',
        beforeedit: 'onStudyQuestionGridIdBeforeEdit',
        canceledit: 'onStudyQuestionGridIdCanceledit',
        containerclick: 'onStudyQuestionGridIdContainerClick',
        edit: 'onStudyQuestionGridIdEdit',
        beforecellclick: 'onStudyQuestionGridIdBeforeCellClick',
        validateedit: 'onStudyQuestionGridIdValidateedit'
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
        me.processStudyQuestionGrid(config);
        if (instanceConfig) {
            me.getConfigurator().merge(me, config, instanceConfig);
        }
        return me.callParent([config]);
    },

    processStudyQuestionGrid: function(config) {
        Plugins.grid.GridEditingPlugin.configure(this);
        this.plugins.push (
                           new Plugins.grid.GridEditingPlugin({pluginId: 'gridediting'}));

    }

});